let min = 1,
    max = 10,
    winningNum = generateWinningNum(min, max),
    guessesLeft = 3;

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;


game.addEventListener('mousedown', (e) => {
  if(e.target.className === 'play-again') window.location.reload();
});

guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess > min || guess < max) {
    showMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    guessesLeft--;
    if(guessesLeft === 0){
      gameOver(false, `Game Over, you lost... The correct number was ${winningNum}`);
    } else {
      guessInput.style.borderColor = 'red';
      showMessage(
        `Wrong answer, Try again... Guesses left: ${guessesLeft}`, 'red');
      guessInput.value = '';
    }
  }
})

function generateWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameOver(won, msg) {
  let color;
  if (won == true) color = 'green';
  else color = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  showMessage(msg);

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function showMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}