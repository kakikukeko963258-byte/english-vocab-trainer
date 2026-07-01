const els = {
  totalCount: document.querySelector("#totalCount"),
  accuracy: document.querySelector("#accuracy"),
  masteredCount: document.querySelector("#masteredCount"),
  directionButtons: [...document.querySelectorAll("[data-direction]")],
  modeButtons: [...document.querySelectorAll("[data-mode]")],
  scopeSelect: document.querySelector("#scopeSelect"),
  groupSelect: document.querySelector("#groupSelect"),
  restartBtn: document.querySelector("#restartBtn"),
  resetStatsBtn: document.querySelector("#resetStatsBtn"),
  groupTag: document.querySelector("#groupTag"),
  cardCounter: document.querySelector("#cardCounter"),
  promptLabel: document.querySelector("#promptLabel"),
  promptText: document.querySelector("#promptText"),
  typingArea: document.querySelector("#typingArea"),
  initialHint: document.querySelector("#initialHint"),
  initialText: document.querySelector("#initialText"),
  answerInput: document.querySelector("#answerInput"),
  choiceArea: document.querySelector("#choiceArea"),
  plateArea: document.querySelector("#plateArea"),
  plateSlots: document.querySelector("#plateSlots"),
  plateRevealBtn: document.querySelector("#plateRevealBtn"),
  plateBank: document.querySelector("#plateBank"),
  checkBtn: document.querySelector("#checkBtn"),
  revealBtn: document.querySelector("#revealBtn"),
  starBtn: document.querySelector("#starBtn"),
  feedback: document.querySelector("#feedback"),
  feedbackTitle: document.querySelector("#feedbackTitle"),
  answerLine: document.querySelector("#answerLine"),
  exampleLine: document.querySelector("#exampleLine"),
  noteLine: document.querySelector("#noteLine"),
  searchInput: document.querySelector("#searchInput"),
  wordList: document.querySelector("#wordList")
};

const STORAGE_KEY = "english-vocab-trainer-v1";
const DEFAULT_SETTINGS = {
  direction: "en-ja",
  mode: "type",
  scope: "all",
  group: "all"
};

