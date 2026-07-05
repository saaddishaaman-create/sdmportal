// ===============================
// UEE CBT SYSTEM
// exam.js - Part 1
// ===============================

// Variables

let currentQuestion = 0;

let userAnswers = new Array(questions.length);

let flaggedQuestions = new Array(questions.length).fill(false);

let answeredCount = 0;

// Timer

let totalTime = 2 * 60 * 60; // 2 Hours

const timerElement = document.getElementById("timer");

// ===============================
// START EXAM
// ===============================

window.onload = function(){

    createNavigator();

    loadQuestion();

    startTimer();

};

// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion(){

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").innerHTML =
    "Question " + (currentQuestion+1) + " of " + questions.length;

    document.getElementById("questionText").innerHTML =
    q.question;

    document.getElementById("option0").innerHTML =
    "A. " + q.options[0];

    document.getElementById("option1").innerHTML =
    "B. " + q.options[1];

    document.getElementById("option2").innerHTML =
    "C. " + q.options[2];

    document.getElementById("option3").innerHTML =
    "D. " + q.options[3];

    const radios = document.getElementsByName("answer");

    radios.forEach(r=>r.checked=false);

    if(userAnswers[currentQuestion]!==undefined){

        radios[userAnswers[currentQuestion]].checked=true;

    }

    createNavigator();

}

// ===============================
// SAVE ANSWER
// ===============================

document.querySelectorAll("input[name='answer']").forEach((radio)=>{

radio.addEventListener("change",function(){

userAnswers[currentQuestion]=Number(this.value);

createNavigator();

});

});
// ===============================
// exam.js - Part 2
// ===============================

// NEXT QUESTION

function nextQuestion(){

    if(currentQuestion < questions.length-1){

        currentQuestion++;

        loadQuestion();

    }

}

// PREVIOUS QUESTION

function previousQuestion(){

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

}

// FLAG QUESTION

function toggleFlag(){

    flaggedQuestions[currentQuestion]=
    !flaggedQuestions[currentQuestion];

    createNavigator();

}

// CREATE QUESTION NAVIGATOR

function createNavigator(){

    const nav=document.getElementById("questionNumbers");

    nav.innerHTML="";

    answeredCount=0;

    let flaggedCount=0;

    for(let i=0;i<questions.length;i++){

        const btn=document.createElement("button");

        btn.innerHTML=i+1;

        if(userAnswers[i]!==undefined){

            btn.classList.add("answered");

            answeredCount++;

        }

        if(flaggedQuestions[i]){

            btn.classList.remove("answered");

            btn.classList.add("flagged");

            flaggedCount++;

        }

        if(i===currentQuestion){

            btn.classList.remove("answered");

            btn.classList.remove("flagged");

            btn.classList.add("current");

        }

        btn.onclick=function(){

            currentQuestion=i;

            loadQuestion();

        }

        nav.appendChild(btn);

    }

    document.getElementById("answered").innerHTML=
    answeredCount;

    document.getElementById("remaining").innerHTML=
    questions.length-answeredCount;

    document.getElementById("flagged").innerHTML=
    flaggedCount;

    updateButtons();

}

// SHOW / HIDE BUTTONS

function updateButtons(){

    const finishBtn=document.getElementById("finishBtn");

    const nextBtn=document.getElementById("nextBtn");

    if(currentQuestion===questions.length-1){

        finishBtn.style.display="inline-block";

        nextBtn.style.display="none";

    }else{

        finishBtn.style.display="none";

        nextBtn.style.display="inline-block";

    }

}
// ===============================
// exam.js - Part 3
// ===============================

// TIMER

function startTimer(){

    setInterval(function(){

        totalTime--;

        let hours=Math.floor(totalTime/3600);

        let minutes=Math.floor((totalTime%3600)/60);

        let seconds=totalTime%60;

        if(hours<10) hours="0"+hours;
        if(minutes<10) minutes="0"+minutes;
        if(seconds<10) seconds="0"+seconds;

        timerElement.innerHTML=
        hours+":"+minutes+":"+seconds;

        if(totalTime<=300){

            timerElement.style.color="yellow";

        }

        if(totalTime<=60){

            timerElement.style.color="red";

        }

        if(totalTime<=0){

            finishExam();

        }

    },1000);

}

// ===============================
// FINISH EXAM
// ===============================

function finishExam(){

    let score=0;

    for(let i=0;i<questions.length;i++){

        if(userAnswers[i]===questions[i].answer){

            score++;

        }

    }

    let percentage=((score/questions.length)*100).toFixed(1);

    let grade="";

    if(percentage>=90){

        grade="A";

    }else if(percentage>=80){

        grade="B";

    }else if(percentage>=70){

        grade="C";

    }else if(percentage>=60){

        grade="D";

    }else{

        grade="F";

    }

    alert(

"Exam Finished!\n\n"+
"Score: "+score+" / "+questions.length+
"\nPercentage: "+percentage+"%"+
"\nGrade: "+grade

);

    location.reload();

}
function toggleSidebar(){

    const sidebar = document.querySelector(".sidebar");
    const btn = document.getElementById("toggleNav");

    if(sidebar.style.display === "none"){

        sidebar.style.display = "block";
        btn.innerHTML = "☰ Hide Navigation";

    }else{

        sidebar.style.display = "none";
        btn.innerHTML = "☰ Show Navigation";

    }

}