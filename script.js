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
        "right_answer":3,
    }
    


];
let currentQuestion=0;

function init(){
    questionsArrayLen();
    showQuestion();
}
function questionsArrayLen(){
    document.getElementById("all-questions").innerHTML=questions.length;
}
function showQuestion(){
    let question = questions[currentQuestion];
    
    document.getElementById('question-text').innerHTML = question["question"];
    document.getElementById('answer_1').innerHTML = question["answer_1"];
    document.getElementById('answer_2').innerHTML = question["answer_2"];
    document.getElementById('answer_3').innerHTML = question["answer_3"];
    document.getElementById('answer_4').innerHTML = question["answer_4"];

}
function answer(selection){
    let question = questions[currentQuestion];
    console.log("Selected answer is " , selection);
    let selectedQuestionNumber = selection.slice(-1);
    console.log("selectedQuestionNumber is" , selectedQuestionNumber);
    console.log("Current Question is " , question["right_answer"]);

    if (selectedQuestionNumber == question ["right_answer"]) {
        console.log("Richtige Antwort!");
    } else {
        console.log("Falsche Antwort!");
    }
}
