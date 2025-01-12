let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}

updateScoreElement();

function pickCompterMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else {
    computerMove = 'scissors';
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalID;

document.querySelector('.js-auto-play-button')
  .addEventListener('click', autoPlay);

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {     // Arrow Funtion
      const playerMove = pickCompterMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.js-auto-play-button').innerHTML = "Stop Play";
  }
  else {
    clearInterval(intervalID);
    isAutoPlaying = false;

    document.querySelector('.js-auto-play-button').innerHTML = "Auto Play";
  }
}



document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });


document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickCompterMove();
  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    }
    else if (computerMove === 'paper') {
      result = 'You lose.';
    }
    else {
      result = 'You win.';
    }
  }
  else if (playerMove === 'paper') {
    if (computerMove === 'paper') {
      result = 'Tie.';
    }
    else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    else {
      result = 'You win.';
    }
  }
  else {
    if (computerMove === 'scissors') {
      result = 'Tie.';
    }
    else if (computerMove === 'rock') {
      result = 'You lose.';
    }
    else {
      result = 'You win.';
    }
  }


  if (result === 'You win.') {
    score.wins++;
  }
  else if (result === 'You lose.') {
    score.losses++;
  }
  else {
    score.ties++;
  }

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You 
          <img src = "images/${playerMove}-emoji.png" class = "move-icon"> 
          <img src = "images/${computerMove}-emoji.png" class = "move-icon"> 
          Computer`;

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


document.querySelector('.js-reset-button')
  .addEventListener('click', resetScore);

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}
