const questions = [
  { id: "age", section: "基本情况", title: "你的年龄段？", type: "single", options: ["18岁以下", "18–22岁", "23–26岁", "27–30岁", "30岁以上"] },
  { id: "city_tier", section: "基本情况", title: "你所在城市层级？", type: "single", options: ["一线/新一线", "二线城市", "三四线城市", "县城/乡镇"] },
  { id: "short_video_frequency", section: "基本情况", title: "你观看短视频/短剧的频率？", type: "single", options: ["每天都会看", "每周3–5次", "每周1–2次", "很少观看", "几乎不看"] },
  { id: "beauty_purchase_frequency", section: "基本情况", title: "你购买彩妆/化妆品的频率？", type: "single", options: ["每周≥1次", "每月1–2次", "2–3个月1次", "半年及以上一次"] },
  { id: "channels", section: "购买渠道 & 下单动因", title: "主要购买彩妆渠道", hint: "可多选", type: "multi", options: ["线上（电商/小红书/抖音等）", "线下专柜/美妆集合店"] },
  { id: "online_drivers", section: "购买渠道 & 下单动因", title: "线上促使你快速下单的核心因素", hint: "最多选择 3 项", type: "multi", max: 3, options: ["博主/KOL种草推荐", "产品品质口碑", "价格/促销优惠", "包装颜值好看"] },
  { id: "offline_drivers", section: "购买渠道 & 下单动因", title: "线下促使你快速下单的核心因素", hint: "最多选择 3 项", type: "multi", max: 3, options: ["导购服务态度好", "门店限定活动", "线下明星/品牌见面会", "现场试妆效果"] },
  { id: "korean_beauty", section: "彩妆风格与韩系消费", title: "是否购买过韩系彩妆（3CE、Romand、爱丽小屋等）？", type: "single", options: ["经常购买", "偶尔购买", "没买过但感兴趣", "不感兴趣"] },
  { id: "makeup_styles", section: "彩妆风格与韩系消费", title: "当下偏好的彩妆风格", hint: "可多选", type: "multi", other: true, options: ["韩系氛围感", "欧美/轻欧美妆", "日常通勤淡妆", "国风妆容", "其他"] },
  { id: "purchase_mindset", section: "消费态度", title: "买彩妆时，下面哪句话最像你？", type: "single", options: ["好看又心动，先买了再说", "会先判断是否符合自己的风格", "希望品牌帮我找到适合自己的风格", "更关注成分、功能和实用性"] },
  { id: "beauty_meaning", section: "消费态度", title: "对你来说，美妆更像是生活中的什么？", hint: "最多选择 2 项", type: "multi", max: 2, options: ["让自己看起来状态更好", "表达自己的个性与风格", "增加自信和好心情", "满足社交或职场需要", "享受尝试与探索的乐趣"] },
  { id: "threece_purchase_drivers", section: "关于 3CE", title: "如果你愿意购买 3CE，最打动你的是什么？", hint: "最多选择 3 项", type: "multi", max: 3, other: true, options: ["喜欢品牌风格", "产品设计好看", "达人或博主推荐", "朋友推荐", "想尝试韩系妆容", "产品适合自己", "价格或促销有吸引力", "其他"] },
  { id: "threece_churn_reasons", section: "关于 3CE", title: "如果你没有持续购买 3CE，主要是因为什么？", hint: "最多选择 3 项；从未购买者可直接提交", type: "multi", max: 3, other: true, optional: true, options: ["新鲜感逐渐减弱", "找不到适合自己的产品", "对品牌缺少持续认同感", "有更喜欢的替代品牌", "产品特色不够突出", "不知道该如何选择", "价格不符合预期", "其他"] },
];

const $ = (id) => document.getElementById(id);
const state = { step: 0, answers: {}, submitting: false };

for (let i = 0; i < 170; i += 1) {
  const star = document.createElement("i");
  star.style.left = `${(i * 47 + 7) % 100}%`;
  star.style.top = `${(i * 73 + 11) % 100}%`;
  star.style.animationDelay = `${-(i % 17) * 0.21}s`;
  star.style.animationDuration = `${1.9 + (i % 9) * 0.31}s`;
  $("stars").append(star);
}

