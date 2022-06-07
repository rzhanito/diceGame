'use strict';

// selected elements 
const player0El = document.querySelector('.player--0'),
   player1El = document.querySelector('.player--1'),
   score0El = document.getElementById('score--0'),
   score1El = document.getElementById('score--1'),
   current0El = document.getElementById('current--0'),
   current1El = document.getElementById('current--1'),

   diceEl = document.querySelector('.dice'),
   btnNew = document.querySelector('.btn--new'),
   btnRoll = document.querySelector('.btn--roll'),
   btnHold = document.querySelector('.btn--hold')

let scores, activePlayer, playing, currentScore
// functions
const changeTextContent = (element, text) => element.textContent = text

const switchPlayer = () => {
   document.getElementById(`current--${activePlayer}`).textContent = 0
   currentScore = 0
   activePlayer = activePlayer === 0 ? 1 : 0
   player0El.classList.toggle('player--active')
   player1El.classList.toggle('player--active')
}

const init = () => {
   currentScore = 0
   activePlayer = 0
   playing = true
   scores = [0, 0]

   changeTextContent(score0El, 0)
   changeTextContent(score1El, 0)
   changeTextContent(current0El, 0)
   changeTextContent(current1El, 0)

   diceEl.classList.add('hidden')
   player0El.classList.add('player--active')
   player0El.classList.remove('player--winner')
   player1El.classList.remove('player--active', 'player--winner')
}

// start conditions
init()



// dice random functionality 
btnRoll.addEventListener('click', () => {

   if (playing) {
      // 1. generate number from 1 to 6
      const dice = Math.trunc(Math.random() * 6) + 1

      // 2. display diceEl 
      diceEl.classList.remove('hidden')
      diceEl.src = `dice-${dice}.png`

      // 3.if dice === 1, switch player
      if (dice !== 1) {
         currentScore += dice
         document.getElementById(`current--${activePlayer}`).textContent = currentScore
      } else {
         switchPlayer()
      }
   }
})


btnHold.addEventListener('click', () => {
   if (playing) {
      // 1. add current score to active player's score
      scores[activePlayer] += currentScore
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

      // 2. check if current score >= 100
      if (scores[activePlayer] >= 100) {
         // finish the game
         playing = false
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
         diceEl.classList.add('hidden')
      } else {
         // 3. switch to the next player
         switchPlayer()
      }
   }

})

btnNew.addEventListener('click', init)
