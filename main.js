const closeButton = document.querySelector(".closeButton");
const ruleBtnId = document.getElementById("rules-btn");
const ruleInfo = document.querySelector(".rule-info");
const pcScore = document.querySelector("#pcScoreBoard");  
const userScore = document.querySelector("#userScoreBoard");
const winnerUpdate = document.getElementById("you-win");
const nextButtton = document.querySelector("#nextPageRedirect");
const playAgainButton = document.querySelector(".playAgainButton");
const whoPicked = document.querySelector(".picked-heading");
const AGAINSTPC = document.querySelector("#against-pc");
const line = document.querySelectorAll(".line");
const pageBody=document.body;
const nextPageContent = document.querySelector(".nextContent");
const scoreBoardPanel=document.querySelector(".scoreBoard");
const whatHaveBeenPicked = document.querySelector(".whatHaveBeenPicked");
const userPicked = document.getElementById("userPicked");
const compPicked =  document.getElementById("compPicked");
const gameSection = document.querySelector(".gameSection");
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;


nextButtton.style.display = "none";

playAgainButton.addEventListener("click",()=>{
    gameSection.style.visibility="visible";
  })

pcScore.innerText = computerScore;
userScore.innerText = playerScore;

let choices = document.querySelectorAll(".CIRCLE");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const tie = () => {
  console.log("game tie");
  winnerUpdate.innerText = "TIE UP";
  nextButtton.style.display="none";
  ruleBtnId.style.marginRight="0.5%";
  document.getElementById("playButton").innerHTML="REPLAY";
};

const showWinner = (userWin) => {
  if (userWin) {
    playerScore++;
    userScore.innerText = playerScore;
    localStorage.setItem("playerScore", playerScore);
    console.log("you win");
    winnerUpdate.innerText = "YOU WIN";
    nextButtton.style.display="block";
    ruleBtnId.style.marginRight="11%";

    
  } else {
    computerScore++;
    pcScore.innerText = computerScore;
    localStorage.setItem("computerScore", computerScore);
    console.log("you lost");
    winnerUpdate.innerText = "YOU LOST";
    nextButtton.style.display="none";
    ruleBtnId.style.marginRight="0.5%";
  }
};


const playGame = (userChoice) => {
  console.log("user choice is = ", userChoice);
  userPicked.innerHTML= `
        <div class="CIRCLE" id="${userChoice}">
            <div class="outerCircle-${userChoice} circles">
              <div class="innerCircle">
                <img src="./images/icon-${userChoice}.svg" />
                <!-- </div> -->
              </div>
            </div>
          </div>`;
  userPicked.style.marginTop="-3rem";
  userPicked.style.marginLeft="-1rem";

  const computerChoice = genCompChoice();

  console.log("comp choice is = ", computerChoice);
  compPicked.innerHTML = `
        <div class="CIRCLE" id="${computerChoice}">
            <div class="outerCircle-${computerChoice} circles">
              <div class="innerCircle">
                <img src="./images/icon-${computerChoice}.svg" />
                <!-- </div> -->
              </div>
            </div>
          </div>`;
  compPicked.style.marginTop="-2.5rem";

  if (userChoice === computerChoice) {
    tie();
    
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = computerChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = computerChoice === "scissor" ? false : true;
    } else {
      userWin = computerChoice === "rock" ? false : true;
    }
    showWinner(userWin);
    console.log("user win is"+userWin)
    if(userWin===true){
        document.querySelector(`.outerCircle-${userChoice}`).classList.add("winner");
    }
    else{
      document.querySelector(`.outerCircle-${computerChoice}`).classList.add("winner")
    }
  }

  let circleHidden = () => {
    choices.forEach(element => {
      element.style.pointerEvents = "none";
      element.style.opacity = "0";
      element.style.transition = "all 0.8s ease";
    });
  }
  circleHidden();

  let lineHidden = () => {
    line.forEach(element => {
      element.style.opacity = "0";
      element.style.transition = "all 0.8s ease";
    });
  }
  lineHidden();

  function whoPickedWhatDisplay () {
    whatHaveBeenPicked.classList.add("visible");
  }
  whoPickedWhatDisplay();

  function playAgainButtonPopUP() {
    playAgainButton.classList.add("visible");
  }
  playAgainButtonPopUP();

  let against = () => {
    AGAINSTPC.classList.add("visible");
  };
  against();

  function pickedText() {
    whoPicked.classList.add("visible");
    setTimeout(() => {
      whoPicked.style.transition = "all 0.5s out";
    }, 0);
  }
  pickedText();
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
    
  });
});

closeButton.addEventListener("click", () => {
  ruleInfo.classList.remove("visible");
});

ruleBtnId.addEventListener("click", () => {
  ruleInfo.classList.toggle("visible");
});


nextButtton.addEventListener("click", ()=>{
  nextPageContent.style.visibility="visible";
  scoreBoardPanel.style.display="none";
  whoPicked.style.display="none";
  whatHaveBeenPicked.style.display="none";
  winnerUpdate.style.display="none";
  AGAINSTPC.style.display="none";
  nextButtton.style.display="none";
  ruleBtnId.style.marginRight="0.5%";
  ruleBtnId.style.marginTop="50%";
  nextPageContent.style.marginTop="-18%";
  playAgainButton.style.marginTop="35%";
})