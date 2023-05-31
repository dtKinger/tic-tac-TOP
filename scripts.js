const modal = document.querySelector('.start');
const startBtn = document.getElementById('start-game');
const startP1Btn = document.getElementById('start-P1-game');
const squares = document.querySelectorAll('.square');
const markers = document.querySelectorAll('.marker');
const username1 = document.querySelector('#username1')
const username2 = document.querySelector('#username2');
const newGameBtn = document.querySelector('.new-game');
const allSquares = document.querySelector('.game-board');


// gameBoard Module - inside an IIFE
const board = (() => {

  // Event listeners for marker squares
  markers.forEach((marker) => {
    marker.addEventListener('mouseup', (e) => {
      if (marker.textContent === ''
      && game.gameStatus !== 'over'
      && allSquares.getAttribute('disabled') !== 'true')
      {
        // Remove default X or O class and replace it
        if (marker.classList.contains('x')) {
          marker.classList.remove('x');
        } else if (marker.classList.contains('o')) {
          marker.classList.remove('o');
        }
        // Re-add the true class.
        marker.classList.add(game.activePlayer.marker);
        // "Play" the marker
        marker.textContent = game.activePlayer.marker;
        // Get the player's choice
        let choice = e.target.getAttribute('data-id');
        // Update memory arrays
        board.gameBoard.spots[choice] = game.activePlayer.marker;
        if (game.activePlayer === player1) {
          board.gameBoard.p1Choices.push(choice);
        } else if (game.activePlayer === player2) {
          board.gameBoard.p2Choices.push(choice);
        }
        // Disable player clicks for one second.
        allSquares.setAttribute('disabled', 'true');
        setTimeout(() => {
          allSquares.removeAttribute('disabled')
        }, 1000);
        // On a legal move, change turns
        board.newTurn();
      }
    });
  });

  const gameBoard = {
    "spots": ['', '', '', '', '', '', '', '', ''],
    "p1Choices": [],
    "p2Choices": []
  };

  const checkWinner = () => {
    // Check if player1 won
    for (let [key, value] of Object.entries(game.winningConfigs)){
      if (value.every(x => board.gameBoard.p1Choices.includes(x.toString()))){
        game.winningPlayer = player1;
        game.endGame();
        // Then check if player 2 won.
      } else if (value.every(x => board.gameBoard.p2Choices.includes(x.toString()))){
        game.winningPlayer = player2;
        game.endGame();
      };
    };
    if (game.winningPlayer == ''){
      game.checkTieGame();
    }
  };

  ///  Update board.gameBoard
  const newTurn = () => {
    // Check for a Winner
    board.checkWinner();
    // Pass to other player or give AI a one-second turn then pass it back
    if (game.mode === 'players2'){
    game.toggleActivePlayer();
    } else if (game.mode === 'players1'){
      game.toggleActivePlayer();
      setTimeout(() => {
        game.aiTurn(),
        game.toggleActivePlayer();
      }, 1000);      
    }
  }

  return { gameBoard, checkWinner, newTurn }; 
  // winning configs here?
})();

