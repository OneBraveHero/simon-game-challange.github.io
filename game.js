var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var clickedPattern = [];
var level = 0;
var currentLevel = -1;
var currentPattern = 0;

$(document).on("keydown", function () {
    if (level === 0) {

        nextSequence();
    }

});


$(".btn").on("click", function () {
    var buttonId = this.id;
    var name = buttonId;

    $(this).addClass("pressed");

    setTimeout(function () {
        $(".btn").removeClass("pressed");//actions to perform
    }, 100);


    clickedPattern.push(buttonId);
    console.log(clickedPattern);

    checkAnswer();
    currentPattern++;
    return playSound(name);


});

function nextSequence() {
    var randomNumber = Math.floor(((Math.random()) * 4));
    var selectRandomNumber = buttonColors[randomNumber];
    var name = selectRandomNumber;
    gamePattern.push(selectRandomNumber);
    console.log(gamePattern);
    $("#" + selectRandomNumber).fadeOut(130).fadeIn(130).fadeOut(130).fadeIn(130);
    level++;
    currentLevel++;
    currentPattern = 0;
    $("#level-title").text("Level " + level);
    return playSound(name)
}

function playSound(name) {
    $("#sound-" + name).get(0).play();
}

function checkAnswer() {

    if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {
        console.log("Succes");
        setTimeout(function () {
            nextSequence();
        }, 1000);
        clickedPattern = [];

    } else if (gamePattern[currentPattern] === clickedPattern[currentPattern]) {

        console.log("good path")

    } else {
        $("#level-title").text("Game Over");
        $("body").addClass("game-over");
        $("#game-over").get(0).play();
        setTimeout(function () {
            $("body").removeClass("game-over");
            level = 0;
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }, 2000);

        console.log("Wrong");
    }
}

function startOver() {
    gamePattern = [];
    clickedPattern = [];
    level = 0;
    currentLevel = -1;
    currentPattern = 0;
}