const EXAMPLES = {
  acquire: { en: "She acquired a new skill during the summer.", ja: "彼女は夏の間に新しい技能を身につけた。" },
  derive: { en: "We derived the answer from the data.", ja: "私たちはそのデータから答えを導き出した。" },
  fetch: { en: "Can you fetch my notebook from the classroom?", ja: "教室から私のノートを取ってきてくれる？" },
  gain: { en: "He gained confidence after the speech.", ja: "彼はスピーチのあと自信を得た。" },
  earn: { en: "She earns money by teaching math.", ja: "彼女は数学を教えてお金を稼いでいる。" },
  obtain: { en: "You need to obtain permission first.", ja: "まず許可を得る必要がある。" },
  purchase: { en: "I purchased this sweater last week.", ja: "私は先週このセーターを購入した。" },
  reserve: { en: "I reserved a table for two.", ja: "私は2人用のテーブルを予約した。" },
  undertake: { en: "Nobody wanted to undertake the task.", ja: "誰もその仕事を引き受けたがらなかった。" },
  afford: { en: "I cannot afford a new bike now.", ja: "今は新しい自転車を買う余裕がない。" },
  award: { en: "The school awarded her a prize.", ja: "学校は彼女に賞を授与した。" },
  confer: { en: "The university conferred a degree on him.", ja: "大学は彼に学位を授けた。" },
  dedicate: { en: "He dedicated the book to his parents.", ja: "彼はその本を両親に捧げた。" },
  devote: { en: "She devotes an hour a day to English.", ja: "彼女は毎日1時間を英語に費やす。" },
  donate: { en: "They donated clothes to the shelter.", ja: "彼らは避難所に服を寄付した。" },
  endow: { en: "The scholarship endowed him with hope.", ja: "その奨学金は彼に希望を与えた。" },
  distribute: { en: "The teacher distributed copies to the class.", ja: "先生はクラスにコピーを配った。" },
  feed: { en: "Please feed the dog before dinner.", ja: "夕食前に犬に餌をあげてください。" },
  grant: { en: "The teacher granted him extra time.", ja: "先生は彼に追加時間を与えた。" },
  offer: { en: "She offered her seat to an old man.", ja: "彼女は老人に席を譲ると申し出た。" },
  supply: { en: "This farm supplies milk to the town.", ja: "この農場は町に牛乳を供給している。" },
  bestow: { en: "The queen bestowed an honor on the hero.", ja: "女王はその英雄に名誉を授けた。" },
  alter: { en: "We altered the plan after lunch.", ja: "私たちは昼食後に計画を変更した。" },
  barter: { en: "They bartered fish for rice.", ja: "彼らは魚を米と物々交換した。" },
  convert: { en: "The room was converted into a studio.", ja: "その部屋はスタジオに変えられた。" },
  disguise: { en: "The actor disguised himself as a doctor.", ja: "その俳優は医者に変装した。" },
  modify: { en: "We modified the design for safety.", ja: "私たちは安全のためにデザインを変更した。" },
  renew: { en: "I must renew my passport this month.", ja: "今月パスポートを更新しなければならない。" },
  replace: { en: "Please replace the old battery.", ja: "古い電池を交換してください。" },
  revise: { en: "She revised her essay before class.", ja: "彼女は授業前に作文を見直した。" },
  translate: { en: "Can you translate this sentence into Japanese?", ja: "この文を日本語に翻訳できますか。" },
  vary: { en: "The rules vary from school to school.", ja: "規則は学校によって異なる。" },
  fix: { en: "My father fixed the broken chair.", ja: "父は壊れた椅子を修理した。" },
  mend: { en: "She mended the hole in her shirt.", ja: "彼女はシャツの穴を繕った。" },
  recover: { en: "He recovered quickly from the flu.", ja: "彼はインフルエンザからすぐに回復した。" },
  retrieve: { en: "I retrieved the file from the computer.", ja: "私はコンピューターからそのファイルを取り戻した。" },
  ascend: { en: "The road ascends steeply from here.", ja: "道はここから急に上っている。" },
  commute: { en: "Many students commute by train.", ja: "多くの学生は電車で通学する。" },
  descend: { en: "We descended the stairs quietly.", ja: "私たちは静かに階段を下りた。" },
  divert: { en: "The police diverted traffic around the accident.", ja: "警察は事故現場を避けて交通を迂回させた。" },
  navigate: { en: "The captain navigated the ship through fog.", ja: "船長は霧の中で船を操縦した。" },
  proceed: { en: "The meeting proceeded as scheduled.", ja: "会議は予定通りに進んだ。" },
  transfer: { en: "Please transfer the money today.", ja: "今日そのお金を振り込んでください。" },
  transmit: { en: "Mosquitoes can transmit disease.", ja: "蚊は病気を伝染させることがある。" },
  transplant: { en: "Doctors transplanted a new heart.", ja: "医師たちは新しい心臓を移植した。" },
  shift: { en: "He shifted his attention to the screen.", ja: "彼は画面へ注意を移した。" },
  accuse: { en: "They accused him of stealing the bag.", ja: "彼らは彼がバッグを盗んだと告発した。" },
  blame: { en: "Do not blame others for your mistake.", ja: "自分のミスを他人のせいにしてはいけない。" },
  complain: { en: "She complained about the noise.", ja: "彼女は騒音について不平を言った。" },
  condemn: { en: "The mayor condemned the violent act.", ja: "市長はその暴力行為を非難した。" },
  convict: { en: "The court convicted him of fraud.", ja: "裁判所は彼を詐欺で有罪にした。" },
  criticize: { en: "My coach criticized my weak defense.", ja: "コーチは私の弱い守備を批判した。" },
  deplore: { en: "We deplore the damage caused by war.", ja: "私たちは戦争による被害を嘆く。" },
  prosecute: { en: "The lawyer decided to prosecute the case.", ja: "弁護士はその事件を起訴することにした。" },
  punish: { en: "The teacher punished the student for cheating.", ja: "先生はカンニングをした生徒を罰した。" },
  reproach: { en: "She reproached me for being late.", ja: "彼女は私が遅れたことを非難した。" },
  scold: { en: "His mother scolded him for lying.", ja: "母は彼がうそをついたことで叱った。" },
  sue: { en: "The company sued him for damages.", ja: "その会社は損害賠償を求めて彼を訴えた。" },
  chat: { en: "We chatted about music after school.", ja: "放課後、私たちは音楽についておしゃべりした。" },
  confess: { en: "He confessed his mistake to the teacher.", ja: "彼は先生に自分の過ちを告白した。" },
  converse: { en: "They conversed in English for an hour.", ja: "彼らは1時間英語で会話した。" },
  disclose: { en: "The report disclosed new facts.", ja: "その報告書は新しい事実を明らかにした。" },
  describe: { en: "Can you describe the suspect?", ja: "容疑者について説明できますか。" },
  exclaim: { en: "She exclaimed with joy.", ja: "彼女は喜んで叫んだ。" },
  mutter: { en: "He muttered something under his breath.", ja: "彼は小声で何かをつぶやいた。" },
  recite: { en: "The child recited a short poem.", ja: "その子は短い詩を暗唱した。" },
  reveal: { en: "The test revealed the cause of the problem.", ja: "その検査は問題の原因を明らかにした。" },
  roar: { en: "The lion roared loudly at night.", ja: "ライオンは夜に大きく吠えた。" },
  scream: { en: "She screamed for help.", ja: "彼女は助けを求めて悲鳴をあげた。" },
  utter: { en: "He did not utter a word.", ja: "彼は一言も口にしなかった。" },
  whisper: { en: "Please whisper in the library.", ja: "図書館ではささやいてください。" },
  yell: { en: "The boys yelled for help.", ja: "少年たちは助けを求めて叫んだ。" },
  advocate: { en: "We advocate the use of clean energy.", ja: "私たちはクリーンエネルギーの使用を支持する。" },
  assert: { en: "He asserted that he was innocent.", ja: "彼は自分が無実だと言い張った。" },
  boast: { en: "He often boasts about his grades.", ja: "彼はよく自分の成績を自慢する。" },
  claim: { en: "She claims that the story is true.", ja: "彼女はその話が本当だと主張している。" },
  declare: { en: "The president declared an emergency.", ja: "大統領は非常事態を宣言した。" },
  demonstrate: { en: "The experiment demonstrated the theory.", ja: "その実験は理論を実証した。" },
  emphasize: { en: "The teacher emphasized this point.", ja: "先生はこの点を強調した。" },
  exaggerate: { en: "He exaggerated the size of the fish.", ja: "彼は魚の大きさを誇張した。" },
  insist: { en: "She insisted on paying the bill.", ja: "彼女は勘定を払うと強く主張した。" },
  persist: { en: "He persisted in asking the same question.", ja: "彼は同じ質問をしつこく続けた。" },
  plead: { en: "The child pleaded for another chance.", ja: "その子はもう一度チャンスをくださいと懇願した。" },
  proclaim: { en: "They proclaimed victory after the match.", ja: "彼らは試合後に勝利を宣言した。" },
  remark: { en: "She remarked that the room was cold.", ja: "彼女は部屋が寒いと言った。" },
  suggest: { en: "I suggested a new plan.", ja: "私は新しい計画を提案した。" },
  warn: { en: "The sign warns drivers of danger.", ja: "その標識は運転手に危険を警告している。" },
  breathe: { en: "I could not breathe through my nose.", ja: "私は鼻で呼吸できなかった。" },
  digest: { en: "This enzyme helps digest food.", ja: "この酵素は食物を消化するのを助ける。" },
  choke: { en: "Drink some water or you may choke.", ja: "水を飲みなさい、そうしないとむせるかもしれない。" },
  pant: { en: "The dog panted after running.", ja: "犬は走ったあと息を切らした。" },
  sigh: { en: "She sighed with relief.", ja: "彼女は安心してため息をついた。" },
  swear: { en: "He swore to tell the truth.", ja: "彼は真実を話すと誓った。" },
  cough: { en: "I coughed all night.", ja: "私は一晩中せきをした。" },
  sneeze: { en: "He sneezed three times.", ja: "彼は3回くしゃみをした。" },
  suck: { en: "The baby sucked his thumb.", ja: "赤ちゃんは親指を吸った。" },
  swallow: { en: "She swallowed the pill with water.", ja: "彼女は水でその薬を飲み込んだ。" },
  acquaint: { en: "I became acquainted with my neighbors.", ja: "私は近所の人たちと知り合いになった。" },
  advertise: { en: "The company advertised its new product.", ja: "その会社は新製品を宣伝した。" },
  announce: { en: "They announced the winner.", ja: "彼らは勝者を発表した。" },
  broadcast: { en: "The station broadcast the game live.", ja: "その放送局は試合を生中継した。" },
  convey: { en: "Her smile conveyed her feelings.", ja: "彼女の笑顔は気持ちを伝えていた。" },
  inform: { en: "Please inform me of any changes.", ja: "変更があれば私に知らせてください。" },
  educate: { en: "Parents educate children at home.", ja: "親は家庭で子どもを教育する。" },
  induce: { en: "The ad induced me to buy the shoes.", ja: "その広告は私にその靴を買わせた。" },
  intervene: { en: "The teacher intervened in the argument.", ja: "先生はその口論に介入した。" },
  mislead: { en: "The map misled the tourists.", ja: "その地図は旅行者を誤解させた。" },
  persuade: { en: "I persuaded him to join the team.", ja: "私は彼を説得してチームに入らせた。" },
  testify: { en: "The witness testified in court.", ja: "目撃者は法廷で証言した。" },
  verify: { en: "Please verify your address.", ja: "住所を確認してください。" },
  acknowledge: { en: "He acknowledged his mistake.", ja: "彼は自分の過ちを認めた。" },
  beware: { en: "Beware of cars when you cross the street.", ja: "道を渡るときは車に気をつけなさい。" },
  comprehend: { en: "I cannot comprehend this rule.", ja: "私はこの規則を理解できない。" },
  doubt: { en: "I doubt his story.", ja: "私は彼の話を疑っている。" },
  identify: { en: "The police identified the suspect.", ja: "警察は容疑者を特定した。" },
  interpret: { en: "She interpreted his words as a joke.", ja: "彼女は彼の言葉を冗談だと解釈した。" },
  notice: { en: "Did you notice the mistake?", ja: "その間違いに気づきましたか。" },
  perceive: { en: "Dogs can perceive small sounds.", ja: "犬は小さな音を知覚できる。" },
  recognize: { en: "I recognized her voice at once.", ja: "私はすぐに彼女の声だと分かった。" },
  regard: { en: "We regard him as a leader.", ja: "私たちは彼をリーダーとみなしている。" },
  obsess: { en: "He is obsessed with video games.", ja: "彼はテレビゲームに取りつかれている。" },
  suspect: { en: "I suspect that he is lying.", ja: "私は彼がうそをついているのではないかと疑っている。" },
  conceive: { en: "She conceived a plan for the event.", ja: "彼女はその行事の計画を考え出した。" },
  consider: { en: "Please consider my proposal.", ja: "私の提案を検討してください。" },
  contemplate: { en: "He contemplated changing jobs.", ja: "彼は転職をじっくり考えた。" },
  ponder: { en: "She pondered the question for a while.", ja: "彼女はしばらくその問題を熟考した。" },
  contrive: { en: "They contrived a clever solution.", ja: "彼らは巧妙な解決策を考案した。" },
  suppose: { en: "I suppose he will arrive soon.", ja: "彼はまもなく到着すると思う。" },
  intend: { en: "I intend to study abroad next year.", ja: "私は来年留学するつもりだ。" },
  anticipate: { en: "We anticipate heavy rain tonight.", ja: "私たちは今夜大雨を予想している。" },
  assume: { en: "Do not assume that everyone agrees.", ja: "全員が賛成していると思い込んではいけない。" },
  estimate: { en: "They estimated the cost at ten thousand yen.", ja: "彼らは費用を1万円と見積もった。" },
  expect: { en: "I expect a reply by Friday.", ja: "私は金曜日までに返事を期待している。" },
  foresee: { en: "No one foresaw the problem.", ja: "誰もその問題を予見しなかった。" },
  forecast: { en: "The weather report forecast snow.", ja: "天気予報は雪を予測した。" },
  presume: { en: "I presumed that he was at home.", ja: "私は彼が家にいると推定した。" },
  predict: { en: "Scientists predict a rise in temperature.", ja: "科学者たちは気温の上昇を予測している。" },
  speculate: { en: "They speculated about the cause.", ja: "彼らは原因についてあれこれ考えた。" },
  apologize: { en: "He apologized for being late.", ja: "彼は遅れたことを謝罪した。" },
  lament: { en: "She lamented the loss of her cat.", ja: "彼女は猫を失ったことを嘆き悲しんだ。" },
  mourn: { en: "The town mourned the victims.", ja: "町は犠牲者を追悼した。" },
  regret: { en: "I regret my careless words.", ja: "私は不注意な言葉を後悔している。" },
  arouse: { en: "The story aroused my curiosity.", ja: "その話は私の好奇心をかき立てた。" },
  awaken: { en: "The noise awakened the baby.", ja: "その音が赤ちゃんを目覚めさせた。" },
  dazzle: { en: "The bright light dazzled my eyes.", ja: "明るい光で目がくらんだ。" },
  amuse: { en: "The cartoon amused the children.", ja: "その漫画は子どもたちを楽しませた。" },
  attract: { en: "The flower attracted many bees.", ja: "その花は多くの蜂を引きつけた。" },
  captivate: { en: "Her voice captivated the audience.", ja: "彼女の声は観客の心を奪った。" },
  enchant: { en: "The music enchanted everyone.", ja: "その音楽は全員を魅了した。" },
  entertain: { en: "The host entertained the guests.", ja: "主人は客をもてなした。" },
  fascinate: { en: "Space fascinates many children.", ja: "宇宙は多くの子どもを魅了する。" },
  impress: { en: "His speech impressed the judges.", ja: "彼のスピーチは審査員に感銘を与えた。" },
  overwhelm: { en: "I was overwhelmed by homework.", ja: "私は宿題に圧倒された。" },
  preoccupy: { en: "Work preoccupied her mind all day.", ja: "仕事が一日中彼女の心を占めていた。" },
  urge: { en: "The coach urged us to run faster.", ja: "コーチは私たちにもっと速く走るよう促した。" },
  satisfy: { en: "The answer satisfied the customer.", ja: "その答えは顧客を満足させた。" },
  indulge: { en: "He indulged in sweets after dinner.", ja: "彼は夕食後に甘い物にふけった。" }
};

