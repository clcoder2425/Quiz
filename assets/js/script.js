


var startBtn = document.getElementById("start-btn");
var quizDiv = document.getElementById("quiz-div")
startPage = document.getElementById("#start-page")
var Q = 0;
var highScoreArray=JSON.parse(localStorage.getItem('highScores'))||[];

var checkLine = document.querySelector("#check-line");
var scoreBoard = document.querySelector("#submit-page");
var finalScore = document.querySelector("#final-score");
var userInitial = document.querySelector("#initial");

var submitForm = document.querySelector("#score-form");
var highScorePage = document.querySelector("#highscore-page");
var highScore = document.getElementById('score-record');
var viewScoreBtn = document.getElementById('score-button');


var timeLeft = document.getElementById("timer");
var timerInterval;
var secondsLeft = 75;
var totalScore = 0;
var questionCount = 1;
function decrementTimer() {
    secondsLeft--;
    timeLeft.textContent = "Time left: " + secondsLeft + " s";
    if (secondsLeft <= 0 || secondsLeft === -1) {
        secondsLeft = 0;
        timeLeft.textContent = "Time left: " + secondsLeft + " s";
        endGame();
    }
}
function countdown() {

    timerInterval = setInterval(decrementTimer, 1000)


    // if (secondsLeft <= 0) {
    //     clearInterval(timerInterval);
    //     timeLeft.textContent = "Time is up!";
    //     // if time is up, show on score board content instead of "all done!"
    //     finish.textContent = "Time is up!";
    //     gameOver();

    // } else if (questionCount >= questions[Q].length + 1) {
    //     clearInterval(timerInterval);
    //     gameOver();
    // }
    // }, 1000);
}
function startGame() {
    //toggle start-page to show and hide//
    var startPage = document.getElementById("start-page");
   startPage.classList.add('hide');
    // document.getElementById("start-page").setAttribute("class", "hide");

    quizDiv.classList.remove("hide")
    countdown()
    askQuestion();
}
function endGame() {
    quizDiv.classList.add('hide');
    scoreBoard.classList.remove('hide');
    var userScore= totalScore*secondsLeft;
    finalScore.textContent=userScore;
    viewScore ();

}
function askQuestion() {
    document.getElementById("question-el").textContent = questions[Q].text
    document.getElementById("button-box").innerHTML = "";
    questions[Q].choices.forEach(function (choice) {
        var btn = document.createElement("button")
        btn.textContent = choice
        btn.setAttribute("value", choice)
        btn.addEventListener("click", function () {
            var correctAnswer = questions[Q].correct
            var userAnswer = this.value;
            console.log(correctAnswer);
            console.log(userAnswer);
            if (correctAnswer !== userAnswer) {
                secondsLeft = secondsLeft - 10;
                if (secondsLeft <= 0) {
                    secondsLeft = 0;
                    endGame();
                }


            }
            else {
                totalScore++;
                console.log(totalScore);
            }
            Q++;
            if (Q<questions.length){
                askQuestion();
            }
           else{
            endGame();
           } 

        })
        document.getElementById("button-box").appendChild(btn)
    })
}


startBtn.addEventListener("click", startGame);
submitForm.addEventListener('submit', function(event){
    event.preventDefault();
    let userInitial= document.getElementById('initials').value
    let highScore= {
        initials: userInitial,
        score: totalScore*secondsLeft,
    }
    console.log(highScore)
    highScoreArray.push(highScore);
    localStorage.setItem('highscores',JSON.stringify(highScoreArray))
})
viewScoreBtn.addEventListener('click', viewScore(Event){
    
});

//
function viewScore (){
    submit-page.classList.add('hide');
    highScore.classList.remove('hide');
    var userHighestScore= max(highScoreArray);
    highScore.textContent=userHighestScore;
    console.log(userHighestScore);
}