import { put } from "@vercel/blob";

const commonSingleKeys = [
  "age",
  "city",
  "recommendation_mismatch",
  "brand_single_help",
  "threece_awareness",
  "korean_content_interest",
  "character_projection",
  "threece_heroine_style",
  "makeup_value",
];

const commonMultiKeys = [
  "beauty_content_platforms",
  "purchase_motivations",
  "purchase_difficulties",
  "kdrama_elements",
  "style_profile_inputs",
];

const branches = {
  "经常购买": {
    requiredMulti: ["threece_repeat_reasons_a", "threece_more_purchase_a"],
    requiredOpen: [],
  },
  "买过1–2次": {
    requiredMulti: ["threece_low_purchase_reasons_b", "threece_reengagement_b"],
    requiredOpen: [],
  },
  "听说过但没有购买": {
    requiredMulti: ["threece_nonpurchase_reasons_c", "threece_first_purchase_c"],
    requiredOpen: [],
  },
  "完全不了解": {
    requiredMulti: ["new_brand_attention_d"],
    requiredOpen: ["usual_makeup_brands_d"],
  },
};

const maxThreeKeys = new Set([
  "purchase_motivations",
  "purchase_difficulties",
  "kdrama_elements",
  "threece_repeat_reasons_a",
  "threece_low_purchase_reasons_b",
  "threece_nonpurchase_reasons_c",
  "new_brand_attention_d",
]);

const ratingKeys = [
  "kdrama_character_test",
  "scenario_makeup_assistant",
  "ai_style_exploration",
  "threece_community",
  "korean_trend_lab",
];

const otherFields = {
  purchase_motivations: "purchase_motivations_other",
  purchase_difficulties: "purchase_difficulties_other",
  brand_single_help: "brand_single_help_other",
  threece_repeat_reasons_a: "threece_repeat_reasons_a_other",
  threece_low_purchase_reasons_b: "threece_low_purchase_reasons_b_other",
  threece_nonpurchase_reasons_c: "threece_nonpurchase_reasons_c_other",
  new_brand_attention_d: "new_brand_attention_d_other",
  style_profile_inputs: "style_profile_inputs_other",
  makeup_value: "makeup_value_other",
};

const exclusiveAnswers = {
  threece_reengagement_b: "暂时没有什么能让我重新购买",
  threece_first_purchase_c: "都不会明显提高",
};

const allBranchKeys = Object.values(branches).flatMap((branch) => [...branch.requiredMulti, ...branch.requiredOpen]);
const allOtherKeys = Object.values(otherFields);
const allowedKeys = new Set([
  ...commonSingleKeys,
  ...commonMultiKeys,
  ...allBranchKeys,
  ...allOtherKeys,
  "experience_interest",
  "brand_companionship",
]);

function validText(value, max = 120) {
  return typeof value === "string" && Boolean(value.trim()) && value.length <= max;
}

function validOptionalText(value, max = 120) {
  return value === undefined || (typeof value === "string" && value.length <= max);
}

function validMulti(value, key) {
  if (!Array.isArray(value) || value.length === 0 || value.length > 12) return false;
  if (maxThreeKeys.has(key) && value.length > 3) return false;
  if (exclusiveAnswers[key] && value.includes(exclusiveAnswers[key]) && value.length !== 1) return false;
  return value.every((item) => validText(item));
}

function hasOtherSelected(value) {
  return Array.isArray(value) ? value.includes("其他") : value === "其他";
}

function validOtherAnswers(answers) {
  return Object.entries(otherFields).every(([answerKey, otherKey]) => {
    if (hasOtherSelected(answers[answerKey])) return validText(answers[otherKey]);
    return validOptionalText(answers[otherKey]);
  });
}

function validRatings(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  if (Object.keys(value).some((key) => !ratingKeys.includes(key))) return false;
  return ratingKeys.every((key) => Number.isInteger(value[key]) && value[key] >= 1 && value[key] <= 5);
}

function validAnswers(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  if (Object.keys(value).some((key) => !allowedKeys.has(key))) return false;
  if (!commonSingleKeys.every((key) => validText(value[key]))) return false;
  if (!commonMultiKeys.every((key) => validMulti(value[key], key))) return false;
  if (!validRatings(value.experience_interest)) return false;
  if (!validText(value.brand_companionship, 300)) return false;

  const activeBranch = branches[value.threece_awareness];
  if (!activeBranch) return false;
  if (!activeBranch.requiredMulti.every((key) => validMulti(value[key], key))) return false;
  if (!activeBranch.requiredOpen.every((key) => validText(value[key]))) return false;

  const activeKeys = new Set([...activeBranch.requiredMulti, ...activeBranch.requiredOpen]);
  if (allBranchKeys.some((key) => !activeKeys.has(key) && value[key] !== undefined)) return false;
  return validOtherAnswers(value);
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
  const record = { id, answers, surveyVersion: "2026-08-v6", submittedAt };

  await put(`responses-v6/${submittedAt}-${id}.json`, JSON.stringify(record), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
  });

  return response.status(201).json({ ok: true, id, submittedAt });
}
