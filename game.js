var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var score = 0;

$(document).keydown(function(e) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        return;
    }
    
    const keyMap = {
        '1': 'green',
        '2': 'red', 
        '3': 'yellow',
        '4': 'blue'
    };
    
    if (keyMap[e.key]) {
        let userChosenColour = keyMap[e.key];
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    } else {
        playSound("wrong");
    }
});

$("#start-btn").click(function(e) {
    $(".start-button").text("Start Game");
    e.preventDefault();
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    score++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("false");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over! Final Score: " + score);
        $(".start-button").text("Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    score = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
