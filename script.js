let isOnPage = 0;
let rightQuestion = 0;
let currentQuestion = 0;
let answerExucuted = false;

let AUDIO_SUCCESS = new Audio(`audio/success.mp3`);
let AUDIO_FAIL = new Audio(`audio/error.mp3`);
let AUDIO_FINISH = new Audio(`audio/finish.mp3`);


function init() {
  document.getElementById("startSite").style = "";
  document.getElementById("quiz-body").style = "display:none";
}


function closeStartSite() {
  document.getElementById("startSite").style = "display:none";
  document.getElementById("quiz-body").style = "";
}


function showQuestion() {
  if (isGameOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}


function showEndScreen(){
  if (isOnPage == 1) {
    showHistoryEndScreen();
  } else if (isOnPage == 2) {
    showScienceEndScreen();
  } else if (isOnPage == 3) {
    showSportEndScreen();
  } else if (isOnPage == 4) {
    showGeoEndScreen();
  }
    AUDIO_FINISH.play();
}


function updateToNextQuestion(){
  if (isOnPage == 1) {
    updateToHistory();
  } else if (isOnPage == 2) {
    updateToScience();
  }  else if (isOnPage == 3) {
    updateToSport();
  } else if (isOnPage == 4) {
    updateToGeo();
  }
}


function updateProgressBar(){
  if (isOnPage == 1) {
    historyProgressBar();
  } else if (isOnPage == 2) {
    scienceProgressBar();
  } else if (isOnPage == 3) {
    sportProgressBar();
  } else if (isOnPage == 4) {
    geoProgressBar();
  }
}


function isGameOver(){
  if (isOnPage == 1) {
    return currentQuestion >= historyQuestions.length;
  } else if (isOnPage == 2) {
    return currentQuestion >= scienceQuestions.length;
  } else if (isOnPage == 3) {
    return currentQuestion >= sportQuestions.length;
  } else if (isOnPage == 4) {
    return currentQuestion >= geoQuestions.length;
  }
}

function answer(selection) {  
  if (isOnPage == 1) {
    handleAnswerForPage(historyQuestions, selection);
  } else if (isOnPage == 2) {
    handleAnswerForPage(scienceQuestions, selection);
  } else if (isOnPage == 3) {
    handleAnswerForPage(sportQuestions, selection);
  } else if (isOnPage == 4) {
    handleAnswerForPage(geoQuestions, selection);
  }
  answerExucuted = true;
  document.getElementById("next-button").disabled = false;
}


function handleAnswerForPage(questions, selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (answerExucuted === true) {
    console.log("sie haben schon eine Antwort gewählt");
  } else {

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
      document.getElementById(selection).parentNode.classList.add("bg-success");
      rightQuestion++;
      AUDIO_SUCCESS.play();
    } else {
      document.getElementById(selection).parentNode.classList.add("bg-danger");
      document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
      AUDIO_FAIL.play();
    }
  }
}


function rightAnswerSelected(selectedQuestionNumber,question){
   return selectedQuestionNumber == question[`right_answer`];
}


function nextQuestion() {
  answerExucuted = false;
  currentQuestion++;
  document.getElementById("next-button").disabled = true;
  resetAnswerButtons();
  showQuestion();
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
  isOnPage = 0;
  rightQuestion = 0;
  currentQuestion = 0;
  document.getElementById("endScreen").style = "display:none";
  document.getElementById("quiz-body").style = "";
  init();
}
// SHARE BUTTON
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("shareButton").addEventListener("click", async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Titel deines Inhalts',
          text: 'Beschreibung deines Inhalts',
          url: 'URL zu deinem Inhalt',
        });
        console.log('Inhalt erfolgreich geteilt');
      } else {
        throw new Error('Web Share API wird in diesem Browser nicht unterstützt.');
      }
    } catch (error) {
      console.error('Fehler beim Teilen:', error.message);
    }
  });
});


// HISTORY AREA


function historyQuestion() {
  closeStartSite();
  currentQuestion = 0;
  isOnPage = 1
  historyQuestionsArrayLen();
  showQuestion();
}


