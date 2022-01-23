let btnSwitchGameMode = document.querySelector("#btn-toggle-game-mode");
let btnShowRules = document.querySelector("#btn-show-rules");
let btnCloseRules = document.querySelector("#btn-close-rules");
let btnPlayAgain = document.querySelector("#btn-play-again");
let btnsPlayerSelection = document.querySelectorAll(
  ".step-one-select-move button"
);

let pageRules = document.querySelector("#page-rules");
let msgThreeWayScore = document.querySelector("#three-way-score");
let msgFiveWayScore = document.querySelector("#five-way-score");
let msgGameSummary = document.querySelector(".game-summary");
let stepTwoSection = document.querySelector("#step-two");
let backdrop = document.querySelector(".backdrop");

let stepOneThreeWay = document.querySelector("#step-one-three-way");
let stepOneFiveWay = document.querySelector("#step-one-five-way");
let stepTwo = document.querySelector("#step-two");

let playerSelectionBox = document.querySelector(".player-selection-box");
let cpuSelectionBox = document.querySelector(".cpu-selection-box");

let playerSelection;
let cpuSelection;
let playerWon = false;
let gameModeThreeWay = true;
let threeWayScore;
let fiveWayScore;

function initNewGame() {
  stepOneThreeWay.classList.remove("display-none");
  stepOneFiveWay.classList.remove("display-none");

  console.log(btnPlayAgain);

  stepTwo.classList.add("display-none");
  msgGameSummary.classList.add("display-none");
  playerSelection = "";
  cpuSelection = "";
  playerSelectionBox.classList.remove(
    "paper",
    "scissors",
    "rock",
    "lizard",
    "spock",
    "won"
  );
  cpuSelectionBox.classList.remove(
    "paper",
    "scissors",
    "rock",
    "lizard",
    "spock",
    "won"
  );
  playerSelectionBox.classList.add("selection-placeholder");
  cpuSelectionBox.classList.add("selection-placeholder");
  stepTwoSection.classList.remove("big-screen-solution");
}

async function handleGame() {
  await setPlayerSelection();
  await cpuMakesSelection();

  playerWon = checkWinningConditions();
  console.log("win? " + playerWon);
  await showGameSummary();
  raiseScore();
  markWinnerEffect();
}

function markWinnerEffect() {
  playerWon
    ? playerSelectionBox.classList.add("won")
    : cpuSelectionBox.classList.add("won");
}

function initScores() {
  if (localStorage.hasOwnProperty("threeWayScore")) {
    threeWayScore = parseInt(localStorage.getItem("threeWayScore"));
  } else {
    threeWayScore = 0;
  }

  if (localStorage.hasOwnProperty("fiveWayScore")) {
    fiveWayScore = parseInt(localStorage.getItem("fiveWayScore"));
  } else {
    fiveWayScore = 0;
  }

  msgThreeWayScore.textContent = threeWayScore;
  msgFiveWayScore.textContent = fiveWayScore;
}

function raiseScore() {
  if (playerWon) {
    if (gameModeThreeWay) {
      threeWayScore++;
      msgThreeWayScore.textContent = threeWayScore;
      localStorage.setItem("threeWayScore", threeWayScore);
    } else {
      msgFiveWayScore.textContent = fiveWayScore;
      fiveWayScore++;
      localStorage.setItem("fiveWayScore", fiveWayScore);
    }
  }
}

function showGameSummary() {
  return new Promise((resolve) => {
    setTimeout(() => {
      playerWon
        ? (msgGameSummary.children[0].textContent = "you win")
        : (msgGameSummary.children[0].textContent = "you loose");
      msgGameSummary.classList.remove("display-none");
      stepTwoSection.classList.add("big-screen-solution");
      resolve();
    }, 1500);
  });
}

