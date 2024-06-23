
const scoreDisplay = document.querySelector('.js-score');
const movesDisplay = document.querySelector('.js-moves');
const resultDisplay = document.querySelector('.js-result');
const resetButton = document.querySelector('.js-resetButton');
const autoPlayButton = document.querySelector('.js-autoPlayButton');
const stopAutoPlayButton = document.querySelector('.js-stopAutoPlayButton');
const rockButton = document.querySelector('.js-rockButton');
const paperButton = document.querySelector('.js-paperButton');
const scissorsButton = document.querySelector('.js-scissorsButton');
let choice, computerChoice, autoPlayInterval;

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
  }
updateScoreDisplay();

document.body.addEventListener('keydown', (event) => {

  switch(event.key){
    case 'q':
      playerChoice = 'rock';
      computerChoice = randomChoice();
      checkResult(computerChoice, playerChoice);
      break;
    case 'w':
      playerChoice = 'paper';
      computerChoice = randomChoice();
      checkResult(computerChoice, playerChoice);
      break;
    case 'e':
      playerChoice = 'scissors';
      computerChoice = randomChoice();
      checkResult(computerChoice, playerChoice);
      break;

    case 'a':
      localStorage.removeItem('score');
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      updateScoreDisplay();
      break;
    case 's':
      computerChoice = randomChoice();
      autoPlay();
      break;
    case 'd':
      stopAutoPlay();
      break;
  }
})

rockButton.addEventListener('click', () => {
  playerChoice = 'rock';
  computerChoice = randomChoice();
  checkResult(computerChoice, playerChoice);
})
paperButton.addEventListener('click', () => {
  choice = 'paper'
  computerChoice = randomChoice();
  checkResult(computerChoice, choice);
})
scissorsButton.addEventListener('click', () => {
  choice = 'scissors'
  computerChoice = randomChoice();
  checkResult(computerChoice, choice);
})
resetButton.addEventListener('click', () => {
  localStorage.removeItem('score');
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      updateScoreDisplay();
});
autoPlayButton.addEventListener('click', () => {
  computerChoice = randomChoice();
  autoPlay();
})
stopAutoPlayButton.addEventListener('click', () => {
  stopAutoPlay();
});

const stopAutoPlay = () => clearInterval(autoPlayInterval);
function playGame(computerChoice, playerChoice)
{
  checkResult(computerChoice, playerChoice);
  updateScoreDisplay();
  updateMovesDisplay(computerChoice, playerChoice);
}

const autoPlay = () => {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(() => {
  playerChoice = randomChoice();
  computerChoice = randomChoice();
  playGame(computerChoice, playerChoice);
}, 1000);
}

const randomChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
      case 0:
    return 'rock';
      case 1:
    return 'paper';
      case 2:
    return 'scissors';
  }
}

function checkResult(computerChoice, playerChoice)
{
  if (computerChoice === playerChoice)
  {
    score.ties++;
    resultDisplay.innerHTML = ("... I'ts a Tie!");
  }

  else if (
    (computerChoice === 'rock' && playerChoice === 'scissors')||
    (computerChoice === 'paper' && playerChoice === 'rock') ||
    (computerChoice === 'scissors' && playerChoice === 'paper')
  )
  {
    score.losses++;
    resultDisplay.innerHTML = ("... You Lose!");
  }
  else
  {
    score.wins++;
    resultDisplay.innerHTML = ("... You Win!"); 
  }
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreDisplay();
  updateMovesDisplay(computerChoice, playerChoice);
}
  
function updateScoreDisplay(computerChoice, playerChoice)
{
  movesDisplay.innerHTML = ''
  scoreDisplay.innerHTML = (`wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`);
}

function updateMovesDisplay(computerChoice, playerChoice)
{
  movesDisplay.innerHTML = (`You picked: 
  <img src="../images/${playerChoice}-emoji.png" alt="Nothing" 
  class="css-move-icon">
  <img src="../images/${computerChoice}-emoji.png" alt=" Nothing" 
  class="css-move-icon">
  :Computer picked`)
}