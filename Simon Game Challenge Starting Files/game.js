var buttonColors = ["red", "blue", "green", "yellow"];
// 我开始写的是const 后面改成var
var gamePattern = [];
// 这里忘记了加var
var userClickedPattern = [];

var firstKeyPress = false;
var level = 0;
//level 0 是starting level之前的level，不应该显示出来//

$(document).keydown(function() {
  //对整个site的function用document。注意没有引号。//
  if (!firstKeyPress) {
    // ! is non-null assertion operator called "bang". It is to tell the compiler that this value can not be null or undefined,
    //so don't complain about the possibility of it being null or undefined
    // $("#level-title").text("Level "+level);
    //记住一下上面这句的语法//
    //为什么这句要重复两次呢？还有一次在nextsquence（）里面，都做完了删掉这句看有什么影响，目前到第七步，加和不加是一样的//
    nextSequence();
    firstKeyPress = true;
  }

});

//randomChosenColor

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  //below two lines of code is to make sounds
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animaterPress(userChosenColor);
  checkPattern(userClickedPattern.length - 1);

  //why did we do -1 ?
  // 因为currentlevel是一个index 比如说现在是level3 那么就是需要输入3个颜色，但是三个颜色最后一个颜色的位置是2
});


function nextSequence() {
  userClickedPattern = [];
  //above line is how you reset to only look at the current sequence//
  level++;
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // var randomChosenColor=buttonColors[nextSequence()];
  //这是我开始写的，但是现在这两个在function里面，需要更改

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  // 后面这两个分号我开始没有加到function里面

}




//log what the user clicked on in this new sequence

//check if what the uer clicked on matches with the random color sequence
//when to call below function
function checkPattern(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //这里check是不是只在check最新输入的颜色是否一致？为什么之前的也check了？
    if (userClickedPattern.length === gamePattern.length) { // 这里是看user是不是finished the sequence
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    gameEnds();
  }
}


function gameEnds() {
  playSound("wrong");
  // you need "" for wrong
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver(){
 level=0;
 gamePattern=[];
 firstKeyPress=false;
}

function animaterPress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)

}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  // new Audio("sounds/"+userChosenColor+".mp3");
  audio.play();
}







//总结：
// 1. detect that a keyboard key is pressed for the first time， if yes, then game starts
// 2. detect that a click was made and keep track of what was clicked
// 3. a function to check if what the user enteres mathes with the random pattern,
// if it matches, then the game continues; if it doesn't, then game ends.

// 卡住的点：
// 1.如何确定the user completes the sequence for each round
// if (userClickedPattern.length===gamePattern.length)
// 2.如何确定if keyboard key is pressed for the first time
// var firstKeyPress = false;
// $(document).keydown(function() {
//   if (!firstKeyPress) {
//     firstKeyPress = true;}
// 3.每一回合要reset 记录user enter什么的variable， 如何实现
// function nextSequence() {
//   userClickedPattern = [];
// 4.detect userChosenColor
// (".btn").click(function() {
// var userChosenColor = $(this).attr("id");
// 5.-1
// checkPattern(userClickedPattern.length-1);
//
//
// 还有一点不理解的地方：
// 1.if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
// 在check answer的时候，user 每click 一下都会 call $(".btn").click(function() 这个function
// 所以是每一个user enter 的颜色都在比对，而不是比对最后一个enter 的颜色
