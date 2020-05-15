/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, stateGame, limitScore;
pop();
init();


document.querySelector('.btn-roll').addEventListener('click', function(){

  // Using the state variable
  if (stateGame){
    //#1 Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    //#2 Display the result
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png'

    //#3 Update the round score if the dice was not a 1
    if (dice !== 1){
      //Add the Score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else{
      nextPlayer();
    }
  }

})

  document.querySelector('.btn-hold').addEventListener('click', function(){

    if (stateGame){
      //Add current Score to the global Score
    score[activePlayer] += roundScore;
    }

    //Update de UI
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
    //Check if the player won the game
    if (score[activePlayer] >= limitScore){
      stateGame = false;
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!'
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    } else {
      //Change the player
      nextPlayer();
      stateGame = true;
    }
  })



  function nextPlayer(){
      //Next Player with ternary operator
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      roundScore = 0;

      //Display in the screen the reset of the RoundScore
      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';

      //Add what player is active
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');

      //Hide the dice when the active player change
      document.querySelector('.dice').style.display = 'none';
}

  document.querySelector('.btn-new').addEventListener('click', function(){
    showLimit();
    init();
  });



function init(){
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  stateGame = true;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.getElementById('name-0').textContent = 'player 1';
  document.getElementById('name-1').textContent = 'player 2';
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

//Agregamos el modal donde se nos indican las reglas del juego
function pop(){
  swal({
    // icon: 'info',
    title: 'Reglas',
    text: '1-El primer jugador en lograr el score establecido ganara. \n \n 2-Si en uno de los dados sale 1 entonces el valor actual \'Current\' sera eliminado y pasara a ser turno del siguiente jugador. \n \n 3-Si ambos dados son 6 entonces tanto el score actual como el global seran eliminados y pasara a jugar el siguiente jugador. \n \n 4- Si elijes \'Hold\' manter tu valor actual, este se guardara en tu score global y pasara a jugar el siguiente jugador.',
    button: 'Entendido!!'
  })
}

//Agrege el modal donde indicamos el limite del juego
  document.querySelector('.popup--button').addEventListener('click', function(){
  document.querySelector('.overlay').classList.add('no--overlay');
  setLimit();
})

document.querySelector('.popup--button--rules').addEventListener('click', pop);

function showLimit(){
  document.querySelector('.overlay').classList.remove('no--overlay');
}

function setLimit(){
  limitScore = document.querySelector('.hightScore').value;
}

