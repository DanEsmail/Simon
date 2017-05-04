// game state 0 = off / 1 = normal / 2= strict
var gameState = 0;
// coumpters turn = 0 / players turn = 1
var turn = 0;
// gives the player the count of simmon
var gameCount = 0;
// tells the computer what number of the array its on
var currentNum = 0;
var simmonArr = [];
var redSound = document.getElementById("red-sound");
var greenSound = document.getElementById("green-sound");
var blueSound = document.getElementById("blue-sound");
var yellowSound = document.getElementById("yellow-sound");
var winnerCount = 0;




function winner() {
  $("#game-mode").html("Game Mode: WINNER!")

  var winnerBreak = setInterval(function() {
    if (winnerCount >= 10) {
      clearInterval(winnerBreak);
      $("#game-mode").html("Game Mode: Normal")
      setTimeout(function(){
      clearBoard();
      restart();
      winnerCount = 0;
      },200)

    } else {
      $("#green").css("background-color", "#69FF41");
      $("#red").css("background-color", "#FF2D2A");
      $("#blue").css("background-color", "#4C8CFF");
      $("#yellow").css("background-color", "#FFDD1A");

      setTimeout(function() {
        $("#green").css("background-color", "#357F20");
        $("#red").css("background-color", "#7F1615");
        $("#blue").css("background-color", "#26467F")
        $("#yellow").css("background-color", "#BFA613");

      }, 300)
      winnerCount += 1
      console.log(winnerCount)
    }
  }, 500);

}

function clearBoard() {
  gameCount = 0;
  simmonArr = [];
  currentNum = 0;
  $("#game-counter").html("Counter: " + currentNum);
}

function restart() {
  simmonRandom();
  playBack();
}

function simmonRandom() {
  currentNum += 1;
  $("#game-counter").html("Counter: " + currentNum)
  simmonArr.push(Math.ceil(Math.random() * 4))
  console.log(simmonArr);

}

function simmonFlash(num) {
  switch (num) {
    case 1:
      greenSound.play();
      $("#green").css("background-color", "#69FF41");
      setTimeout(function() {
        $("#green").css("background-color", "#357F20");

      }, 500)
      break;
    case 2:
      redSound.play();
      $("#red").css("background-color", "#FF2D2A")
      setTimeout(function() {
        $("#red").css("background-color", "#7F1615");

      }, 500)
      break;
      break;
    case 3:
      blueSound.play();
      $("#blue").css("background-color", "#4C8CFF")
      setTimeout(function() {
        $("#blue").css("background-color", "#26467F");


      }, 500)
      break;
    case 4:
      yellowSound.play();
      $("#yellow").css("background-color", "#FFDD1A");
      setTimeout(function() {
        $("#yellow").css("background-color", "#BFA613");

      }, 500)
      break;
  }

}

function playBack() {
  if(currentNum >= 20) {
    winner()
  } else {

    var breakout = setInterval(function() {
      if (gameCount >= simmonArr.length - 1) {
        clearInterval(breakout);
        turn = 1;
        setTimeout(function() {
          gameCount = 0;
        }, 200)

      }
      simmonFlash(simmonArr[gameCount]);
      gameCount += 1;
    }, 750)
  }
}

function playerInput(num) {
    simmonFlash(num)
    if (num == simmonArr[gameCount]) {

      gameCount += 1;
      console.log(gameCount)
      if (gameCount >= simmonArr.length) {
        turn = 0;
        gameCount = 0;
        simmonRandom();
        playBack();
      }
    } else if (gameState == 1) {
      turn = 0;
      gameCount = 0;
      playBack();
    } else {
      clearBoard();
      restart();
    }
  }


$("#play").click(function() {

  if (gameState == 0) {
    restart();
    gameState = 1;
    $("#game-mode").html("Game Mode: Normal");
  }
})

$("#clear").click(function() {
  clearBoard();
  restart();
})

$("#change-game").click(function() {
  if (gameState == 1 || gameState == 0) {
    clearBoard();
    restart()
    gameState = 2;
    $("#game-mode").html("Game Mode: Strict");
    $("#change-game").html("Normal")
  } else {
    clearBoard();
    gameState = 1;
    restart();
    $("#game-mode").html("Game Mode: Normal");
    $("#change-game").html("Strict")
  }
})

$("#red").click(function() {

  if (turn == 1) {
    playerInput(2);
  }

})

$("#blue").click(function() {
  if (turn == 1) {
    playerInput(3);
  }
})
$("#yellow").click(function() {
  if (turn == 1) {
    playerInput(4);
  }

})
$("#green").click(function() {
  if (turn == 1) {
    playerInput(1);
  }
})
