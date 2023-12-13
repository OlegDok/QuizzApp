let questions =[
    {
        "question":`Welches Element ist chemisch als "Au" bekannt?`,
        "answer_1":"Silber",
        "answer_2":"Gold",
        "answer_3":"Eisen",
        "answer_4":"Kupfer",
        "right_answer":2,
    },
    {
        "question":`Welcher Planet ist der vierte in unserem Sonnensystem?`,
        "answer_1":"Venus",
        "answer_2":"Mars",
        "answer_3":"Jupiter",
        "answer_4":"Saturn",
        "right_answer":2,
    },
    {
        "question":`Welche der folgenden Partikel ist kleiner als ein Atom?`,
        "answer_1":"Proton",
        "answer_2":"Elektron",
        "answer_3":"Neutron",
        "answer_4":"Quark",
        "right_answer":4,
    }
    


];
let rightQuesions=0;
let currentQuestion=0;
let AUDIO_SUCCESS = new Audio(`audio/success.mp3`);
let AUDIO_FAIL = new Audio(`audio/error.mp3`);
let AUDIO_FINISH = new Audio(`audio/finish.mp3`);

function init(){
    questionsArrayLen();
    showQuestion();

}
function questionsArrayLen(){
    document.getElementById("all-questions").innerHTML=questions.length;
}

function showQuestion(){
    if (currentQuestion >= questions.length) {
        document.getElementById("endScreen").style="";
        document.getElementById("quiz-body").style="display:none";

        document.getElementById("amountOfQuestions").innerHTML = questions.length;
        document.getElementById("amountCorrectAnswers").innerHTML =  rightQuesions;
        AUDIO_FINISH.play();
    } else{
    let question = questions[currentQuestion];
    document.getElementById("question-number").innerHTML=currentQuestion + 1;
    document.getElementById('question-text').innerHTML = question["question"];
    document.getElementById('answer_1').innerHTML = question["answer_1"];
    document.getElementById('answer_2').innerHTML = question["answer_2"];
    document.getElementById('answer_3').innerHTML = question["answer_3"];
    document.getElementById('answer_4').innerHTML = question["answer_4"];
    }
}
function answer(selection){
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question["right_answer"]}`;

    if (selectedQuestionNumber == question ["right_answer"]) {
        document.getElementById(selection).parentNode.classList.add("bg-success");
        rightQuesions ++;
        AUDIO_SUCCESS.play();
    } else {
        document.getElementById(selection).parentNode.classList.add("bg-danger");
        document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
        AUDIO_FAIL.play();
    }
    document.getElementById("next-button").disabled = false;
}

function nextQuestion(){
    currentQuestion++;
    document.getElementById("next-button").disabled = true;
    resetAnswerButtons();
    showQuestion();
    
}

function resetAnswerButtons(){
    document.getElementById("answer_1").parentNode.classList.remove("bg-success");
    document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_2").parentNode.classList.remove("bg-success");
    document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_3").parentNode.classList.remove("bg-success");
    document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_4").parentNode.classList.remove("bg-success");
    document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
}

function restartGame(){
    rightQuesions =0;
    currentQuestion =0;
    document.getElementById("endScreen").style="display:none";
    document.getElementById("quiz-body").style="";
    init();
}
