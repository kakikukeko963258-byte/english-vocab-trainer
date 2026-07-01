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
  answerInput: document.querySelector("#answerInput"),
  choiceArea: document.querySelector("#choiceArea"),
  checkBtn: document.querySelector("#checkBtn"),
  revealBtn: document.querySelector("#revealBtn"),
  starBtn: document.querySelector("#starBtn"),
  feedback: document.querySelector("#feedback"),
  feedbackTitle: document.querySelector("#feedbackTitle"),
  answerLine: document.querySelector("#answerLine"),
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

  if (settings.mode === "type") {
    window.setTimeout(() => els.answerInput.focus(), 0);
  }
}

function renderAnswerMode() {
  els.typingArea.hidden = settings.mode !== "type";
  els.choiceArea.hidden = settings.mode !== "choice";
  els.choiceArea.innerHTML = "";

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
  const answer = els.answerInput.value;
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
  els.noteLine.textContent = card.note || "";
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
