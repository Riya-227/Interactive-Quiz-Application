const questions = [
  {
    q: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "HighText Machine Language"],
    answer: 0,
  },
  {
    q: "Which tag is used to link a CSS file in HTML?",
    options: ["<script>", "<link>", "<style>", "<css>"],
    answer: 1,
  },
  {
    q: "What property is used to change text color in CSS?",
    options: ["font-color", "text-color", "color", "font-style"],
    answer: 2,
  },
  {
    q: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<js>", "<code>"],
    answer: 0,
  },
  {
    q: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: 2,
  },
  {
    q: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "/* */", "#"],
    answer: 1,
  },
  {
    q: "Which event occurs when the user clicks on an HTML element?",
    options: ["onmouseclick", "onchange", "onclick", "onmouseover"],
    answer: 2,
  },
  {
    q: "What does CSS stand for?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style System", "Computer Style Sheets"],
    answer: 1,
  },
  {
    q: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<hyperlink>"],
    answer: 1,
  },
  {
    q: "Which method is used to write into an alert box in JS?",
    options: ["alertBox()", "msg()", "alert()", "show()"],
    answer: 2,
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let userAnswers = new Array(questions.length).fill(null);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const questionCountEl = document.getElementById("question-count");
const progressBar = document.getElementById("progress-bar");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function loadQuestion(index) {
  const q = questions[index];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => selectOption(i);
    if (userAnswers[index] === i) {
      li.style.background = "#ff00cc";
    }
    optionsEl.appendChild(li);
  });

  questionCountEl.textContent = `Question ${index + 1} of ${questions.length}`;
  progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
  resetTimer();
}

function selectOption(i) {
  userAnswers[currentQuestion] = i;
  const correct = questions[currentQuestion].answer;
  if (i === correct && score <= currentQuestion) {
    score++;
  }
  loadQuestion(currentQuestion); // Refresh selection UI
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
}

function showResult() {
  clearInterval(timer);
  document.getElementById("quiz-box").style.display = "none";
  const resultBox = document.getElementById("result-box");
  resultBox.classList.remove("hidden");
  document.getElementById("score").textContent = `Your Score: ${score} / ${questions.length}`;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      nextQuestion();
    }
  }, 1000);
}

// Comment section
function addComment() {
  const input = document.getElementById("comment-input");
  const commentList = document.getElementById("comment-list");
  if (input.value.trim() !== "") {
    const p = document.createElement("p");
    p.textContent = input.value;
    commentList.appendChild(p);
    input.value = "";
  }
}

// Start screen logic
const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const startBtn = document.getElementById("start-btn");

quizBox.style.display = "none";

startBtn.onclick = () => {
  startScreen.style.display = "none";
  quizBox.style.display = "block";
  loadQuestion(currentQuestion);
};

// Button events
prevBtn.onclick = prevQuestion;
nextBtn.onclick = nextQuestion;