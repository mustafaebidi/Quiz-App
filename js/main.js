
let bullets=document.querySelector(".bullets")
let lengthQuestion=document.querySelector(".length")
let currentAnswer=document.querySelector(".current")
let buttonsForAnswers=document.querySelectorAll(".question > div")
let question=document.querySelector(".question")
let allbullets=document.querySelectorAll(".bullets > div")
let time=document.querySelector(".time")
let questionTitle=document.querySelector(".main-title")


let lengthAndcurentQestion=document.querySelector(".title")
let progress=document.querySelector(".progress")

let progrssTime=document.querySelector(".progress-time")

let containerOfAllQuestion=document.querySelector(".quiz-area")





let current;
let storeRightAnswer;


let myRequest= new XMLHttpRequest();

let allDate=[]
let allRightAnswer=[]


let interval;
let intvalForProgressBar;


let durationForQuestion=10
let speedProgressForTime=50


///ToStartApp
readyApp()


function readyApp(){
    myRequest.onreadystatechange=function(){
        if(this.readyState === 4 && this.status === 200 ){
            allDate=JSON.parse(this.responseText)
            allDate=allDate["results"]
            storeRightAnswer=0
            current=1;

            createBullets()
            allbullets=document.querySelectorAll(".bullets > div")

            createContainerOfQuestion()
            ////For Update After Add them
            buttonsForAnswers=document.querySelectorAll(".question > div")
            questionTitle=document.querySelector(".main-title")

            question=document.querySelector(".question")


            setCurrentQuestion()
            addActiveClassForCurrentBullet()
            getAllRightAnswer()
            setQuestionIntoButton()
            increaseProgress()
            startTime(durationForQuestion)


        }   

    }

    myRequest.open("GET","https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple",false)
    myRequest.send()


}

function createBullets(){
    for(let i=0;i<allDate.length;i++){
        bullets.innerHTML+=`<div></div>`

    }
}


function createContainerOfQuestion(){
    containerOfAllQuestion.innerHTML=`
        <h2 class="main-title"></h2>
        <div class="question">
            <div class="answer"></div>
            <div class="answer"></div>
            <div class="answer"></div>
            <div class="answer"></div>
        </div>
    `
    
}


function addActiveClassForCurrentBullet(){

    removeActiveClassForAllBullets()
    allbullets[current-1].className="active"

}


function removeActiveClassForAllBullets(){
    for(let i=0;i<allbullets.length;i++){
        allbullets[i].classList.remove("active")
    }

}




////When Click At Answer
document.addEventListener("click",function(e){
    console.log(333)
    if(e.target.className==="answer"){

        if(current === allDate.length){
            clearInterval(intvalForProgressBar)
            clearInterval(interval)
            showResult()
        }
        else

        {
            if(checkIfAnswerIsRight(e.target.innerHTML)){
                storeRightAnswer++;
            }
            current++;
            nextQuestion()

        }


    }


})


function checkIfAnswerIsRight(thisanswer){
    if(thisanswer === allRightAnswer[current-1] ){
        return true
    }
    return false

}



function getAllRightAnswer(){

    for(let i=0;i<allDate.length;i++){

        allRightAnswer.push(allDate[i]["correct_answer"])

    }
    
}



function setCurrentQuestion(){
    lengthQuestion.innerHTML=allDate.length
    currentAnswer.innerHTML=current

}


function setQuestionIntoButton(){

    questionTitle.innerHTML=allDate[current-1]["question"]
    allAnswer=allDate[current-1]['incorrect_answers'].concat(allDate[current-1]['correct_answer'])
    sortArrayRandomly(allAnswer)

    for(let i=0;i<allAnswer.length;i++){
        buttonsForAnswers[i].innerHTML=allAnswer[i]
    }

}



function sortArrayRandomly(allAnswer){
    for(let i=0;i<allAnswer.length;i++){
        randomIndex = Math.floor(Math.random() * allAnswer.length);

        let temp=allAnswer[randomIndex]

        allAnswer[randomIndex]=allAnswer[i]
        allAnswer[i]=temp

    }

}

function showResult(){

    removeAllDiv()

    let result=`
        <div class=result>
            <div>Score</div>
            <div>${storeRightAnswer}</div>
            <div class="again" onclick=startAgain()>Again</div>
        </div>
    `
    question.innerHTML=result
}



function removeAllDiv(){
    questionTitle.innerHTML=""
    
    bullets.innerHTML=""
    time.style.display="none"
    progress.style.display="none"
    lengthAndcurentQestion.style.display="none"

}



function increaseProgress(){
    let rate=current/allDate.length
    progress.style.width=`${rate*100}%`
}


function startTime(duration){

    progressBarForTime()


    let minutes=0
    let seconds=0


    interval=setInterval(function(){
        minutes=parseInt(duration / 60)
        seconds=parseInt(duration % 60)



        document.querySelector(".minutes").innerHTML=minutes < 10 ? `0${minutes}`: minutes;
        document.querySelector(".seconds").innerHTML=seconds <10 ? `0${seconds}`:seconds;
        if(--duration<0){

            clearInterval(interval)

            current++;
            if(current > 10){
                clearInterval(intvalForProgressBar)
                clearInterval(interval)

                showResult()
            }
            else{
                nextQuestion()

            }
        }

    },1000)


    
}


function nextQuestion(){

    document.querySelector(".minutes").innerHTML=parseInt(durationForQuestion / 60) < 10 ? `0${parseInt(durationForQuestion / 60) }`: parseInt(durationForQuestion / 60) ;
    document.querySelector(".seconds").innerHTML=parseInt(durationForQuestion % 60) <10 ? `0${parseInt(durationForQuestion % 60) }`:parseInt(durationForQuestion % 60) ;

    setCurrentQuestion()
    addActiveClassForCurrentBullet()
    setQuestionIntoButton()
    increaseProgress()
    clearInterval(interval)
    clearInterval(intvalForProgressBar)
    startTime(durationForQuestion)


}






function progressBarForTime(){

    let counter=0
    let steps=(((durationForQuestion+1) * 1000)/speedProgressForTime)
    let rate=steps/100

    intvalForProgressBar=setInterval(function(){
        counter++; 

        if(counter > (steps-1))
        {
            clearInterval(intvalForProgressBar)
        }
        else
        {
            progrssTime.style.width=`${counter/rate}%`

        }

    },speedProgressForTime)


}


function startAgain(){

    time.style.display="flex"
    progress.style.display="block"
    lengthAndcurentQestion.style.display="block"

    readyApp()

}





        




