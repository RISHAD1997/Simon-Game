var buttonColor = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text=("Level"+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour)
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setInterval(function(){
        $("#"+ currentColour).removeClass("pressed");
    },100);
}

$("body").keypress(function(){
    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
         }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  
      }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }

$(".start").click(function(){
    $(".start").addClass("start-animate");
    setInterval(function(){
    $(".start").removeClass("start-animate");
    },200);
    setInterval(function(){
        if(!started){

            $("#level-title").text("Level " + level);
                nextSequence();
                started = true;
        }
    },1000)
    
});
  