let saved = loadSavedState();
let settings = { ...DEFAULT_SETTINGS, ...saved.settings };
let records = saved.records || {};
let starred = new Set(saved.starred || []);
let deck = [];
let deckIndex = 0;
let currentDirection = "en-ja";
let answered = false;

init();

function init() {
  populateGroups();
  applySettingsToControls();
  bindEvents();
  rebuildDeck();
  renderWordList();
  renderStats();
}

function bindEvents() {
  els.directionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      settings.direction = button.dataset.direction;
      saveState();
      applySettingsToControls();
      rebuildDeck();
    });
  });

  els.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      settings.mode = button.dataset.mode;
      saveState();
      applySettingsToControls();
      rebuildDeck();
    });
  });

  els.scopeSelect.addEventListener("change", () => {
    settings.scope = els.scopeSelect.value;
    saveState();
    rebuildDeck();
    renderWordList();
  });

  els.groupSelect.addEventListener("change", () => {
    settings.group = els.groupSelect.value;
    saveState();
    rebuildDeck();
    renderWordList();
  });

  els.restartBtn.addEventListener("click", rebuildDeck);

  els.resetStatsBtn.addEventListener("click", () => {
    records = {};
    starred = new Set();
    saveState();
    rebuildDeck();
    renderWordList();
    renderStats();
  });

  els.answerInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCheckOrNext();
    }
  });

  els.checkBtn.addEventListener("click", handleCheckOrNext);
  els.revealBtn.addEventListener("click", () => revealAnswer(true));
  els.plateRevealBtn.addEventListener("click", revealPlateBank);

  els.starBtn.addEventListener("click", () => {
    const card = currentCard();
    if (!card) return;
    if (starred.has(card.id)) {
      starred.delete(card.id);
    } else {
      starred.add(card.id);
    }
    saveState();
    renderStar();
    renderWordList();
  });

  els.searchInput.addEventListener("input", renderWordList);
}

