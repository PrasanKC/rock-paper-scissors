let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
htmlDisplay();

function computerMove() {
  const randomNumber = Math.random();
  let move = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    move = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    move = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    move = "scissors";
  }
  return move;
}

function playerMove(playerChoice) {
  let computerChoice = computerMove();
  let result = " ";
  if (playerChoice === "rock") {
    if (computerChoice === "rock") {
      result = "TIE";
    } else if (computerChoice === "paper") {
      result = "YOU LOSE";
    } else if (computerChoice === "scissors") {
      result = "YOU WIN";
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "rock") {
      result = "YOU WIN";
    } else if (computerChoice === "paper") {
      result = "TIE";
    } else if (computerChoice === "scissors") {
      result = "YOU LOSE";
    }
  } else if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      result = "YOU LOSE";
    } else if (computerChoice === "paper") {
      result = "YOU WIN";
    } else if (computerChoice === "scissors") {
      result = "TIE";
    }
  }
  if (result === "YOU WIN") {
    score.wins++;
  } else if (result === "YOU LOSE") {
    score.losses++;
  } else if (result === "TIE") {
    score.ties++;
  }

  document.querySelector(".js-display").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `
  <div class="moveDisplay">
    <div class="textDisplay">Your pick</div> 
    <div><img src='/images/${playerChoice}-emoji.png'></div>    
  </div>
  <div class="moveDisplay">
    <div class="textDisplay">Computer's Pick</div> 
    <div><img src='/images/${computerChoice}-emoji.png'></div>
  </div>`;
  saveResult();
  htmlDisplay();
}

function saveResult() {
  localStorage.setItem("score", JSON.stringify(score));
}

function htmlDisplay() {
  document.querySelector(".scoreDiv").innerHTML = `
  <div class="js-score">
    <div class="green">WINS</div>
    <div>${score.wins}</div> 
  </div>
  <div class="js-score">
    <div class="red">LOSSES</div>
    <div>${score.losses}</div> 
  </div>
  <div class="js-score">
    <div class="yellow">TIES</div>
    <div>${score.ties}</div>
  </div>`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  saveResult();
  htmlDisplay();
}
