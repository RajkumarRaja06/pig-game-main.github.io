'use strict';

//selecting elements
const btnNew = document.getElementById('btn--new');
const btnRoll = document.getElementById('btn--roll');
const btnHold = document.getElementById('btn--hold');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.getElementById('dice');

const player0El = document.getElementById('player--0');
const player1El = document.getElementById('player--1');

//global variables - used
let scores, currentScore, activePlayer, dice;

//functions
const init = () => {
  score0El.innerText = 0;
  score1El.innerText = 0;
  current0El.innerText = 0;
  current1El.innerText = 0;

  diceEl.classList.add('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');

  // player1El.classList.
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  ///////
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  dice = 0;
};

btnRoll.addEventListener('click', () => {
  dice = getRandomNum(6);
  diceEl.classList.remove('hidden');
  diceEl.src = `./images/dice-${dice}.png`;

  if (dice === 1) {
    //switch player
    toggle();
  } else {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).innerText =
      currentScore;
  }
});

btnHold.addEventListener('click', () => {
  scores[activePlayer] = scores[activePlayer] + currentScore;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = currentScore;

  if (scores[activePlayer] >= 20) {
    document
      .getElementById(`player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .getElementById(`player--${activePlayer}`)
      .classList.add('player--winner');

    document.getElementById(`score--${activePlayer}`).innerText =
      scores[activePlayer];
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    diceEl.classList.add('hidden');
  } else {
    toggle();
  }
});

const getRandomNum = num => {
  const number = Math.floor(Math.random() * num) + 1;
  return number;
};

const toggle = () => {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  document.getElementById(`score--${activePlayer}`).innerText =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

btnNew.addEventListener('click', init);

init();
