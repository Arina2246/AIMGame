const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeBtns = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [
  '#FFC0CB',
  '#FFA07A',
  '#FF00FF',
  '#9370DB',
  '#8A2BE2',
  '#1E90FF',
  '#00FF7F',
];
let time = 0;
let score = 0;

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeBtns.addEventListener('click', (event) => {
  const btn = event.target;
  if (btn.classList.contains('time-btn')) {
    time = parseInt(btn.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame(time);
  }
});

function startGame(period) {
  setInterval(decreaseTime, 1000);
  setTime(period);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeElement.innerHTML = `00:${value}`;
}

function finishGame() {
  timeElement.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчет <span class='primary'>${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const y = getRandomNumber(0, height - size);
  const x = getRandomNumber(0, width - size);
  const color = getRandomColor();

  circle.classList.add('circle');
  board.append(circle);

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = color;
  circle.style.boxShadow = `0 0 2px ${color},0 0 10px ${color}`;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
