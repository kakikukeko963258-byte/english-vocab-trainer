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
  plateBank: document.querySelector("#plateBank"),
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
let dragState = null;

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
    tile.addEventListener("pointerdown", startPlateDrag);
    tile.addEventListener("click", handlePlateClick);
    els.plateBank.append(tile);
  });

  updatePlateSlots();
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
  if (answered || tile.dataset.skipClick === "true") {
    tile.dataset.skipClick = "false";
    return;
  }

  if (tile.parentElement?.classList.contains("plate-slot")) {
    els.plateBank.append(tile);
  } else {
    const slot = [...els.plateSlots.querySelectorAll(".plate-slot")]
      .find((item) => !item.querySelector(".plate-tile"));
    if (slot) slot.append(tile);
  }
  updatePlateSlots();
}

function startPlateDrag(event) {
  if (answered || event.button > 0) return;
  event.preventDefault();

  const tile = event.currentTarget;
  const rect = tile.getBoundingClientRect();
  dragState = {
    tile,
    originParent: tile.parentElement,
    originNext: tile.nextSibling,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    pointerId: event.pointerId,
    moved: false
  };

  tile.classList.add("is-dragging");
  tile.style.width = `${rect.width}px`;
  tile.style.height = `${rect.height}px`;
  tile.style.position = "fixed";
  tile.style.left = `${rect.left}px`;
  tile.style.top = `${rect.top}px`;
  tile.style.zIndex = "1000";
  tile.style.pointerEvents = "none";
  document.body.append(tile);

  if (tile.setPointerCapture) {
    try {
      tile.setPointerCapture(event.pointerId);
    } catch {
      // Some mobile browsers release capture when the element is reparented.
    }
  }

  window.addEventListener("pointermove", movePlateDrag);
  window.addEventListener("pointerup", endPlateDrag);
  window.addEventListener("pointercancel", cancelPlateDrag);
}

function movePlateDrag(event) {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  dragState.moved = true;
  const { tile, offsetX, offsetY } = dragState;
  tile.style.left = `${event.clientX - offsetX}px`;
  tile.style.top = `${event.clientY - offsetY}px`;
  highlightPlateSlot(event.clientX, event.clientY);
}

function endPlateDrag(event) {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  const state = dragState;
  clearPlateDragListeners();
  clearPlateDragStyles(state.tile);

  const slot = findDropSlot(event.clientX, event.clientY);
  const bank = isPointInsideElement(event.clientX, event.clientY, els.plateBank);

  if (slot) {
    placeTileInSlot(state.tile, slot, state.originParent);
  } else if (bank) {
    els.plateBank.append(state.tile);
  } else {
    returnPlateTile(state.tile, state.originParent, state.originNext);
  }

  if (state.moved) {
    state.tile.dataset.skipClick = "true";
    window.setTimeout(() => {
      state.tile.dataset.skipClick = "false";
    }, 0);
  }

  dragState = null;
  updatePlateSlots();
}

function cancelPlateDrag() {
  if (!dragState) return;
  const state = dragState;
  clearPlateDragListeners();
  clearPlateDragStyles(state.tile);
  returnPlateTile(state.tile, state.originParent, state.originNext);
  dragState = null;
  updatePlateSlots();
}

function clearPlateDragListeners() {
  window.removeEventListener("pointermove", movePlateDrag);
  window.removeEventListener("pointerup", endPlateDrag);
  window.removeEventListener("pointercancel", cancelPlateDrag);
  [...els.plateSlots.querySelectorAll(".plate-slot")].forEach((slot) => {
    slot.classList.remove("is-target");
  });
}

function clearPlateDragStyles(tile) {
  tile.classList.remove("is-dragging");
  tile.style.width = "";
  tile.style.height = "";
  tile.style.position = "";
  tile.style.left = "";
  tile.style.top = "";
  tile.style.zIndex = "";
  tile.style.pointerEvents = "";
}

function returnPlateTile(tile, parent, next) {
  if (!parent) {
    els.plateBank.append(tile);
    return;
  }
  if (next && next.parentElement === parent) {
    parent.insertBefore(tile, next);
  } else {
    parent.append(tile);
  }
}

function placeTileInSlot(tile, slot, originParent) {
  const currentTile = slot.querySelector(".plate-tile");
  if (currentTile && currentTile !== tile) {
    if (originParent?.classList.contains("plate-slot") && originParent !== slot) {
      originParent.append(currentTile);
    } else {
      els.plateBank.append(currentTile);
    }
  }
  slot.append(tile);
}

function findDropSlot(x, y) {
  const directSlot = document.elementsFromPoint(x, y)
    .find((element) => element.classList?.contains("plate-slot"));
  if (directSlot) return directSlot;

  let nearest = null;
  let nearestDistance = Infinity;
  [...els.plateSlots.querySelectorAll(".plate-slot")].forEach((slot) => {
    const rect = slot.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(centerX - x, centerY - y);
    if (distance < nearestDistance) {
      nearest = slot;
      nearestDistance = distance;
    }
  });
  return nearestDistance <= 56 ? nearest : null;
}

function highlightPlateSlot(x, y) {
  const target = findDropSlot(x, y);
  [...els.plateSlots.querySelectorAll(".plate-slot")].forEach((slot) => {
    slot.classList.toggle("is-target", slot === target);
  });
}

function isPointInsideElement(x, y, element) {
  const rect = element.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
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
