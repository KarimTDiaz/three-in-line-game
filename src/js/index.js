import '../scss/styles.scss';

const gameBoardElement = document.getElementById('game-board');
const scoreFirstPlayerElement = document.getElementById('score-first-player');
const scoreSecondPlayerElement = document.getElementById('score-second-player');
const gameBoxesElement = document.querySelectorAll('.game-board__item');
const resetElement = document.getElementById('reset');

const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let counterCurrentGame = 0;
let counterScoreFirstPlayer = 0;
let counterScoreSecondPlayer = 0;

let currentPlayer = 1;
const currentGame = {
  firstPlayer: [],
  secondPlayer: []
};

const setBoxesData = () => {
  gameBoxesElement.forEach((element, index) => {
    element.dataset.number = index;
  });
};

const resetGame = () => {
  setBoxesData();
  counterCurrentGame = 0;
  currentGame.firstPlayer = [];
  currentGame.secondPlayer = [];
  gameBoxesElement.forEach(item => {
    item.textContent = '';
    item.style.pointerEvents = 'auto';
  });
};

const setCurrentGame = ev => {
  if (!ev.target.dataset.number) return;
  const currentBox = ev.target;
  counterCurrentGame++;
  counterCurrentGame % 2 !== 0 ? (currentPlayer = 1) : (currentPlayer = 2);

  if (currentPlayer === 1) {
    currentBox.style.color = 'var(--primary-color)';
    currentBox.style.pointerEvents = 'none';
    currentBox.textContent = 'X';
    currentGame.firstPlayer.push(Number(currentBox.dataset.number));
  } else {
    currentBox.style.color = 'var(--text-light)';
    currentBox.style.pointerEvents = 'none';
    currentBox.textContent = 'O';
    currentGame.secondPlayer.push(Number(currentBox.dataset.number));
  }
};

const setWinner = () => {
  possibleWins.forEach(win => {
    const player1Wins = win.every(index =>
      currentGame.firstPlayer.includes(index)
    );
    const player2Wins = win.every(index =>
      currentGame.secondPlayer.includes(index)
    );
    if (player1Wins) {
      counterScoreFirstPlayer++;
      scoreFirstPlayerElement.textContent = counterScoreFirstPlayer;
    } else if (player2Wins) {
      counterScoreSecondPlayer++;
      scoreSecondPlayerElement.textContent = counterScoreSecondPlayer;
    }
  });
};

setBoxesData();

gameBoardElement.addEventListener('click', ev => {
  setCurrentGame(ev);
  setWinner();
});

resetElement.addEventListener('click', ev => {
  resetGame();
});