function historyQuestionsArrayLen() {
  document.getElementById("all-questions").innerHTML = historyQuestions.length; 
}


function historyProgressBar() {
  let percent = (currentQuestion + 1) / historyQuestions.length;
    percent = Math.round(percent * 100);
    document.getElementById(`progress-bar`).innerHTML = `${percent}% `;
    document.getElementById(`progress-bar`).style = `width: ${percent}%;`;
}

function updateToHistory () {
  let question = historyQuestions[currentQuestion];
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("question-text").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}


function showHistoryEndScreen(){
      document.getElementById("endScreen").style = "";
      document.getElementById("quiz-body").style = "display:none";
      document.getElementById("amountOfQuestions").innerHTML = historyQuestions.length;
      document.getElementById("amountCorrectAnswers").innerHTML = rightQuestion;
}



// SCIENCE AREA


function scienceQuestion() {
  closeStartSite();
  currentQuestion = 0;
  isOnPage = 2;
  updateToNextQuestion();
  scienceQuestionsArrayLen();
  showQuestion();
}

function scienceQuestionsArrayLen() {
  document.getElementById("all-questions").innerHTML = scienceQuestions.length;
}


function scienceProgressBar(){
  let percent = (currentQuestion + 1) / scienceQuestions.length;
    percent = Math.round(percent * 100);
    document.getElementById(`progress-bar`).innerHTML = `${percent}% `;
    document.getElementById(`progress-bar`).style = `width: ${percent}%;`;
}


function updateToScience(){
    let question = scienceQuestions[currentQuestion];
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("question-text").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}


function showScienceEndScreen(){
  document.getElementById("endScreen").style = "";
    document.getElementById("quiz-body").style = "display:none";
    document.getElementById("amountOfQuestions").innerHTML = scienceQuestions.length;
    document.getElementById("amountCorrectAnswers").innerHTML = rightQuestion;
}


//  SPORT AREA


function sportQuestion() {
  closeStartSite();
  currentQuestion = 0;
  isOnPage = 3;
  updateToNextQuestion();
  sportQuestionsArrayLen();
  showQuestion();
}


function sportQuestionsArrayLen() {
  document.getElementById("all-questions").innerHTML = sportQuestions.length;
}


function updateToSport(){
    let question = sportQuestions[currentQuestion];
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("question-text").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}


function sportProgressBar(){
  let percent = (currentQuestion + 1) / sportQuestions.length;
    percent = Math.round(percent * 100);
    document.getElementById(`progress-bar`).innerHTML = `${percent}% `;
    document.getElementById(`progress-bar`).style = `width: ${percent}%;`;
}


function showSportEndScreen(){
  document.getElementById("endScreen").style = "";
    document.getElementById("quiz-body").style = "display:none";
    document.getElementById("amountOfQuestions").innerHTML = sportQuestions.length;
    document.getElementById("amountCorrectAnswers").innerHTML = rightQuestion;
}


// GEO AREA


function geoQuestion() {
  closeStartSite();
  currentQuestion = 0;
  isOnPage = 4;
  updateToNextQuestion();
  geoQuestionsArrayLen();
  showQuestion();
}


function geoQuestionsArrayLen() {
  document.getElementById("all-questions").innerHTML = geoQuestions.length;
}


function updateToGeo(){
    let question = geoQuestions[currentQuestion];
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("question-text").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}


function geoProgressBar(){
  let percent = (currentQuestion + 1) / geoQuestions.length;
    percent = Math.round(percent * 100);
    document.getElementById(`progress-bar`).innerHTML = `${percent}% `;
    document.getElementById(`progress-bar`).style = `width: ${percent}%;`;
}


function showGeoEndScreen(){
  document.getElementById("endScreen").style = "";
    document.getElementById("quiz-body").style = "display:none";
    document.getElementById("amountOfQuestions").innerHTML = geoQuestions.length;
    document.getElementById("amountCorrectAnswers").innerHTML = rightQuestion;
}