function selected(question, option) {
  const value = state.answers[question.id];
  return Array.isArray(value) ? value.includes(option) : value === option;
}

function otherKey(question) {
  return `${question.id}_other`;
}

function render() {
  const question = questions[state.step];
  $("counter").textContent = `${String(state.step + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  $("progress").style.width = `${((state.step + 1) / questions.length) * 100}%`;
  $("section").textContent = question.section;
  $("title").textContent = question.title;
  $("hint").textContent = question.hint || "";
  $("back").disabled = state.step === 0;
  $("next").innerHTML = state.step === questions.length - 1 ? "提交问卷 <span>→</span>" : "下一题 <span>→</span>";
  $("notice").textContent = "";
  $("options").replaceChildren();

  question.options.forEach((option, index) => {
    const active = selected(question, option);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `option${active ? " active" : ""}`;
    button.setAttribute("aria-pressed", String(active));
    const key = document.createElement("span");
    key.className = "option-key";
    key.textContent = String.fromCharCode(65 + index);
    const label = document.createElement("span");
    label.textContent = option;
    const mark = document.createElement("b");
    mark.textContent = question.type === "multi" ? (active ? "✓" : "+") : (active ? "●" : "○");
    button.append(key, label, mark);
    button.addEventListener("click", () => pick(question, option));
    $("options").append(button);
  });

  const current = state.answers[question.id];
  const hasOther = question.other && Array.isArray(current) && current.includes("其他");
  if (hasOther) {
    const answerKey = otherKey(question);
    const other = document.createElement("label");
    other.className = "other";
    other.textContent = "请补充说明";
    const input = document.createElement("input");
    input.maxLength = 80;
    input.placeholder = "请写下你的答案……";
    input.value = state.answers[answerKey] || "";
    input.addEventListener("input", (event) => { state.answers[answerKey] = event.target.value; });
    other.append(input);
    $("options").append(other);
    queueMicrotask(() => input.focus());
  }
}

function pick(question, option) {
  $("notice").textContent = "";
  if (question.type === "single") {
    state.answers[question.id] = option;
  } else {
    const current = Array.isArray(state.answers[question.id]) ? state.answers[question.id] : [];
    if (current.includes(option)) {
      state.answers[question.id] = current.filter((item) => item !== option);
      if (option === "其他") delete state.answers[otherKey(question)];
    } else if (current.length < (question.max || 99)) {
      state.answers[question.id] = [...current, option];
    } else {
      $("notice").textContent = `最多选择 ${question.max} 项哦`;
      return;
    }
  }
  render();
}

function canContinue() {
  const question = questions[state.step];
  const value = state.answers[question.id];
  const answered = Array.isArray(value) ? value.length > 0 : Boolean(value);
  if (!answered) return Boolean(question.optional);
  return !(question.other && value.includes("其他") && !String(state.answers[otherKey(question)] || "").trim());
}

$("start").addEventListener("click", () => {
  $("hero").classList.add("hidden");
  $("survey").classList.remove("hidden");
  render();
});

$("back").addEventListener("click", () => {
  state.step = Math.max(0, state.step - 1);
  render();
});

$("survey").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canContinue()) {
    $("notice").textContent = "先留下你的答案，再去下一颗星星吧";
    return;
  }
  if (state.step < questions.length - 1) {
    state.step += 1;
    render();
    return;
  }
  if (state.submitting) return;
  state.submitting = true;
  $("next").disabled = true;
  $("next").textContent = "正在提交…";
  try {
    const response = await fetch("/api/responses", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ answers: state.answers }),
    });
    if (!response.ok) throw new Error("submit failed");
    $("survey").classList.add("hidden");
    $("thanks").classList.remove("hidden");
  } catch {
    $("notice").textContent = "提交失败，请检查网络后再试一次";
    $("next").disabled = false;
    $("next").innerHTML = "提交问卷 <span>→</span>";
  } finally {
    state.submitting = false;
  }
});

$("again").addEventListener("click", () => {
  state.step = 0;
  state.answers = {};
  $("thanks").classList.add("hidden");
  $("hero").classList.remove("hidden");
});
