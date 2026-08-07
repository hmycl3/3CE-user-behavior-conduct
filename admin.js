const fields = [
  ["age", "年龄"],
  ["city", "所在城市级别"],
  ["beauty_content_platforms", "接触美妆内容的平台"],
  ["purchase_motivations", "购买彩妆的主要原因"],
  ["purchase_difficulties", "购买彩妆的困难"],
  ["recommendation_mismatch", "种草后发现不适合自己的频率"],
  ["brand_single_help", "最希望美妆品牌解决的问题"],
  ["threece_awareness", "3CE了解程度"],
  ["threece_repeat_reasons_a", "Q10A｜持续购买3CE的原因"],
  ["threece_more_purchase_a", "Q11A｜提高购买频率的方式"],
  ["threece_low_purchase_reasons_b", "Q10B｜很少或未继续购买的原因"],
  ["threece_reengagement_b", "Q11B｜重新关注或购买的方式"],
  ["threece_nonpurchase_reasons_c", "Q10C｜知道但未购买的原因"],
  ["threece_first_purchase_c", "Q11C｜提高首次购买可能性的体验"],
  ["usual_makeup_brands_d", "Q10D｜通常使用的彩妆品牌"],
  ["new_brand_attention_d", "Q11D｜关注新彩妆品牌的原因"],
  ["korean_content_interest", "韩系影视内容关注度"],
  ["kdrama_elements", "影响兴趣的韩剧元素"],
  ["character_projection", "影视角色代入感"],
  ["threece_heroine_style", "3CE韩剧女主妆风格"],
  ["style_profile_inputs", "希望品牌了解的信息"],
  ["makeup_value", "化妆的最大价值"],
];

const otherFields = [
  ["purchase_motivations_other", "购买彩妆原因：其他"],
  ["brand_single_help_other", "品牌帮助：其他"],
  ["threece_repeat_reasons_a_other", "Q10A：其他"],
  ["threece_low_purchase_reasons_b_other", "Q10B：其他"],
  ["threece_nonpurchase_reasons_c_other", "Q10C：其他"],
  ["new_brand_attention_d_other", "Q11D：其他"],
  ["style_profile_inputs_other", "品牌了解信息：其他"],
  ["makeup_value_other", "化妆价值：其他"],
];

const ratingFields = [
  ["kdrama_character_test", "韩剧角色测试"],
  ["scenario_makeup_assistant", "场景妆容助手"],
  ["ai_style_exploration", "AI个人风格探索"],
  ["threece_community", "3CE女性圈层社区"],
  ["korean_trend_lab", "韩系潮流实验室"],
];

const $ = (id) => document.getElementById(id);
let responses = [];

