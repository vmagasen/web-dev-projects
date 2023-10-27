
var buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keypress", function(){
    if(!started){
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
    
});

$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor)

    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else {
        console.log("wrong");
        var wrong = new Audio(`./sounds/wrong.mp3`);
        wrong.play();
        gameOver();
        startOver();
    }
}

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);

    $("#level-title").html('<h1 id="level-title">Game Over!</br>Press A Key to Start</h1>');

}

function startOver(){
    level = 0;
    gamePattern = []
    started = false;
}

function nextSequence(){
    userClickedPattern = [];

    level += 1;

    $("#level-title").text(`Level ${level}`);

    randomNumber = Math.floor(Math.random() * 3);

    randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(color){
    var audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
}

function animatePress(color){
    $(`#${color}`).addClass("pressed");

    console.log($(`#${color}`))

    setTimeout(function () {
        $(`#${color}`).removeClass("pressed");
      }, 100);
}

