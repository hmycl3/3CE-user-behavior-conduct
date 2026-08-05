import { put } from "@vercel/blob";

const singleKeys = [
  "age", "city_tier", "short_video_frequency", "beauty_purchase_frequency",
  "korean_beauty", "purchase_mindset",
];
const requiredMultiKeys = [
  "channels", "online_drivers", "offline_drivers", "makeup_styles",
  "beauty_meaning", "threece_purchase_drivers",
];
const optionalMultiKeys = ["threece_churn_reasons"];
const otherKeys = [
  "makeup_styles_other", "threece_purchase_drivers_other", "threece_churn_reasons_other",
];
const allowedKeys = new Set([...singleKeys, ...requiredMultiKeys, ...optionalMultiKeys, ...otherKeys]);

function validText(value, max = 100) {
  return typeof value === "string" && Boolean(value.trim()) && value.length <= max;
}

function validMulti(value, required = true) {
  if (!Array.isArray(value)) return !required && value === undefined;
  if (required && value.length === 0) return false;
  return value.length <= 10 && value.every((item) => validText(item));
}

function validOther(value, id) {
  const answers = value[id];
  return !Array.isArray(answers) || !answers.includes("其他") || validText(value[`${id}_other`], 80);
}

function validAnswers(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  if (Object.keys(value).some((key) => !allowedKeys.has(key))) return false;
  if (!singleKeys.every((key) => validText(value[key]))) return false;
  if (!requiredMultiKeys.every((key) => validMulti(value[key]))) return false;
  if (!optionalMultiKeys.every((key) => validMulti(value[key], false))) return false;
  if (value.online_drivers.length > 3 || value.offline_drivers.length > 3) return false;
  if (value.beauty_meaning.length > 2 || value.threece_purchase_drivers.length > 3) return false;
  if ((value.threece_churn_reasons || []).length > 3) return false;
  return ["makeup_styles", "threece_purchase_drivers", "threece_churn_reasons"].every((id) => validOther(value, id));
}

export default async function handler(request, response) {
  response.setHeader("cache-control", "no-store");
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return response.status(503).json({ error: "数据存储尚未连接" });
  const answers = request.body?.answers;
  if (!validAnswers(answers)) return response.status(400).json({ error: "问卷内容不完整" });
  const id = crypto.randomUUID();
  const submittedAt = Date.now();
  const record = { id, answers, surveyVersion: "2026-08-v3", submittedAt };
  await put(`responses/${submittedAt}-${id}.json`, JSON.stringify(record), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
  });
  return response.status(201).json({ ok: true, id, submittedAt });
}
