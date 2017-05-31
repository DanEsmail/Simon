var redSound = document.getElementById("red-sound");
var greenSound = document.getElementById("green-sound");
var blueSound = document.getElementById("blue-sound");
var yellowSound = document.getElementById("yellow-sound");
var wrong = document.getElementById("wrong");
wrong.volume = 0.4;

var simonArr = [];

var counter = 0

var gameMode = 0

var turn = 0

function clearBoard(){
  simonArr = [];
  counter = 0;
  $("#game-counter").html("counter: 0")
}

function flash(str){
  switch(str){
    case "green":
    case 1:
      greenSound.play();
      $("#green").css("background-color", "#69FF41");
      setTimeout(function() {
      $("#green").css("background-color", "#357F20");
      }, 500)
      break;
    case "red":
    case 2:
      redSound.play();
      $("#red").css("background-color", "#FF2D2A")
      setTimeout(function() {
        $("#red").css("background-color", "#7F1615");
      }, 500)
      break;
      break;
    case "blue":
    case 3:
      blueSound.play();
      $("#blue").css("background-color", "#4C8CFF")
      setTimeout(function() {
        $("#blue").css("background-color", "#26467F");
      }, 500)
      break;
    case "yellow":
    case 4:
      yellowSound.play();
      $("#yellow").css("background-color", "#FFDD1A");
      setTimeout(function() {
        $("#yellow").css("background-color", "#BFA613");
      }, 500)
      break;
  }
}

function wrongFlash(){
  $("#green").css("background-color", "#FF2D2A")
  $("#yellow").css("background-color", "#FF2D2A")
  $("#blue").css("background-color", "#FF2D2A")
  $("#red").css("background-color", "#FF2D2A")
  setTimeout(function(){
    $("#green").css("background-color", "#357F20");
    $("#red").css("background-color", "#7F1615");
    $("#blue").css("background-color", "#26467F");
    $("#yellow").css("background-color", "#BFA613");
  },500)
}

function playBack(){
  var count = 0;
  var breakout = setInterval(function(){
    if(count == simonArr.length){
      clearInterval(breakout)
      turn = 0
    }else{
      flash(simonArr[count])
      count++;
    }
  },600)
}

function add(){
  var num = (Math.ceil(Math.random()* 4));
  switch (num) {
    case 1:
      simonArr.push("green")
      break;
    case 2:
      simonArr.push("red")
      break;
    case 3:
      simonArr.push("blue")
      break;
    case 4:
      simonArr.push("yellow")
      break;
    default:
  }
}

function input(num){
  if(num == simonArr[counter]){
    flash(num);
    counter++
    if(counter == simonArr.length){
      $("#game-counter").html("Counter: "+ (counter+ 1))
      counter = 0;
      computerTurn();
    }
  }else{
    if(gameMode == 1){
      wrong.play()
      wrongFlash();
      turn = 1
      playBack();
      counter = 0
    }else{
      wrong.play();
      wrongFlash();
      clearBoard();
      computerTurn();

    }

  }
}

function computerTurn(){
  turn = 1
  add()
  playBack()
}


$(document).ready(function(){
    $(".simon-button").on("click", function(){
      if(turn == 0){
        input($(this).attr("id"))
      }else{
      }
    })

  $("#clear").on("click", function(){
    clearBoard();
  })

  $("#play").on("click", function(){
    computerTurn()
  })

  $("#change-game").on("click", function(){
    if(gameMode == 0 || gameMode == 1){
      gameMode = 2
      $("#game-mode").html("Game Mode: Strict")
      $("#change-game").html("Normal")
      clearBoard()
      computerTurn()
    }else{
      gameMode = 1
      $("#game-mode").html("Game Mode: Normal")
      $("#change-game").html("Strict")
      clearBoard()
      computerTurn()
    }
  })
})
