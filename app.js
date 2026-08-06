const questions = [
  { id: "age", section: "基本信息", title: "您的年龄：", type: "single", options: ["18岁以下", "18–22岁", "23–26岁", "27岁以上"] },
  { id: "city", section: "基本信息", title: "您所在城市：", type: "single", options: ["一线城市", "新一线城市", "二线城市", "三线及以下城市/县城"] },
  { id: "beauty_content_platforms", section: "美妆内容接触", title: "您平时接触美妆内容的平台有哪些？", hint: "可多选", type: "multi", options: ["小红书", "抖音", "B站", "微博", "韩剧/短剧平台", "朋友推荐", "线下试妆"] },
  { id: "purchase_motivations", section: "彩妆消费洞察", title: "您购买彩妆产品最主要的原因是什么？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["表达自己的个性", "模仿喜欢的明星/影视角色", "符合特定场合的妆容需求（如演唱会）", "跟随潮流", "享受购买和使用过程"] },
  { id: "purchase_difficulties", section: "彩妆消费洞察", title: "您在购买彩妆时最大的困难是什么？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["色号太多，不知道怎么选择", "无法找准个人风格定位", "容易被种草，但买回来闲置"], optionalText: { id: "purchase_difficulties_note", label: "还有其他困难？可以写在这里（选填）" } },
  { id: "recommendation_mismatch", section: "彩妆消费洞察", title: "您是否经历过“看到别人推荐某款彩妆很心动，但购买后发现不适合自己”？", type: "single", options: ["经常", "偶尔", "很少", "从没有"], optionalText: { id: "recommendation_mismatch_note", label: "如果愿意，可以说说那次经历（选填）" } },
  { id: "brand_single_help", section: "品牌期待", title: "如果一个品牌只能解决一个问题，您最希望它帮助您：", type: "single", options: ["找到适合自己的产品", "教会我如何使用", "帮我打造不同生活场景下的形象"] },
  { id: "threece_awareness", section: "关于 3CE", title: "您对 3CE 的了解程度：", type: "single", options: ["经常购买", "买过1–2次", "听说过但没有购买", "完全不了解"] },
  { id: "threece_attractions", section: "关于 3CE", title: "您认为 3CE 最大的吸引力是什么？", hint: "可多选", type: "multi", options: ["色彩设计", "包装颜值", "明星/KOL推荐", "产品效果", "代表一种韩系生活方式"] },
  { id: "threece_churn_reasons", section: "关于 3CE", title: "如果您没有持续购买 3CE，原因是什么？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["产品不错，但没有持续关注", "不知道新品适不适合自己", "感觉3CE只是阶段性流行", "其他品牌更有陪伴感", "价格因素"], optionalText: { id: "threece_churn_reasons_note", label: "还有其他原因？可以写在这里（选填）" } },
  { id: "korean_content_interest", section: "韩系影视与风格", title: "您是否喜欢韩剧、韩系影视内容？", type: "single", options: ["经常观看", "偶尔观看", "不关注"] },
  { id: "kdrama_elements", section: "韩系影视与风格", title: "韩剧中的哪些元素会影响您的兴趣？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["女主角性格", "妆容", "穿搭", "生活方式", "爱情/成长故事", "氛围感"], optionalText: { id: "kdrama_elements_note", label: "还有其他会影响您的元素？可以写在这里（选填）" } },
  { id: "character_projection", section: "韩系影视与风格", title: "当您看到影视中的角色时，您有没有想过“如果我是她，我会是什么样？”", type: "single", options: ["经常", "偶尔", "从没有"] },
  { id: "style_profile_inputs", section: "个人风格探索", title: "如果一个美妆品牌可以帮助您找到自己的风格，您希望它了解哪些信息？", hint: "可多选", type: "multi", options: ["我的性格", "我的脸型特点", "我的生活场景", "我的穿衣风格", "我的兴趣爱好", "我喜欢的影视角色"], optionalText: { id: "style_profile_inputs_note", label: "还有希望品牌了解的信息？可以写在这里（选填）" } },
  {
    id: "experience_interest",
    section: "体验概念测试",
    title: "以下体验，哪个最吸引您？",
    hint: "请逐项打分：1 = 完全不感兴趣，5 = 非常感兴趣",
    type: "ratingMatrix",
    items: [
      { id: "kdrama_character_test", label: "韩剧角色测试——“你的韩剧女主类型是什么？”→ 推荐妆容" },
      { id: "scenario_makeup_assistant", label: "场景妆容助手——输入面试/约会/旅行/聚会 → 生成妆容方案" },
      { id: "ai_style_exploration", label: "AI个人风格探索——上传照片 → 分析气质 → 生成专属妆容" },
      { id: "threece_community", label: "3CE女性圈层社区——分享自己的风格、妆容与生活方式" },
    ],
  },
  { id: "makeup_value", section: "价值与陪伴", title: "您认为化妆最大的价值是什么？", type: "single", options: ["变漂亮", "被别人认可", "更了解自己", "成为理想中的自己", "获得快乐和仪式感"] },
  { id: "brand_companionship", section: "价值与陪伴", title: "如果未来有一个品牌长期陪伴您成长，您希望它提供什么？", hint: "请写下您的真实想法", type: "open", maxLength: 300 },
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

function renderOptionQuestion(question) {
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
}

function renderRatingMatrix(question) {
  const current = state.answers[question.id] || {};
  const matrix = document.createElement("div");
  matrix.className = "rating-grid";
  question.items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "rating-card";
    const label = document.createElement("p");
    label.textContent = `${String.fromCharCode(65 + index)}. ${item.label}`;
    const choices = document.createElement("div");
    choices.className = "rating-choices";
    for (let score = 1; score <= 5; score += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = current[item.id] === score ? "active" : "";
      button.textContent = score;
      button.setAttribute("aria-label", `${item.label}：${score}分`);
      button.addEventListener("click", () => {
        state.answers[question.id] = { ...(state.answers[question.id] || {}), [item.id]: score };
        render();
      });
      choices.append(button);
    }
    card.append(label, choices);
    matrix.append(card);
  });
  $("options").append(matrix);
}

function renderOpenQuestion(question) {
  const label = document.createElement("label");
  label.className = "open-answer";
  const textarea = document.createElement("textarea");
  textarea.maxLength = question.maxLength || 300;
  textarea.rows = 6;
  textarea.placeholder = "例如：风格建议、妆容教程、成长陪伴、生活灵感……";
  textarea.value = state.answers[question.id] || "";
  const count = document.createElement("span");
  const updateCount = () => { count.textContent = `${textarea.value.length} / ${textarea.maxLength}`; };
  textarea.addEventListener("input", () => {
    state.answers[question.id] = textarea.value;
    updateCount();
  });
  updateCount();
  label.append(textarea, count);
  $("options").append(label);
  queueMicrotask(() => textarea.focus());
}

function renderOptionalText(question) {
  if (!question.optionalText) return;
  const label = document.createElement("label");
  label.className = "open-answer supplementary-answer";
  const prompt = document.createElement("p");
  prompt.textContent = question.optionalText.label;
  const textarea = document.createElement("textarea");
  textarea.maxLength = 200;
  textarea.rows = 3;
  textarea.placeholder = "想补充的话，可以写在这里…";
  textarea.value = state.answers[question.optionalText.id] || "";
  const count = document.createElement("span");
  const updateCount = () => { count.textContent = `${textarea.value.length} / ${textarea.maxLength}`; };
  textarea.addEventListener("input", () => {
    state.answers[question.optionalText.id] = textarea.value;
    updateCount();
  });
  updateCount();
  label.append(prompt, textarea, count);
  $("options").append(label);
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

  if (question.type === "ratingMatrix") renderRatingMatrix(question);
  else if (question.type === "open") renderOpenQuestion(question);
  else {
    renderOptionQuestion(question);
    renderOptionalText(question);
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
  if (question.type === "ratingMatrix") {
    return Boolean(value) && question.items.every((item) => Number.isInteger(value[item.id]) && value[item.id] >= 1 && value[item.id] <= 5);
  }
  if (question.type === "open") return typeof value === "string" && Boolean(value.trim());
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
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
    $("notice").textContent = questions[state.step].type === "ratingMatrix" ? "请为四项体验都打分哦" : "先留下您的答案，再去下一颗星星吧";
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
    $("notice").textContent = "提交失败，请稍后再试一次";
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