function values(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function csvCell(value) {
  const normalized = Array.isArray(value)
    ? value.join(" | ")
    : typeof value === "object" && value !== null
      ? JSON.stringify(value)
      : String(value ?? "");
  return `"${normalized.replaceAll('"', '""')}"`;
}

async function load(password) {
  const response = await fetch("/api/admin-responses", {
    headers: { "x-admin-password": password },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(response.status === 401 ? "管理员密码不正确" : "暂时无法读取数据");
  }
  const data = await response.json();
  responses = data.responses || [];
  sessionStorage.setItem("3ce-admin-password", password);
  $("login-card").classList.add("hidden");
  $("dashboard").classList.remove("hidden");
  $("logout").hidden = false;
  render();
}

function chartCard(label, entries, denominator) {
  const article = document.createElement("article");
  article.className = "chart-card";
  const heading = document.createElement("h2");
  heading.textContent = label;
  article.append(heading);
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  if (!sorted.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "暂无新版数据";
    article.append(empty);
    return article;
  }
  sorted.slice(0, 12).forEach(([answer, count]) => {
    const percent = Math.round((count / Math.max(denominator, 1)) * 100);
    const row = document.createElement("div");
    row.className = "bar-row";
    const text = document.createElement("div");
    const name = document.createElement("span");
    name.textContent = answer;
    const amount = document.createElement("b");
    amount.textContent = `${count} · ${percent}%`;
    text.append(name, amount);
    const bar = document.createElement("i");
    const fill = document.createElement("em");
    fill.style.width = `${percent}%`;
    bar.append(fill);
    row.append(text, bar);
    article.append(row);
  });
  return article;
}

function textResponseCard(items) {
  const article = document.createElement("article");
  article.className = "chart-card text-response-card";
  const heading = document.createElement("h2");
  heading.textContent = "开放题与其他补充";
  article.append(heading);
  const textFields = [
    ...otherFields,
    ["usual_makeup_brands_d", "Q10D常用彩妆品牌"],
    ["brand_companionship", "Q18品牌长期陪伴期待"],
  ];
  const notes = items.flatMap((item) => textFields
    .filter(([key]) => typeof item.answers?.[key] === "string" && item.answers[key].trim())
    .map(([key, label]) => [label, item.answers[key]]));
  if (!notes.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "暂无开放回答";
    article.append(empty);
    return article;
  }
  notes.slice(0, 40).forEach(([label, answer]) => {
    const block = document.createElement("p");
    block.className = "text-response";
    const strong = document.createElement("strong");
    strong.textContent = `${label}：`;
    block.append(strong, document.createTextNode(answer));
    article.append(block);
  });
  return article;
}

function render() {
  const now = Date.now();
  const day = 86_400_000;
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const currentResponses = responses.filter((item) => item.surveyVersion === "2026-08-v5");
  const stats = [
    ["累计答卷", responses.length],
    ["今日新增", responses.filter((item) => item.submittedAt >= todayStart).length],
    ["近7天新增", responses.filter((item) => item.submittedAt >= now - 7 * day).length],
    ["新版答卷", currentResponses.length],
  ];

  $("stats").replaceChildren(...stats.map(([label, value]) => {
    const article = document.createElement("article");
    const span = document.createElement("span");
    span.textContent = label;
    const strong = document.createElement("strong");
    strong.textContent = value;
    article.append(span, strong);
    return article;
  }));

  const fieldCharts = fields.map(([key, label]) => {
    const answered = currentResponses.filter((item) => values(item.answers?.[key]).length);
    const counts = new Map();
    answered.forEach((item) => {
      values(item.answers[key]).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
    });
    return chartCard(label, counts.entries(), answered.length);
  });

  const ratingCharts = ratingFields.map(([key, label]) => {
    const answered = currentResponses.filter((item) => Number.isInteger(item.answers?.experience_interest?.[key]));
    const counts = new Map();
    answered.forEach((item) => {
      const score = item.answers.experience_interest[key];
      counts.set(`${score}分`, (counts.get(`${score}分`) || 0) + 1);
    });
    const total = answered.reduce((sum, item) => sum + item.answers.experience_interest[key], 0);
    const average = answered.length ? (total / answered.length).toFixed(1) : "—";
    return chartCard(`体验评分｜${label}（平均 ${average} 分）`, counts.entries(), answered.length);
  });

  $("charts").replaceChildren(...fieldCharts, ...ratingCharts, textResponseCard(currentResponses));
  $("count").textContent = `共 ${responses.length} 份（含历史版本）`;
  $("rows").replaceChildren(...responses.map((item) => {
    const answer = item.answers || {};
    const row = document.createElement("tr");
    const cells = [
      new Date(item.submittedAt).toLocaleString("zh-CN"),
      item.surveyVersion || "历史版本",
      answer.age,
      answer.city || answer.city_tier,
      answer.threece_awareness || answer.korean_beauty,
      answer.korean_content_interest,
      answer.makeup_value || (Array.isArray(answer.beauty_meaning) ? answer.beauty_meaning.join("、") : answer.beauty_meaning),
      answer.brand_companionship,
    ];
    cells.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value || "—";
      row.append(cell);
    });
    return row;
  }));
}

$("login").addEventListener("submit", async (event) => {
  event.preventDefault();
  $("login-notice").textContent = "正在验证…";
  try {
    await load($("password").value);
    $("login-notice").textContent = "";
  } catch (error) {
    $("login-notice").textContent = error.message;
  }
});

$("logout").addEventListener("click", () => {
  sessionStorage.removeItem("3ce-admin-password");
  location.reload();
});

$("export").addEventListener("click", () => {
  const headers = [
    "记录ID",
    "提交时间",
    "问卷版本",
    ...fields.map(([, label]) => label),
    ...otherFields.map(([, label]) => label),
    ...ratingFields.map(([, label]) => `体验评分：${label}`),
    "Q18品牌长期陪伴期待",
    "完整原始答案(JSON)",
  ];
  const rows = responses.map((item) => [
    item.id,
    new Date(item.submittedAt).toLocaleString("zh-CN"),
    item.surveyVersion || "历史版本",
    ...fields.map(([key]) => item.answers?.[key]),
    ...otherFields.map(([key]) => item.answers?.[key] || ""),
    ...ratingFields.map(([key]) => item.answers?.experience_interest?.[key]),
    item.answers?.brand_companionship || "",
    item.answers || {},
  ]);
  const csv = "\uFEFF" + [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `3CE问卷数据-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
});

const saved = sessionStorage.getItem("3ce-admin-password");
if (saved) load(saved).catch(() => sessionStorage.removeItem("3ce-admin-password"));