const game = (() => {

  let mode = '';
  let winningPlayer = '';
  let activePlayer = '';

  let signIn = () => {
    let p1Name = prompt('Player 1 username');
    player1 = player(p1Name, 'x');
    username1.textContent = player1.username;
    
    if (game.mode === 'players2'){
      let p2Name = prompt('Player 2 username');
      player2 = player(p2Name, 'o');
      username2.textContent = player2.username;
    } else {
      player2 = player('AI', 'o');
      username2.textContent = player2.username;
    }
    // Init activePlayer
    game.activePlayer = player1;
    /// Clear Your turn for a New Game
    username1.classList.remove('your-turn');
    username2.classList.remove('your-turn');
    /// Init player 1
    username1.classList.add('your-turn');
  }

  // Winning configuartions
  /// Define possible wins
  let winningConfigs = {
    // Row wins
    "row1Win": [0, 1, 2],
    "row2Win": [3, 4, 5],
    "row3Win": [6, 7, 8],
    // Col wins
    "col1Win": [0, 3, 6],
    "col2Win": [1, 4, 7],
    "col3Win": [2, 5, 8],
    // Diagonal wins
    "diagNESW": [2, 4, 6],
    "diagSENW": [0, 4, 8], 
  };
  
  const toggleActivePlayer = () => {
    if (game.activePlayer === player1){
      game.activePlayer = player2;
      username1.classList.remove('your-turn');
      username2.classList.add('your-turn-2');
    } else {
      game.activePlayer = player1;
      username1.classList.add('your-turn');
      username2.classList.remove('your-turn-2');
    }
  };

  const aiTurn = () => {

    if (game.gameStatus !== 'over') {
    
    // Get the AI's choice
    let aiChoice = getRandomSpot();
    
    // Remove default X or O class and replace it
    if (markers[aiChoice].classList.contains('x')) {
      markers[aiChoice].classList.remove('x');
    } else if (markers[aiChoice].classList.contains('o')) {
      markers[aiChoice].classList.remove('o');
    }
    // Re-add the true class.
    markers[aiChoice].classList.add(game.activePlayer.marker);
    // "Play" the marker
    markers[aiChoice].textContent = game.activePlayer.marker;
    
    // Update memory
    board.gameBoard.spots[aiChoice] = game.activePlayer.marker;
    board.gameBoard.p2Choices.push(aiChoice.toString());
    
    board.checkWinner();
    
    }
  }

  const checkTieGame = () => {
    if (board.gameBoard.spots.every(value => (value != ''))){
      
      setTimeout(() => {
        declareTie();
      }, 10);
      
    }
  };

  const declareTie = () => {
    alert('Tie game!');
  };

  const declareWinner = () => {

    setTimeout(() => {
      alert(`${game.winningPlayer.username} wins!`);
    }, 10);
  };

  let gameStatus = 'active';

  const endGame = () => {
    game.gameStatus = 'over';
    hideTurnTag();
    declareWinner();
  }

  return { 
    // mode,
    signIn,
    winningPlayer,
    winningConfigs,
    toggleActivePlayer,
    aiTurn,
    checkTieGame,
    declareTie,
    declareWinner,
    endGame,
    gameStatus 
  };
})();


// Player factory function
const player = (username, marker) => {
  username,
  marker
  /* not sure how to make this method work atm
  ,
  changeName = () => {
    let update = prompt('Enter a new username');
    username = update;
  };
  */
  return { username, marker };
};

startP1Btn.addEventListener('click', () => {
  game.mode = 'players1';
  game.signIn();
  closeModal();
  dissolveMarkers();
  showNewGame();
});

startBtn.addEventListener('click', () => {
  game.mode = 'players2';
  game.signIn();
  closeModal();
  dissolveMarkers();
  showNewGame();
});

function closeModal(){
  // This works, but it broke when I nested the buttons. 
  // startBtn.parentElement.parentElement.classList.remove('show');
  // This should be more resilient:
  modal.classList.remove('show');
};

// The "Hidden" class gives a fadeaway animation
function dissolveMarkers(){
  markers.forEach((marker) => {
    marker.classList.add('hidden');
  });
};

// Empty the text contents and show the markup again
markers.forEach((marker) => {
  marker.addEventListener('transitionend', () => {
    marker.textContent = '';
    marker.classList.remove('hidden')
  });
})

function hideTurnTag(){
  username1.classList.remove('your-turn');
  username2.classList.remove('your-turn-2');
};

newGameBtn.addEventListener('click', () => {
  newGame();
  memBlur();
});

function newGame () {
  game.signIn();
  closeModal();
  dissolveMarkers();
}

function showNewGame() {
  newGameBtn.classList.add('show')
};

function memBlur () {
  p1Name = '';
  p2Name = '';
  game.gameStatus = 'active'
  game.activePlayer = player1;
  board.gameBoard = {
    "spots": ['', '', '', '', '', '', '', '', ''],
    "p1Choices": [],
    "p2Choices": []
  }
}

function getRandomSpot(min, max) {
  let emptySpots = [];
  // Find which spaces are empty ''
    board.gameBoard.spots.forEach( (spot, index) => {
      if (spot === ''){
        emptySpots.push(index);
      }
    });
  // Pick a random index for the emptySpots array
  min = 0;
  max = emptySpots.length;
  let randomChoice = Math.floor(Math.random() * (max - min))
  let aiChoice = emptySpots[randomChoice];

  return aiChoice;
};

