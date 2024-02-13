 // creating and questions and answers array
 const quizArray =[
    {
        question:"HTML stand for",
        a: "Hyper text makeup language",
        b:"Hyper text markup language",
        c:"Home text markup language",
        d:"Hyper text making language",
        correct:"b",

    },
    {
        question:"Select inline element",
        a:"<img>",
        b:"<p>",
        c:"<div>",
        d:"<h1>",
        correct:"a",
    },
    {
        question:"Which selctor have a highest priority",
        a:"Tag selector",
        b:"id",
        c:"class",
        d:"pseudo-elements",
        correct:"b",
    },
    {
        question:"Select block level element",
        a:"<button>",
        b:"<span>",
        c:"<a>",
        d:"<p>",
        correct:"d",
    }
    

];
//get all the html elements
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const answerE = document.querySelectorAll('.answer');
const labelE = document.querySelectorAll('.op_label');
const question = document.getElementById('question');
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const submit= document.getElementById("submit");
const score = document.getElementById("score");
const showans = document.getElementById("showans")
// store the question number and also used to increment the question number
let currentQusNum=0;
//to store the correct answers
let answerNum=0;
let submitted=false;
let userSelected={
    
}
//to get all the question and options
loadQuiz()
function loadQuiz(){
    question.innerText=quizArray[currentQusNum].question;
    a_text.innerText=quizArray[currentQusNum].a;
    b_text.innerText=quizArray[currentQusNum].b;
    c_text.innerText=quizArray[currentQusNum].c;
    d_text.innerText=quizArray[currentQusNum].d;
    deSelected()

    if(userSelected[currentQusNum]){
        let selected=userSelected[currentQusNum];
        document.getElementById(selected).checked=true;
           
    }
    if(currentQusNum==quizArray.length-1){
        next.style.display="none";
        submit.style.display="block"
    }
    if (submitted) {
        let actualAns = quizArray[currentQusNum].correct;
        let userSelectedAnswer = userSelected[currentQusNum];
    
        let correctOpt = actualAns + "_text";
        let useropt = userSelectedAnswer + "_text";
    
        // Clear previous background colors
        document.querySelectorAll('.op_label').forEach(label => {
            label.classList.remove('correct', 'wrong');
        });
    
        // Apply background color for the correct answer
        document.getElementById(correctOpt).classList.add('correct');
    
        // Apply background color for the wrong answer, if any
        if (actualAns !== userSelectedAnswer) {
            document.getElementById(useropt).classList.add('wrong');
        }
    }
    
 

}

next.addEventListener(
    'click',()=>{
        let answer=getSelected();
      if(!submitted){
        if(answer){
            if(answer==quizArray[currentQusNum].correct){
                answerNum++
            }
            currentQusNum++
            if(currentQusNum<quizArray.length){
                loadQuiz()
            }
        }
      }
      else{
        currentQusNum++;
        loadQuiz()
      }
    }
)
prev.addEventListener(
    'click',()=>{
        if(currentQusNum>0){
            currentQusNum--;
            loadQuiz()
        }
    }
)
submit.addEventListener(
    'click',()=>{
        if(getSelected()){
            submitted=true
            quiz.style.display="none";
            result.style.display="block";
            score.innerText=answerNum + "/" + quizArray.length + " questions answered correctly"
        }
    }
)

function getSelected(){
    let answer;
    answerE.forEach(answerE => {
        if(answerE.checked){
            answer =answerE.id
            userSelected[currentQusNum]=answer
        }
        
    });
    return answer;
}
function deSelected(){
    
    answerE.forEach(answerE => {
        answerE.checked=false
        
    });
  
}
function loadAnswers(){
    currentQusNum=0;
    quiz.style.display="block";
    result.style.display="none";
    answerE.forEach(
        (answerE)=>{
            answerE.disabled=true;
        }
    )
    submit.style.display="none";
    next.style.display="block";
    loadQuiz()

}