function checkWinningConditions() {
  if (gameModeThreeWay) {
    if (
      (playerSelection == "rock" && cpuSelection == "scissors") ||
      (playerSelection == "scissors" && cpuSelection == "paper") ||
      (playerSelection == "paper" && cpuSelection == "rock")
    ) {
      console.log("i  win");

      return true;
    } else {
      console.log("i dont  win");
      return false;
    }
  } else {
    if (
      (playerSelection == "scissors" && cpuSelection == "paper") ||
      (playerSelection == "scissors" && cpuSelection == "lizard") ||
      (playerSelection == "paper" && cpuSelection == "rock") ||
      (playerSelection == "paper" && cpuSelection == "spock") ||
      (playerSelection == "rock" && cpuSelection == "lizard") ||
      (playerSelection == "rock" && cpuSelection == "scissors") ||
      (playerSelection == "lizard" && cpuSelection == "spock") ||
      (playerSelection == "lizard" && cpuSelection == "paper") ||
      (playerSelection == "spock" && cpuSelection == "scissors") ||
      (playerSelection == "spock" && cpuSelection == "rock")
    ) {
      console.log("i  win");

      return true;
    } else {
      console.log("i dont  win");
      return false;
    }
  }
}

function setPlayerSelection() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      playerSelectionBox.classList.add(playerSelection);
      playerSelectionBox.classList.remove("selection-placeholder");
      resolve();
    }, 200);
  });
}

function cpuMakesSelection() {
  return new Promise((resolve, reject) => {
    let choices = ["paper", "scissors", "rock"];

    setTimeout(() => {
      choices.splice(choices.indexOf(playerSelection), 1);
      let temp = Math.random();

      if (temp > 0.5) {
        cpuSelection = choices[0];
      } else {
        cpuSelection = choices[1];
      }
      cpuSelectionBox.classList.add(cpuSelection);
      cpuSelectionBox.classList.remove("selection-placeholder");
      resolve();
    }, 2500);
  });
}

function handlePlayerSelection(event) {
  if (event.target.classList.contains("paper")) {
    playerSelection = "paper";
  } else if (event.target.classList.contains("scissors")) {
    playerSelection = "scissors";
  } else if (event.target.classList.contains("rock")) {
    playerSelection = "rock";
  } else if (event.target.classList.contains("lizard")) {
    playerSelection = "lizard";
  } else if (event.target.classList.contains("spock")) {
    playerSelection = "spock";
  }

  console.log("player selected " + playerSelection);
  gameModeThreeWay
    ? stepOneThreeWay.classList.add("display-none")
    : stepOneFiveWay.classList.add("display-none");

  stepTwo.classList.remove("display-none");
  handleGame();
}

function openRuleModal() {
  pageRules.classList.add("rules");
  backdrop.classList.remove("display-none");
}

function closeRuleModal() {
  pageRules.classList.remove("rules");
  backdrop.classList.add("display-none");
}

function toggleGameMode() {
  document.querySelector("#three-way-game").classList.toggle("display-none");
  document.querySelector("#five-way-game").classList.toggle("display-none");
  document
    .querySelector(".game-cards-flip-container")
    .classList.toggle("rotate");

  if (gameModeThreeWay) {
    gameModeThreeWay = false;
    console.log(pageRules.children[0].children[1]);
    pageRules.children[0].children[1].style.backgroundImage =
      'url("../images/image-rules-bonus.svg")';
  } else {
    gameModeThreeWay = true;
    pageRules.children[0].children[1].style.backgroundImage =
      'url("../images/image-rules.svg")';
  }
  console.log(gameModeThreeWay);
}

function init() {
  btnShowRules.addEventListener("click", openRuleModal);
  btnCloseRules.addEventListener("click", closeRuleModal);
  btnPlayAgain.addEventListener("click", initNewGame);

  btnsPlayerSelection.forEach((button) => {
    button.addEventListener("click", handlePlayerSelection);
  });
  btnSwitchGameMode.addEventListener("click", toggleGameMode);
  initNewGame();
  initScores();
}

window.onload = init;
