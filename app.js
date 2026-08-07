const commonBeforeBranch = [
  { number: "Q1", id: "age", section: "基本信息", title: "您的年龄：", type: "single", options: ["18岁以下", "18–22岁", "23–26岁", "27岁以上"] },
  { number: "Q2", id: "city", section: "基本信息", title: "您所在城市：", type: "single", cityLookup: true, options: ["一线城市", "新一线城市", "二线城市", "三线及以下城市/县城"] },
  { number: "Q3", id: "beauty_content_platforms", section: "美妆内容接触", title: "您平时接触美妆内容的平台有哪些？", hint: "可多选", type: "multi", options: ["小红书", "抖音", "B站", "微博", "韩剧/短剧平台", "朋友推荐", "线下试妆"] },
  { number: "Q4", id: "purchase_motivations", section: "彩妆消费洞察", title: "您购买彩妆产品最主要的原因是什么？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["表达自己的个性", "模仿喜欢的明星/影视角色", "符合特定场合的妆容需求（如演唱会）", "跟随潮流", "享受购买和使用过程", "其他"], other: { id: "purchase_motivations_other", label: "请补充其他原因" } },
  { number: "Q6", id: "purchase_difficulties", section: "彩妆消费洞察", title: "您在购买彩妆时最大的困难是什么？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["色号太多，不知道怎么选择", "无法找准个人风格定位", "容易被种草，但买回来闲置"] },
  { number: "Q7", id: "recommendation_mismatch", section: "彩妆消费洞察", title: "您是否经历过“看到别人推荐某款彩妆很心动，但购买后发现不适合自己”？", type: "single", options: ["经常", "偶尔", "很少", "从没有"] },
  { number: "Q8", id: "brand_single_help", section: "品牌期待", title: "如果一个美妆品牌只能解决一个问题，您最希望它帮助您：", type: "single", options: ["找到适合自己的产品", "教会我如何使用", "帮我打造不同生活场景下的形象", "其他"], other: { id: "brand_single_help_other", label: "请写下您希望品牌提供的其他帮助" } },
  { number: "Q9", id: "threece_awareness", section: "关于 3CE", title: "您对 3CE 的了解程度：", hint: "您的选择将匹配接下来的两道题", type: "single", options: ["经常购买", "买过1–2次", "听说过但没有购买", "完全不了解"] },
];

const branchQuestions = {
  A: [
    { number: "Q10A", id: "threece_repeat_reasons_a", section: "3CE购买体验", title: "您持续购买 3CE 的主要原因是什么？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["产品效果符合预期", "色彩和妆效适合我", "包装与视觉设计吸引我", "能代表我喜欢的韩系风格", "新品更新有吸引力", "明星/KOL或社交媒体影响", "性价比较高", "已经形成使用习惯", "品牌活动或会员权益", "其他"], other: { id: "threece_repeat_reasons_a_other", label: "请补充其他原因" } },
    { number: "Q11A", id: "threece_more_purchase_a", section: "3CE购买体验", title: "什么会促使您更频繁地购买 3CE？", hint: "可多选", type: "multi", options: ["更懂我的个性化产品推荐服务", "根据不同生活场景推荐完整妆容", "新品试用或专属优惠", "更丰富的色号和产品类型", "线上虚拟试妆", "与喜欢的明星/KOL联名", "用户共创、投票或限定活动", "更持续的品牌互动与陪伴"] },
  ],
  B: [
    { number: "Q10B", id: "threece_low_purchase_reasons_b", section: "3CE购买体验", title: "您没有继续购买或很少购买 3CE 的主要原因是什么？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["产品体验没有达到预期", "产品不错，但没有持续关注品牌", "不清楚新品或色号是否适合自己", "产品或品牌风格不再适合自己", "感觉3CE只是阶段性流行", "与其他品牌相比缺少新鲜感", "其他品牌更懂我的需求", "其他品牌更有互动感或陪伴感", "价格或性价比因素", "购买渠道不方便", "其他"], other: { id: "threece_low_purchase_reasons_b_other", label: "请补充其他原因" } },
    { number: "Q11B", id: "threece_reengagement_b", section: "3CE购买体验", title: "以下哪些方式可能让您重新关注或购买 3CE？", hint: "可多选", type: "multi", exclusive: "暂时没有什么能让我重新购买", options: ["根据我的特征推荐色号", "根据生活场景提供妆容方案", "虚拟试妆或AI妆容顾问", "更有吸引力的新品和限定系列", "会员权益、复购优惠", "与用户共同设计新品", "持续记录和更新个人风格档案", "明星/KOL合作", "暂时没有什么能让我重新购买"] },
  ],
  C: [
    { number: "Q10C", id: "threece_nonpurchase_reasons_c", section: "3CE品牌认知", title: "您知道 3CE 但一直没有购买的主要原因是什么？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["不确定产品是否适合自己", "不知道应该选择哪个色号", "对产品效果缺乏了解", "品牌风格不是我的类型", "其他品牌能够满足我的需求", "价格或性价比不合适", "缺少试用或试妆机会", "没有产生实际购买需求", "购买渠道不方便", "其他"], other: { id: "threece_nonpurchase_reasons_c_other", label: "请补充其他原因" } },
    { number: "Q11C", id: "threece_first_purchase_c", section: "3CE品牌认知", title: "以下哪些体验会提高您首次购买 3CE 的可能性？", hint: "可多选", type: "multi", exclusive: "都不会明显提高", options: ["AI分析适合我的色号和风格", "在线虚拟试妆", "提供不同生活场景下的完整妆容方案", "新用户试用装或首次购买优惠", "真实用户的妆效展示", "明星/KOL推荐", "朋友推荐或社交分享", "校园限定或城市限定活动", "参与投票、共创新品", "都不会明显提高"] },
  ],
  D: [
    { number: "Q10D", id: "usual_makeup_brands_d", section: "彩妆品牌认知", title: "您通常使用的彩妆品牌是？", hint: "请填写品牌名称", type: "open", maxLength: 120 },
    { number: "Q11D", id: "new_brand_attention_d", section: "彩妆品牌认知", title: "什么最容易让您开始关注一个新的彩妆品牌？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["独特的色彩与视觉设计", "能直观看到产品在自己脸上的效果", "清晰的品牌风格", "品牌给予个性化推荐", "品牌提供不同生活场景下的妆容方案", "虚拟试妆等互动体验", "明星/KOL合作", "社交媒体热门内容", "朋友推荐", "新用户优惠或试用", "有参与感的活动或共创", "其他"], other: { id: "new_brand_attention_d_other", label: "请补充其他原因" } },
  ],
};

const commonAfterBranch = [
  { number: "Q12", id: "korean_content_interest", section: "韩系影视与风格", title: "您是否喜欢韩剧或其他韩系影视内容？", type: "single", options: ["经常观看", "偶尔观看", "不关注"] },
  { number: "Q13", id: "kdrama_elements", section: "韩系影视与风格", title: "韩剧中的哪些元素会影响您的兴趣？", hint: "最多选择 3 项", type: "multi", max: 3, options: ["角色性格", "妆容", "穿搭", "作品内核", "剧情"] },
  { number: "Q14", id: "character_projection", section: "韩系影视与风格", title: "当您看到影视中的角色时，您是否设想过自己成为喜欢的角色时会是什么样子？", type: "single", options: ["经常", "偶尔", "从没有"] },
  {
    number: "Q14A",
    id: "threece_heroine_style",
    section: "3CE女主妆风格",
    title: "如果用 3CE 的色彩语言打造您的“韩剧女主妆”，您最想尝试哪一种风格？",
    hint: "请选择最符合您期待的一种妆容风格",
    type: "single",
    options: [
      { value: "冷感灰棕女主", label: "冷感灰棕女主", detail: "关键词：克制、清醒、摩登｜妆面：轻雾半哑光底妆；灰棕与冷茶棕眼影由浅到深晕染，细闪提亮眼头和卧蚕；灰粉腮红靠后轻扫；莓果玫瑰丝绒唇柔焦边缘。" },
      { value: "奶油裸杏女主", label: "奶油裸杏女主", detail: "关键词：温柔、松弛、治愈｜妆面：奶油光泽底妆；米杏与裸棕眼影柔和铺色，香槟微闪提亮；杏桃腮红与鼻尖自然衔接；奶茶杏裸色唇釉叠加清透光泽。" },
      { value: "蜜桃珊瑚女主", label: "蜜桃珊瑚女主", detail: "关键词：元气、亲和、少女感｜妆面：清透柔光底妆；蜜桃、珊瑚与浅棕眼影塑造干净层次；蜜桃腮红横向晕染至面中；珊瑚水光唇突出饱满感。" },
      { value: "玫瑰烟熏女主", label: "玫瑰烟熏女主", detail: "关键词：故事感、神秘、坚定｜妆面：柔雾底妆搭配清晰轮廓；干枯玫瑰与梅子棕眼影加深眼尾，下眼睑轻带烟熏；玫瑰木腮红低位晕染；深莓红丝绒唇强化氛围。" },
      { value: "都市摩卡女主", label: "都市摩卡女主", detail: "关键词：理性、独立、利落｜妆面：细腻半哑光底妆；摩卡棕、燕麦色与米灰眼影塑造通勤层次，内眼线保持干净；低饱和豆沙腮红修饰轮廓；红茶豆沙唇呈现知性感。" },
      { value: "复古红棕女主", label: "复古红棕女主", detail: "关键词：浓郁、浪漫、艺术感｜妆面：暖调缎光底妆；陶土、焦糖与铜棕眼影叠加金属微闪；砖红腮红从颧骨向太阳穴晕染；枫叶红棕唇强调复古电影感。" },
      { value: "清透果冻女主", label: "清透果冻女主", detail: "关键词：自然、灵动、生命力｜妆面：薄透水润底妆保留肌肤纹理；浅杏棕眼影搭配自然卷翘睫毛和细致卧蚕；裸桃腮红轻扫面中；草莓珊瑚水光唇营造果冻质感。" },
      { value: "酷感莓紫女主", label: "酷感莓紫女主", detail: "关键词：个性、独立、不被定义｜妆面：冷调柔雾底妆与利落修容；灰紫、黑莓与冷棕眼影拉长眼型，眼尾线条清晰；冷玫瑰腮红少量点染；深莓紫渐层唇突出强气场。" },
    ],
  },
  { number: "Q15", id: "style_profile_inputs", section: "个人风格探索", title: "如果一个美妆品牌可以帮助您找到自己的风格，您希望它了解哪些信息？", hint: "可多选", type: "multi", options: ["我的性格", "我的脸型特点", "我的生活场景", "我的穿衣风格", "我的兴趣爱好", "我喜欢的影视角色", "其他"], other: { id: "style_profile_inputs_other", label: "请补充您希望品牌了解的其他信息" } },
  {
    number: "Q16",
    id: "experience_interest",
    section: "3CE体验概念测试",
    title: "如果 3CE 推出以下体验，请您结合兴趣进行打分：",
    hint: "请逐项打分：1 = 完全不感兴趣，5 = 非常感兴趣",
    type: "ratingMatrix",
    items: [
      { id: "kdrama_character_test", label: "韩剧角色测试——“你的韩剧女主类型是什么？”→ 推荐妆容" },
      { id: "scenario_makeup_assistant", label: "场景妆容助手——输入面试/约会/旅行/聚会 → 生成妆容方案" },
      { id: "ai_style_exploration", label: "AI个人风格探索——上传照片 → 分析气质 → 生成专属妆容" },
      { id: "threece_community", label: "3CE女性圈层社区——分享自己的风格、妆容与生活方式" },
      { id: "korean_trend_lab", label: "韩系潮流实验室——根据每周、每月及每季度的首尔街头流行趋势，更新相应的妆容建议" },
    ],
  },
  { number: "Q17", id: "makeup_value", section: "价值与陪伴", title: "您认为化妆最大的价值是什么？", type: "single", options: ["变漂亮", "被别人认可", "更了解自己", "成为理想中的自己", "获得快乐和仪式感", "其他"], other: { id: "makeup_value_other", label: "请补充化妆对您的其他价值" } },
  { number: "Q18", id: "brand_companionship", section: "价值与陪伴", title: "如果未来有一个美妆品牌长期陪伴您，您希望它提供什么？", hint: "请写下您的真实想法", type: "open", maxLength: 300 },
];

const branchByAwareness = {
  "经常购买": "A",
  "买过1–2次": "B",
  "听说过但没有购买": "C",
  "完全不了解": "D",
};

const cityTiers = {
  "一线城市": new Set(["北京", "上海", "广州", "深圳"]),
  "新一线城市": new Set(["成都", "杭州", "重庆", "武汉", "苏州", "西安", "南京", "长沙", "郑州", "天津", "合肥", "青岛", "东莞", "宁波", "佛山"]),
  "二线城市": new Set(["济南", "无锡", "沈阳", "昆明", "福州", "厦门", "温州", "石家庄", "大连", "哈尔滨", "金华", "泉州", "南宁", "长春", "常州", "贵阳", "南昌", "惠州", "南通", "太原", "烟台", "嘉兴", "珠海", "中山", "兰州", "徐州", "乌鲁木齐", "潍坊", "海口", "绍兴"]),
};

const $ = (id) => document.getElementById(id);
const state = { step: 0, answers: {}, submitting: false };
const starPalette = [
  ["#fff9fd", "rgba(255,192,226,.72)"],
  ["#f3e9ff", "rgba(177,129,224,.68)"],
  ["#ffe3ee", "rgba(228,116,168,.62)"],
  ["#fff0d8", "rgba(232,178,102,.58)"],
  ["#eadfff", "rgba(140,116,213,.62)"],
  ["#ffdbe5", "rgba(190,69,121,.48)"],
];

function getBranch() {
  return branchByAwareness[state.answers.threece_awareness] || "A";
}

function getQuestions() {
  return [...commonBeforeBranch, ...branchQuestions[getBranch()], ...commonAfterBranch];
}

const branchAnswerKeys = Object.values(branchQuestions).flatMap((questions) => questions.flatMap((question) => [question.id, question.other?.id].filter(Boolean)));

for (let i = 0; i < 180; i += 1) {
  const star = document.createElement("i");
  const [core, glow] = starPalette[i % starPalette.length];
  star.style.left = `${(i * 47 + 7) % 100}%`;
  star.style.top = `${(i * 73 + 11) % 100}%`;
  star.style.animationDelay = `${-(i % 17) * 0.21}s`;
  star.style.animationDuration = `${1.8 + (i % 10) * 0.28}s`;
  star.style.setProperty("--star-core", core);
  star.style.setProperty("--star-glow", glow);
  $("stars").append(star);
}

function selected(question, option) {
  const value = state.answers[question.id];
  return Array.isArray(value) ? value.includes(option) : value === option;
}

function optionValue(option) {
  return typeof option === "object" ? option.value : option;
}

function renderOptionQuestion(question) {
  question.options.forEach((option, index) => {
    const value = optionValue(option);
    const active = selected(question, value);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `option${active ? " active" : ""}`;
    button.setAttribute("aria-pressed", String(active));
    const key = document.createElement("span");
    key.className = "option-key";
    key.textContent = String.fromCharCode(65 + index);
    const label = document.createElement("span");
    if (typeof option === "object") {
      label.className = "option-copy";
      const name = document.createElement("strong");
      name.textContent = option.label;
      const detail = document.createElement("small");
      detail.textContent = option.detail;
      label.append(name, detail);
    } else {
      label.textContent = option;
    }
    const mark = document.createElement("b");
    mark.textContent = question.type === "multi" ? (active ? "✓" : "+") : (active ? "●" : "○");
    button.append(key, label, mark);
    button.addEventListener("click", () => pick(question, value));
    $("options").append(button);
  });
}

function renderOther(question) {
  if (!question.other || !selected(question, "其他")) return;
  const label = document.createElement("label");
  label.className = "other";
  label.textContent = question.other.label;
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 120;
  input.placeholder = "请输入…";
  input.value = state.answers[question.other.id] || "";
  input.addEventListener("input", () => { state.answers[question.other.id] = input.value; });
  label.append(input);
  $("options").append(label);
  queueMicrotask(() => input.focus());
}

function normalizeCityName(value) {
  return value.trim().replace(/(特别行政区|自治州|地区|盟|市|县|区)$/u, "");
}

function findCityTier(city) {
  const normalized = normalizeCityName(city);
  if (!normalized) return null;
  for (const [tier, cities] of Object.entries(cityTiers)) {
    if (cities.has(normalized)) return tier;
  }
  return "三线及以下城市/县城";
}

function renderCityLookup(question) {
  if (!question.cityLookup) return;
  const wrapper = document.createElement("div");
  wrapper.className = "city-helper";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "city-helper-link";
  toggle.textContent = "不知道城市级别？点这里输入城市查询";
  const panel = document.createElement("div");
  panel.className = "city-helper-panel hidden";
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "例如：杭州、佛山、泉州";
  input.maxLength = 20;
  const search = document.createElement("button");
  search.type = "button";
  search.textContent = "查询";
  const result = document.createElement("p");
  const note = document.createElement("small");
  note.textContent = "城市分级会随年度榜单变化；查询结果仅用于本问卷选项参考，输入的城市名称不会被保存。";
  const runLookup = () => {
    const tier = findCityTier(input.value);
    if (!tier) {
      result.textContent = "请先输入城市名称";
      return;
    }
    result.replaceChildren(document.createTextNode(`${input.value.trim()}参考归类为：`));
    const choose = document.createElement("button");
    choose.type = "button";
    choose.textContent = tier;
    choose.addEventListener("click", () => {
      state.answers[question.id] = tier;
      render();
    });
    result.append(choose);
  };
  toggle.addEventListener("click", () => {
    panel.classList.toggle("hidden");
    if (!panel.classList.contains("hidden")) input.focus();
  });
  search.addEventListener("click", runLookup);
  input.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); runLookup(); } });
  panel.append(input, search, result, note);
  wrapper.append(toggle, panel);
  $("options").append(wrapper);
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
  textarea.rows = question.id === "usual_makeup_brands_d" ? 3 : 6;
  textarea.placeholder = question.id === "usual_makeup_brands_d" ? "例如：3CE、橘朵、花知晓……" : "请写下您的真实想法…";
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

function render() {
  const questions = getQuestions();
  state.step = Math.min(state.step, questions.length - 1);
  const question = questions[state.step];
  $("counter").textContent = `${question.number} · ${String(state.step + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
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
    renderOther(question);
    renderCityLookup(question);
  }
}

function clearBranchAnswers() {
  branchAnswerKeys.forEach((key) => { delete state.answers[key]; });
}

function pick(question, option) {
  $("notice").textContent = "";
  if (question.type === "single") {
    if (question.id === "threece_awareness" && state.answers[question.id] !== option) clearBranchAnswers();
    if (question.other && option !== "其他") delete state.answers[question.other.id];
    state.answers[question.id] = option;
  } else {
    let current = Array.isArray(state.answers[question.id]) ? state.answers[question.id] : [];
    if (current.includes(option)) {
      state.answers[question.id] = current.filter((item) => item !== option);
      if (question.other && option === "其他") delete state.answers[question.other.id];
    } else if (option === question.exclusive) {
      state.answers[question.id] = [option];
    } else {
      if (question.exclusive) current = current.filter((item) => item !== question.exclusive);
      if (current.length >= (question.max || 99)) {
        $("notice").textContent = `最多选择 ${question.max} 项哦`;
        return;
      }
      state.answers[question.id] = [...current, option];
    }
  }
  render();
}

function canContinue() {
  const question = getQuestions()[state.step];
  const value = state.answers[question.id];
  if (question.type === "ratingMatrix") {
    return Boolean(value) && question.items.every((item) => Number.isInteger(value[item.id]) && value[item.id] >= 1 && value[item.id] <= 5);
  }
  if (question.type === "open") return typeof value === "string" && Boolean(value.trim());
  const answered = Array.isArray(value) ? value.length > 0 : Boolean(value);
  if (!answered) return false;
  if (question.other && selected(question, "其他")) return Boolean(state.answers[question.other.id]?.trim());
  return true;
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
  const question = getQuestions()[state.step];
  if (!canContinue()) {
    if (question.type === "ratingMatrix") $("notice").textContent = "请为五项体验都打分哦";
    else if (question.other && selected(question, "其他")) $("notice").textContent = "请补充填写“其他”的内容";
    else $("notice").textContent = "请先留下您的答案，再进入下一题";
    return;
  }
  const questions = getQuestions();
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
