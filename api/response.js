import { put } from "@vercel/blob";

const singleKeys = [
  "age",
  "city",
  "recommendation_mismatch",
  "brand_single_help",
  "threece_awareness",
  "korean_content_interest",
  "character_projection",
  "makeup_value",
];

const multiKeys = [
  "beauty_content_platforms",
  "purchase_motivations",
  "purchase_difficulties",
  "threece_attractions",
  "threece_churn_reasons",
  "kdrama_elements",
  "style_profile_inputs",
];

const maxThreeKeys = new Set([
  "purchase_motivations",
  "purchase_difficulties",
  "threece_churn_reasons",
  "kdrama_elements",
]);

const ratingKeys = [
  "kdrama_character_test",
  "scenario_makeup_assistant",
  "ai_style_exploration",
  "threece_community",
];

const allowedKeys = new Set([
  ...singleKeys,
  ...multiKeys,
  "experience_interest",
  "brand_companionship",
]);

function validText(value, max = 120) {
  return typeof value === "string" && Boolean(value.trim()) && value.length <= max;
}

function validMulti(value, key) {
  if (!Array.isArray(value) || value.length === 0 || value.length > 10) return false;
  if (maxThreeKeys.has(key) && value.length > 3) return false;
  return value.every((item) => validText(item));
}

function validRatings(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  if (Object.keys(value).some((key) => !ratingKeys.includes(key))) return false;
  return ratingKeys.every((key) => Number.isInteger(value[key]) && value[key] >= 1 && value[key] <= 5);
}

function validAnswers(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  if (Object.keys(value).some((key) => !allowedKeys.has(key))) return false;
  if (!singleKeys.every((key) => validText(value[key]))) return false;
  if (!multiKeys.every((key) => validMulti(value[key], key))) return false;
  if (!validRatings(value.experience_interest)) return false;
  return validText(value.brand_companionship, 300);
}

export default async function handler(request, response) {
  response.setHeader("cache-control", "no-store");

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return response.status(503).json({ error: "数据存储尚未连接" });
  }

  const answers = request.body?.answers;
  if (!validAnswers(answers)) {
    return response.status(400).json({ error: "问卷内容不完整" });
  }

  const id = crypto.randomUUID();
  const submittedAt = Date.now();
  const record = { id, answers, surveyVersion: "2026-08-v4", submittedAt };

  await put(`responses/${submittedAt}-${id}.json`, JSON.stringify(record), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
  });

  return response.status(201).json({ ok: true, id, submittedAt });
}