function populateGroups() {
  const groups = [...new Set(VOCAB.map((card) => card.group))];
  for (const group of groups) {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = group;
    els.groupSelect.append(option);
  }
}

function applySettingsToControls() {
  els.directionButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.direction === settings.direction);
  });
  els.modeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === settings.mode);
  });
  els.scopeSelect.value = settings.scope;
  els.groupSelect.value = settings.group;
}

function rebuildDeck() {
  deck = shuffle(VOCAB.filter(inCurrentScope));
  deckIndex = 0;
  if (!deck.length) {
    deck = shuffle([...VOCAB]);
  }
  renderQuestion();
  renderStats();
}

function inCurrentScope(card) {
  if (settings.group !== "all" && card.group !== settings.group) return false;
  const record = records[card.id] || emptyRecord();
  if (settings.scope === "weak") return record.wrong > 0 && record.streak < 2;
  if (settings.scope === "not-mastered") return record.streak < 3;
  if (settings.scope === "starred") return starred.has(card.id);
  return true;
}

function currentCard() {
  return deck[deckIndex] || null;
}

function renderQuestion() {
  answered = false;
  const card = currentCard();
  if (!card) return;

  currentDirection = settings.direction === "mix"
    ? (Math.random() > 0.5 ? "en-ja" : "ja-en")
    : settings.direction;
  if (settings.mode === "plates") {
    currentDirection = "ja-en";
  }

  const prompt = currentDirection === "en-ja" ? card.word : card.meanings.join(" / ");
  els.groupTag.textContent = `${card.group} #${card.id}`;
  els.cardCounter.textContent = `${deckIndex + 1} / ${deck.length}`;
  els.promptLabel.textContent = currentDirection === "en-ja" ? "英語" : "日本語";
  els.promptText.textContent = prompt;
  els.answerInput.value = "";
  els.answerInput.placeholder = currentDirection === "en-ja" ? "日本語" : "English";
  els.feedback.hidden = true;
  els.feedback.className = "feedback";
  els.checkBtn.textContent = "判定";
  els.revealBtn.disabled = false;

  renderStar();
  renderAnswerMode();

  if (settings.mode === "type" || settings.mode === "initial") {
    window.setTimeout(() => els.answerInput.focus(), 0);
  }
}

