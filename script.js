let isOnSciencePage = false;
let questions = [
  {
    question: `Welches Element ist chemisch als "Au" bekannt?`,
    answer_1: "Silber",
    answer_2: "Gold",
    answer_3: "Eisen",
    answer_4: "Kupfer",
    right_answer: 2,
  },
  {
    question: `Welcher Planet ist der vierte in unserem Sonnensystem?`,
    answer_1: "Venus",
    answer_2: "Mars",
    answer_3: "Jupiter",
    answer_4: "Saturn",
    right_answer: 2,
  },
  {
    question: `Welche der folgenden Partikel ist kleiner als ein Atom?`,
    answer_1: "Proton",
    answer_2: "Elektron",
    answer_3: "Neutron",
    answer_4: "Quark",
    right_answer: 4,
  },
];

let rightQuestion = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio(`audio/success.mp3`);
let AUDIO_FAIL = new Audio(`audio/error.mp3`);
let AUDIO_FINISH = new Audio(`audio/finish.mp3`);

function init() {
  questionsArrayLen();
  showQuestion();
}

function questionsArrayLen() {
  document.getElementById("all-questions").innerHTML = questions.length;
}

function showQuestion() {
  
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver(){
    return currentQuestion >= questions.length;
}

function updateToNextQuestion(){
    let question = questions[currentQuestion];
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("question-text").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById(`progress-bar`).innerHTML = `${percent}% `;
    document.getElementById(`progress-bar`).style = `width: ${percent}%;`;
}

function showEndScreen(){
    document.getElementById("endScreen").style = "";
    document.getElementById("quiz-body").style = "display:none";
    document.getElementById("amountOfQuestions").innerHTML = questions.length;
    document.getElementById("amountCorrectAnswers").innerHTML = rightQuestion;
    AUDIO_FINISH.play();
}

function answer(selection) {
  if (isOnSciencePage) {
    let question = scienceQuestions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (rightAnswerSelected(selectedQuestionNumber,question)) {
    document.getElementById(selection).parentNode.classList.add("bg-success");
    rightQuestion++;
    AUDIO_SUCCESS.play();
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
    AUDIO_FAIL.play();
  }
  } else {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (rightAnswerSelected(selectedQuestionNumber,question)) {
    document.getElementById(selection).parentNode.classList.add("bg-success");
    rightQuestion++;
    AUDIO_SUCCESS.play();
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
    AUDIO_FAIL.play();
  }
  }
  
  
  document.getElementById("next-button").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber,question){
   return selectedQuestionNumber == question[`right_answer`];
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-button").disabled = true;
  resetAnswerButtons();
  if (isOnSciencePage) {
    showScienceQuestion();
  } else {
    showQuestion();
  }
}

function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
}

function restartGame() {
  rightQuestion = 0;
  currentQuestion = 0;
  document.getElementById("endScreen").style = "display:none";
  document.getElementById("quiz-body").style = "";
  init();
}

let scienceQuestions = [
  {
    question: "Welche Einheit misst die Intensität von Erdbeben?",
    answer_1: "Watt",
    answer_2: "Joule",
    answer_3: "Hertz",
    answer_4: "Richter",
    right_answer: 4,
    topic: "science",
  },
  {
    question: "Was ist die chemische Formel für Wasser?",
    answer_1: "CO2",
    answer_2: "H2O",
    answer_3: "O2",
    answer_4: "CH4",
    right_answer: 2,
    topic: "science",
  },
  {
    question: "Welches Gas macht etwa 78% der Erdatmosphäre aus?",
    answer_1: "Sauerstoff",
    answer_2: "Stickstoff",
    answer_3: "Kohlendioxid",
    answer_4: "Wasserstoff",
    right_answer: 2,
    topic: "science",
  },
  {
    question: "Was ist die kleinste Einheit eines chemischen Elements?",
    answer_1: "Molekül",
    answer_2: "Atom",
    answer_3: "Isotop",
    answer_4: "Ion",
    right_answer: 2,
    topic: "science",
  },
  {
    question: "Welcher Planet ist der dritte in unserem Sonnensystem?",
    answer_1: "Mars",
    answer_2: "Venus",
    answer_3: "Erde",
    answer_4: "Jupiter",
    right_answer: 3,
    topic: "science",
  },
  {
    question: "Was ist die Geschwindigkeit des Lichts?",
    answer_1: "300,000 km/s",
    answer_2: "150,000 km/s",
    answer_3: "500,000 km/s",
    answer_4: "1,000,000 km/s",
    right_answer: 1,
    topic: "science",
  },
];
function scienceQuestion() {
  isOnSciencePage = true;
  let question = scienceQuestions[currentQuestion];
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("question-text").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
    scienceQuestionsArrayLen();
    showScienceQuestion();
}

function scienceQuestionsArrayLen() {
  document.getElementById("all-questions").innerHTML = scienceQuestions.length;
}

function showScienceQuestion() {
  if (scienceGameIsOver()) {
    showScienceEndScreen();
  } else {
    updateScienceProgressBar();
    updateToNextScienceQuestion();
  }
}

function scienceGameIsOver(){
    return currentQuestion >= scienceQuestions.length;
    console.log("scienceQuestion")
}

function updateToNextScienceQuestion(){
    let question = scienceQuestions[currentQuestion];
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("question-text").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function updateScienceProgressBar(){
    let percent = (currentQuestion + 1) / scienceQuestions.length;
    percent = Math.round(percent * 100);
    document.getElementById(`progress-bar`).innerHTML = `${percent}% `;
    document.getElementById(`progress-bar`).style = `width: ${percent}%;`;
}

function showScienceEndScreen(){
    document.getElementById("endScreen").style = "";
    document.getElementById("quiz-body").style = "display:none";
    document.getElementById("amountOfQuestions").innerHTML = scienceQuestions.length;
    document.getElementById("amountCorrectAnswers").innerHTML = rightQuestion;
    AUDIO_FINISH.play();
}