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
let backdrop = document.querySelector(".backdrop");

let stepOneThreeWay = document.querySelector("#step-one-three-way");
let stepOneFiveWay = document.querySelector("#step-one-five-way");
let stepTwoSection = document.querySelector("#step-two");

let playerSelectionBox = document.querySelector(".player-selection-box");
let cpuSelectionBox = document.querySelector(".cpu-selection-box");

let playerSelection;
let cpuSelection;
let playerWon = false;
let gameModeThreeWay = true;
let threeWayScore;
let fiveWayScore;

async function handleGame() {
  document
    .querySelector(".game-cards-flip-container")
    .classList.add("hight-unset");

  await setPlayerSelection();
  await cpuMakesSelection();

  playerWon = checkWinningConditions();
  await showGameSummary();
  raiseScore();
  markWinnerEffect();
}

function markWinnerEffect() {
  playerWon
    ? playerSelectionBox.classList.add("won")
    : cpuSelectionBox.classList.add("won");
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
      return true;
    } else {
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
      return true;
    } else {
      return false;
    }
  }
}

function cpuMakesSelection() {
  return new Promise((resolve, reject) => {
    if (gameModeThreeWay) {
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
    } else {
      let choices = ["paper", "scissors", "rock", "lizard", "spock"];

      setTimeout(() => {
        choices.splice(choices.indexOf(playerSelection), 1);
        let temp = Math.random();

        if (temp < 0.25) {
          cpuSelection = choices[0];
        } else if (temp < 0.5) {
          cpuSelection = choices[1];
        } else if (temp < 0.75) {
          cpuSelection = choices[2];
        } else {
          cpuSelection = choices[3];
        }
        cpuSelectionBox.classList.add(cpuSelection);
        cpuSelectionBox.classList.remove("selection-placeholder");
        resolve();
      }, 2500);
    }
  });
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

  gameModeThreeWay
    ? stepOneThreeWay.classList.add("display-none")
    : stepOneFiveWay.classList.add("display-none");

  stepTwoSection.classList.remove("display-none");
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
    pageRules.children[0].children[1].style.backgroundImage =
      'url("./images/image-rules-bonus.svg")';
  } else {
    gameModeThreeWay = true;
    pageRules.children[0].children[1].style.backgroundImage =
      'url("./images/image-rules.svg")';
  }
  initNewGame();
}

function raiseScore() {
  if (playerWon) {
    if (gameModeThreeWay) {
      threeWayScore++;
      msgThreeWayScore.textContent = threeWayScore;
      localStorage.setItem("threeWayScore", threeWayScore);
      msgThreeWayScore.parentNode.classList.add("animateBox");
      setTimeout(() => {
        msgThreeWayScore.parentNode.classList.remove("animateBox");
      }, 350);
    } else {
      fiveWayScore++;
      msgFiveWayScore.textContent = fiveWayScore;
      localStorage.setItem("fiveWayScore", fiveWayScore);
      msgFiveWayScore.parentNode.classList.add("animateBox");
      setTimeout(() => {
        msgFiveWayScore.parentNode.classList.remove("animateBox");
      }, 350);
    }
  }
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

function initNewGame() {
  document
    .querySelector(".game-cards-flip-container")
    .classList.remove("hight-unset");
  stepOneThreeWay.classList.remove("display-none");
  stepOneFiveWay.classList.remove("display-none");

  stepTwoSection.classList.add("display-none");
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
