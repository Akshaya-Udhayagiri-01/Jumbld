const startBtn = document.getElementById("start");
const homeScreen = document.getElementById("home");
const instructionsScreen = document.getElementById("instructions");
const beginBtn = document.getElementById("begin");
const wordCountSelect = document.getElementById("wordCount");
const timeLimitSelect = document.getElementById("timeLimit");
const gameScreen = document.getElementById("game");
const scrambledWordEl = document.getElementById("scrambledWord");
const timerEl = document.getElementById("timer");
const userInput = document.getElementById("userInput");
const nextWordBtn = document.getElementById("nextWord");
const scorecardScreen = document.getElementById("scorecard");
const scoreEl = document.getElementById("score");
const totalWordsEl = document.getElementById("totalWords");
const playAgainBtn = document.getElementById("playAgain");

let gameWords = [];
let currentWordIndex = 0;
let timeLimit = 30;
let timer;
let score = 0;

startBtn.addEventListener("click", () => {
  homeScreen.style.display = "none";
  instructionsScreen.style.display = "block";
});

beginBtn.addEventListener("click", () => {
  const numWords = parseInt(wordCountSelect.value);
  timeLimit = parseInt(timeLimitSelect.value);

  gameWords = getRandomWords(numWords);
  currentWordIndex = 0;
  score = 0;

  instructionsScreen.style.display = "none";
  scorecardScreen.style.display = "none";
  gameScreen.style.display = "block";

  nextWord();
});

nextWordBtn.addEventListener("click", () => {
  handleNextWord();
});

playAgainBtn.addEventListener("click", () => {
  scorecardScreen.style.display = "none";
  instructionsScreen.style.display = "block";
  userInput.value = "";
});

function getRandomWords(count) {
  const shuffled = allWords.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function scramble(word) {
  let arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.join("") === word) {
    return scramble(word);
  }
  return arr.join("");
}

function startTimer() {
  let timeLeft = timeLimit;
  timerEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alertCorrectWordAndMove();
    }
  }, 1000);
}

function alertCorrectWordAndMove() {
  const originalWord = gameWords[currentWordIndex - 1];
  const userGuess = userInput.value.trim().toLowerCase();
  if (userGuess !== originalWord.toLowerCase()) {
    alert(`Time's up or wrong! The correct word was: ${originalWord}`);
  } else {
    score++;
  }
  nextWord();
}

function handleNextWord() {
  clearInterval(timer);

  const originalWord = gameWords[currentWordIndex - 1];
  const userGuess = userInput.value.trim().toLowerCase();

  if (userGuess !== originalWord.toLowerCase()) {
    alert(`Wrong! The correct word was: ${originalWord}`);
  } else {
    score++;
  }

  nextWord();
}

function nextWord() {
  if (currentWordIndex >= gameWords.length) {
    endGame();
    return;
  }

  userInput.value = "";
  userInput.focus();

  const word = gameWords[currentWordIndex];
  scrambledWordEl.textContent = scramble(word);
  startTimer();
  currentWordIndex++;
}

function endGame() {
  clearInterval(timer);
  gameScreen.style.display = "none";
  scorecardScreen.style.display = "block";
  scoreEl.textContent = score;
  totalWordsEl.textContent = gameWords.length;
}
