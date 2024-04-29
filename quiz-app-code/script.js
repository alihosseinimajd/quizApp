const questions = [
    {
        question: " Past",
        answers: [
            { text: "Medieval", correct: true},
            { text: "Recentlly", correct: false},
            { text: "Nowadays", correct: false},
            { text: "Unforeseen", correct: false},

        ]
    },
    {
        question: "Objective",
        answers: [
            { text: "Magical", correct: false},
            { text: "Aim", correct: true},
            { text: "Overflow", correct: false},
            { text: "Have an effect", correct: false},

        ]
    },
    {
        question: "Ignore",
        answers: [
            { text: "Consider", correct: false},
            { text: "Fail to take into account", correct: true},
            { text: "Notice", correct: false},
            { text: "Recognize", correct: false},

        ]
    },
    {
        question: "Unforeseen",
        answers: [
            { text: "Unexpected", correct: true},
            { text: "Fail to take into account", correct: false},
            { text: "Regarded", correct: false},
            { text: "Movement", correct: false},

        ]
    },
    {
        question: "Be reversed",
        answers: [
            
            { text: "Be published", correct: false},
            { text: "Be Regarded", correct: false},
            { text: "Be closed", correct: false},
            { text: "Be removed", correct: true},

        ]
    },
    {
        question: "Have an impact",
        answers: [
            
            { text: "Have no effect", correct: false},
            { text: "Repeated", correct: false},
            { text: "Ample", correct: false},
            { text: "Affect", correct: true},

        ]
    },
    {
        question: "Movement",
        answers: [
            
            { text: "Stillness", correct: false},
            { text: "Stagnation", correct: false},
            { text: "Flow", correct: true},
            { text: "Immobility", correct: false},

        ]
    },
    {
        question: "Difficulties",
        answers: [
            
            { text: "Simplicity", correct: false},
            { text: "Barriers", correct: true},
            { text: "Comfort", correct: false},
            { text: "Objective", correct: false},

        ]
    },
    {
        question: "Separate",
        answers: [
            
            { text: "Unite", correct: false},
            { text: "Divide", correct: true},
            { text: "Combine", correct: false},
            { text: "Merge", correct: false},

        ]
    }   
]; 

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const pieChart = document.getElementById("pie-chart");
const answerPics = document.getElementById("answer-pics");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0 ;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    document.body.style.backgroundColor = "#001e4d"
    resetState();
  let currentQuestion = questions[currentQuestionIndex]
  let questionNo = currentQuestionIndex + 1;
//Display the questions___________________________________
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
//Display the Answers_____________________________________
  currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
//For removing Previous Answers buttons
function resetState(){
    answerPics.style.display = "none";
    nextButton.style.display = "none";
    pieChart.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        document.body.style.backgroundColor = "#3F704D"
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}.Well Done &#128525`
    nextButton.innerHTML = "Finish"
    nextButton.style.display = "block";
    answerPics.style.display = "block";
    pieChart.style.display = "block";


//_____________chart_____________________________
    var xValues = ["False", "True"];
let mistakes = questions.length - score;
console.log(mistakes);
var yValues = [mistakes ,score ];
var barColors = [
  "#b91d47",
  "#00aba9"
];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "YOUR SCORE"
    }
  }
});

//___________Showing passages______________

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
//____________CHART__________________