function renderAnswerMode() {
  const isTypingMode = settings.mode === "type" || settings.mode === "initial";
  els.typingArea.hidden = !isTypingMode;
  els.initialHint.hidden = settings.mode !== "initial";
  els.choiceArea.hidden = settings.mode !== "choice";
  els.plateArea.hidden = settings.mode !== "plates";
  els.choiceArea.innerHTML = "";
  els.plateSlots.innerHTML = "";
  els.plateBank.innerHTML = "";
  els.plateRevealBtn.hidden = true;
  els.plateBank.hidden = true;

  if (settings.mode === "initial") {
    els.initialText.textContent = firstVisibleCharacter(expectedAnswer());
  }

  if (settings.mode === "plates") {
    renderPlateMode();
    return;
  }

  if (settings.mode !== "choice") return;

  const card = currentCard();
  const options = buildOptions(card);
  for (const option of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option.label;
    button.dataset.answer = option.value;
    button.addEventListener("click", () => checkChoice(button));
    els.choiceArea.append(button);
  }
}

function buildOptions(card) {
  const correct = {
    value: currentDirection === "en-ja" ? card.meanings[0] : card.word,
    label: currentDirection === "en-ja" ? card.meanings.join(" / ") : card.word
  };
  const pool = VOCAB
    .filter((item) => item.id !== card.id)
    .map((item) => ({
      value: currentDirection === "en-ja" ? item.meanings[0] : item.word,
      label: currentDirection === "en-ja" ? item.meanings.join(" / ") : item.word
    }));
  return shuffle([correct, ...shuffle(pool).slice(0, 3)]);
}

