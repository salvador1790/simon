var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatedPress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play();
}

function animatedPress(currentColor){
    $("#" + currentColor).addClass("pressed")

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(currenLevel){
   if(gamePattern[currenLevel] === userClickedPattern[currenLevel]){
       console.log("Success")

       if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        },1000)
    }

   } else{
    var audio = new Audio("./sounds/wrong.mp3")
    audio.play();
       $("#level-title").text("Game Over, Press Any Key to Restart")
       $("body").addClass("game-over");
       setTimeout(function(){
        $("body").removeClass("game-over");
       },200)

       startOver();
   }

   
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor( Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor);

    console.log("game pattern chooses " + gamePattern)

    switch (randomChosenColor) {
        case "green":
            $("#green").fadeOut().fadeIn();
            break;

            case "red":
            $("#red").fadeOut().fadeIn();
            break;

            case "yellow":
            $("#yellow").fadeOut().fadeIn();
            break;

            case "blue":
            $("#blue").fadeOut().fadeIn();
            break;
    
        default:
            break;
    }

    playSound(randomChosenColor);
    
}




//Starts the game
$(document).on("keydown",function(){
    nextSequence();
})



 
 