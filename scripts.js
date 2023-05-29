const startBtn = document.getElementById('start-game');
const startP1Btn = document.getElementById('start-P1-game');
const squares = document.querySelectorAll('.square');
const markers = document.querySelectorAll('.marker');
const username1 = document.querySelector('#username1')
const username2 = document.querySelector('#username2');
const newGameBtn = document.querySelector('.new-game');


// gameBoard Module - inside an IIFE
const board = (() => {

  // Event listeners for marker squares
  markers.forEach((marker) => {
    marker.addEventListener('mouseup', (e) => {
      if (marker.textContent == '' && game.gameStatus != 'over'){
        // Remove default X or O class and replace it
        if (marker.classList.contains('x')){
          marker.classList.remove('x')
        } else if (marker.classList.contains('o')){
          marker.classList.remove('o')
        }
        // re-add the true class.
        marker.classList.add(activePlayer.marker);
        // "Play" the marker
        marker.textContent = activePlayer.marker;
        // Update memory arrays
        let choice = e.target.getAttribute('data-id')
        board.gameBoard.spots[choice] = activePlayer.marker;
          if (activePlayer === player1){
            board.gameBoard.p1Choices.push(choice);
          } else if (activePlayer === player2){
            board.gameBoard.p2Choices.push(choice);
          }
        // On a legal move, refresh the board
        board.refreshBoard();
      }
    });
  });

  const gameBoard = {
    "spots": ['', '', '', '', '', '', '', '', ''],
    "p1Choices": [],
    "p2Choices": []
  };

  const render = () => {
    for (i = 0; i < board.gameBoard.spots.length; i += 1){
      markers[i] = board.gameBoard.spots[i];
    }
    game.oneTurn();
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
  const refreshBoard = () => {
    // Visually update the board to reflect new turn.
    board.render();
    // Check for a Winner
    checkWinner();
  }

  return { gameBoard, render, checkWinner, refreshBoard }; 
  // winning configs here?
})();

// Write something to update p1Choices with x values from board.gameBoard.spots
// and p2CHoices from o values in board.gameBoard.spots.
// Do this after the click event that grabs which spot was clicked
// but right before checking winner.

const game = (() => {

  mode = '';
  winningPlayer = '';

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


  activePlayer = player1;
    

    // Init the first turn
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
  
  const oneTurn = () => {
    if (activePlayer === player1){
      activePlayer = player2;
      username1.classList.remove('your-turn');
      username2.classList.add('your-turn-2');
    } else {
      activePlayer = player1;
      username2.classList.remove('your-turn-2');
      username1.classList.add('your-turn');
    };
  };

  const checkTieGame = () => {
    if (board.gameBoard.spots.every(value => (value != ''))){
      declareTie();
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
    mode,
    signIn,
    winningPlayer,
    winningConfigs,
    oneTurn,
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
  startBtn.parentElement.classList.remove('show');
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
  activePlayer = player1;
  board.gameBoard = {
    "spots": ['', '', '', '', '', '', '', '', ''],
    "p1Choices": [],
    "p2Choices": []
  }
}