function expectedAnswer() {
  const card = currentCard();
  if (!card) return "";
  return currentDirection === "ja-en" ? card.word : card.meanings[0];
}

function firstVisibleCharacter(value) {
  const text = String(value).trim();
  return text ? text[0] : "";
}

function renderPlateMode() {
  const answer = plateTargetWord();
  const letters = [...answer];
  letters.forEach((_, index) => {
    const slot = document.createElement("div");
    slot.className = "plate-slot";
    slot.dataset.slotIndex = String(index);
    els.plateSlots.append(slot);
  });

  shuffle(letters.map((char, index) => ({ char, index }))).forEach((letter) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "plate-tile";
    tile.textContent = letter.char;
    tile.dataset.char = letter.char;
    tile.dataset.tileId = `${currentCard().id}-${letter.index}-${letter.char}`;
    tile.addEventListener("click", handlePlateClick);
    els.plateBank.append(tile);
  });

  updatePlateSlots();
  hidePlateBank();
}

function hidePlateBank() {
  els.plateRevealBtn.hidden = false;
  els.plateRevealBtn.setAttribute("aria-expanded", "false");
  els.plateBank.hidden = true;
}

function revealPlateBank() {
  if (settings.mode !== "plates") return;
  els.plateRevealBtn.hidden = true;
  els.plateRevealBtn.setAttribute("aria-expanded", "true");
  els.plateBank.hidden = false;
}

