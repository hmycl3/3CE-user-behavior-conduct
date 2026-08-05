const fields = [
  ["age", "年龄段"], ["city_tier", "城市层级"], ["short_video_frequency", "短视频/短剧观看频率"],
  ["beauty_purchase_frequency", "彩妆购买频率"], ["channels", "主要购买渠道"],
  ["online_drivers", "线上快速下单因素"], ["offline_drivers", "线下快速下单因素"],
  ["korean_beauty", "韩系彩妆购买情况"], ["makeup_styles", "偏好彩妆风格"],
  ["purchase_mindset", "彩妆购买心态"], ["beauty_meaning", "美妆的生活意义"],
  ["threece_purchase_drivers", "购买3CE动因"], ["threece_churn_reasons", "未持续购买3CE原因"],
];

const otherFields = [
  ["makeup_styles_other", "偏好风格其他补充"],
  ["threece_purchase_drivers_other", "购买3CE动因其他补充"],
  ["threece_churn_reasons_other", "未持续购买原因其他补充"],
];

const $ = (id) => document.getElementById(id);
let responses = [];

function values(value) { return Array.isArray(value) ? value : value ? [value] : []; }
function csvCell(value) {
  const text = Array.isArray(value) ? value.join(" | ") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

async function load(password) {
  const response = await fetch("/api/admin-responses", { headers: { "x-admin-password": password }, cache: "no-store" });
  if (!response.ok) throw new Error(response.status === 401 ? "管理员密码不正确" : "暂时无法读取数据");
  const data = await response.json();
  responses = data.responses || [];
  sessionStorage.setItem("3ce-admin-password", password);
  $("login-card").classList.add("hidden");
  $("dashboard").classList.remove("hidden");
  $("logout").hidden = false;
  render();
}

function render() {
  const now = Date.now();
  const day = 86_400_000;
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const stats = [
    ["累计答卷", responses.length],
    ["今日新增", responses.filter((item) => item.submittedAt >= todayStart).length],
    ["近7天新增", responses.filter((item) => item.submittedAt >= now - 7 * day).length],
    ["完整答卷率", responses.length ? `${Math.round((responses.filter((item) => item.surveyVersion === "2026-08-v3").length / responses.length) * 100)}%` : "—"],
  ];
  $("stats").replaceChildren(...stats.map(([label, value]) => {
    const article = document.createElement("article");
    const span = document.createElement("span"); span.textContent = label;
    const strong = document.createElement("strong"); strong.textContent = value;
    article.append(span, strong); return article;
  }));

  $("charts").replaceChildren(...fields.map(([key, label]) => {
    const counts = new Map();
    responses.forEach((item) => values(item.answers[key]).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1)));
    const article = document.createElement("article"); article.className = "chart-card";
    const heading = document.createElement("h2"); heading.textContent = label; article.append(heading);
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    if (!sorted.length) { const empty = document.createElement("p"); empty.className = "empty"; empty.textContent = "暂无数据"; article.append(empty); }
    sorted.slice(0, 10).forEach(([answer, count]) => {
      const percent = Math.round((count / Math.max(responses.length, 1)) * 100);
      const row = document.createElement("div"); row.className = "bar-row";
      const text = document.createElement("div");
      const name = document.createElement("span"); name.textContent = answer;
      const amount = document.createElement("b"); amount.textContent = `${count} · ${percent}%`;
      text.append(name, amount);
      const bar = document.createElement("i"); const fill = document.createElement("em"); fill.style.width = `${percent}%`; bar.append(fill);
      row.append(text, bar); article.append(row);
    });
    return article;
  }));

  $("count").textContent = `共 ${responses.length} 份`;
  $("rows").replaceChildren(...responses.map((item) => {
    const row = document.createElement("tr");
    const cells = [
      new Date(item.submittedAt).toLocaleString("zh-CN"), item.answers.age, item.answers.city_tier,
      item.answers.short_video_frequency, item.answers.korean_beauty, values(item.answers.makeup_styles).join("、"),
      values(item.answers.threece_purchase_drivers).join("、"), values(item.answers.threece_churn_reasons).join("、"),
    ];
    cells.forEach((value) => { const cell = document.createElement("td"); cell.textContent = value || "—"; row.append(cell); });
    return row;
  }));
}

$("login").addEventListener("submit", async (event) => {
  event.preventDefault();
  $("login-notice").textContent = "正在验证…";
  try { await load($("password").value); $("login-notice").textContent = ""; }
  catch (error) { $("login-notice").textContent = error.message; }
});

$("logout").addEventListener("click", () => {
  sessionStorage.removeItem("3ce-admin-password");
  location.reload();
});

$("export").addEventListener("click", () => {
  const headers = ["记录ID", "提交时间", "问卷版本", ...fields.map(([, label]) => label), ...otherFields.map(([, label]) => label)];
  const rows = responses.map((item) => [
    item.id, new Date(item.submittedAt).toLocaleString("zh-CN"), item.surveyVersion || "旧版",
    ...fields.map(([key]) => item.answers[key]), ...otherFields.map(([key]) => item.answers[key] || ""),
  ]);
  const csv = "\uFEFF" + [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `3CE问卷数据-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click(); URL.revokeObjectURL(link.href);
});

const saved = sessionStorage.getItem("3ce-admin-password");
if (saved) load(saved).catch(() => sessionStorage.removeItem("3ce-admin-password"));