function plateTargetWord() {
  const card = currentCard();
  if (!card) return "";
  return normalizeEnglish(card.word).replace(/[^a-z0-9]/g, "");
}

function plateAnswer() {
  return [...els.plateSlots.querySelectorAll(".plate-slot")]
    .map((slot) => slot.querySelector(".plate-tile")?.dataset.char || "")
    .join("");
}

function handlePlateClick(event) {
  const tile = event.currentTarget;
  if (answered) return;

  if (tile.parentElement?.classList.contains("plate-slot")) {
    els.plateBank.append(tile);
  } else {
    const slot = firstEmptyPlateSlot();
    if (slot) placeTileInSlot(tile, slot);
  }
  updatePlateSlots();
}

function placeTileInSlot(tile, slot) {
  const currentTile = slot.querySelector(".plate-tile");
  if (currentTile && currentTile !== tile) {
    els.plateBank.append(currentTile);
  }
  slot.append(tile);
}

function firstEmptyPlateSlot() {
  return [...els.plateSlots.querySelectorAll(".plate-slot")]
    .find((slot) => !slot.querySelector(".plate-tile"));
}

function updatePlateSlots() {
  [...els.plateSlots.querySelectorAll(".plate-slot")].forEach((slot) => {
    slot.classList.toggle("is-filled", !!slot.querySelector(".plate-tile"));
  });
}

function checkChoice(button) {
  if (answered) return;
  const correct = isCorrect(button.dataset.answer);
  button.classList.add(correct ? "is-correct" : "is-wrong");
  if (!correct) {
    const correctValue = currentDirection === "en-ja" ? currentCard().meanings[0] : currentCard().word;
    [...els.choiceArea.children].forEach((choice) => {
      if (choice.dataset.answer === correctValue) {
        choice.classList.add("is-correct");
      }
    });
  }
  finishAnswer(correct);
}

function handleCheckOrNext() {
  if (answered) {
    nextQuestion();
    return;
  }
  const answer = settings.mode === "plates" ? plateAnswer() : els.answerInput.value;
  const correct = isCorrect(answer);
  finishAnswer(correct);
}

function isCorrect(answer) {
  const card = currentCard();
  if (!card) return false;

  if (currentDirection === "ja-en") {
    return normalizeEnglish(answer) === normalizeEnglish(card.word);
  }

  const input = normalizeJapanese(answer);
  if (!input) return false;
  const candidates = [...card.meanings, ...(card.accepts || [])].flatMap(splitJapaneseCandidate);
  return candidates.some((candidate) => {
    const normalized = normalizeJapanese(candidate);
    if (!normalized) return false;
    if (input === normalized) return true;
    return input.length >= 2 && normalized.length >= 2 && (input.includes(normalized) || normalized.includes(input));
  });
}

function finishAnswer(correct) {
  const card = currentCard();
  if (!card || answered) return;
  updateRecord(card.id, correct);
  revealAnswer(false, correct);
  renderStats();
  renderWordList();
}

function revealAnswer(countAsWrong = false, forceCorrect = null) {
  const card = currentCard();
  if (!card) return;

  if (!answered && countAsWrong) {
    updateRecord(card.id, false);
    renderStats();
    renderWordList();
  }

  const correct = forceCorrect !== null ? forceCorrect : !countAsWrong;
  answered = true;
  els.checkBtn.textContent = "次へ";
  els.revealBtn.disabled = true;
  els.feedback.hidden = false;
  els.feedback.className = `feedback ${correct ? "is-correct" : "is-wrong"}`;
  els.feedbackTitle.textContent = correct ? "正解" : "確認";
  els.answerLine.textContent = `${card.word} = ${card.meanings.join(" / ")}`;
  els.exampleLine.innerHTML = renderExampleLine(card);
  els.noteLine.textContent = card.note || "";
}

function renderExampleLine(card) {
  const example = EXAMPLES[card.word];
  if (!example) {
    return "";
  }
  return `<strong>例文:</strong> ${escapeHtml(example.en)}<br>${escapeHtml(example.ja)}`;
}

function nextQuestion() {
  deckIndex += 1;
  if (deckIndex >= deck.length) {
    deck = shuffle(deck);
    deckIndex = 0;
  }
  renderQuestion();
}

function updateRecord(id, correct) {
  const record = records[id] || emptyRecord();
  if (correct) {
    record.correct += 1;
    record.streak += 1;
  } else {
    record.wrong += 1;
    record.streak = 0;
  }
  record.last = new Date().toISOString();
  records[id] = record;
  saveState();
}

function renderStats() {
  const totals = Object.values(records).reduce((acc, record) => {
    acc.correct += record.correct;
    acc.wrong += record.wrong;
    return acc;
  }, { correct: 0, wrong: 0 });
  const answeredCount = totals.correct + totals.wrong;
  const mastered = VOCAB.filter((card) => (records[card.id] || emptyRecord()).streak >= 3).length;
  els.totalCount.textContent = VOCAB.length;
  els.accuracy.textContent = answeredCount ? `${Math.round((totals.correct / answeredCount) * 100)}%` : "0%";
  els.masteredCount.textContent = mastered;
}

function renderStar() {
  const card = currentCard();
  const active = card && starred.has(card.id);
  els.starBtn.classList.toggle("is-starred", active);
  els.starBtn.textContent = active ? "★" : "☆";
}

function renderWordList() {
  const query = normalizeSearch(els.searchInput.value);
  const cards = VOCAB.filter((card) => inCurrentScope(card)).filter((card) => {
    if (!query) return true;
    return normalizeSearch(`${card.word} ${card.meanings.join(" ")} ${card.group}`).includes(query);
  });

  els.wordList.innerHTML = "";
  for (const card of cards) {
    const record = records[card.id] || emptyRecord();
    const row = document.createElement("button");
    row.type = "button";
    row.className = "word-row";
    row.innerHTML = `
      <strong>${escapeHtml(card.word)}</strong>
      <span class="mini-stat">${record.correct}/${record.wrong}</span>
      <small>${escapeHtml(card.meanings.join(" / "))}</small>
    `;
    row.addEventListener("click", () => jumpToCard(card.id));
    els.wordList.append(row);
  }
}

function jumpToCard(id) {
  const found = deck.findIndex((card) => card.id === id);
  if (found === -1) {
    deck = [VOCAB.find((card) => card.id === id)].filter(Boolean);
    deckIndex = 0;
  } else {
    deckIndex = found;
  }
  renderQuestion();
}

function splitJapaneseCandidate(value) {
  return String(value)
    .split(/[、,／/・]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function normalizeEnglish(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeJapanese(value) {
  return String(value)
    .trim()
    .replace(/[〜～]/g, "")
    .replace(/[「」『』（）()［］[\]\s、，。．・/／]/g, "")
    .replace(/すること$/g, "する")
    .replace(/させること$/g, "させる");
}

function normalizeSearch(value) {
  return String(value).toLowerCase().replace(/\s+/g, "");
}

function emptyRecord() {
  return { correct: 0, wrong: 0, streak: 0, last: null };
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    settings,
    records,
    starred: [...starred]
  }));
}

function loadSavedState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
