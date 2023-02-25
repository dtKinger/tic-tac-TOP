
// Replace currentX placeholder array with board.gameBoard.spots

// Loop through each property of an Object
// let index = 0
// for (let prop in winningConfigs){
//   if (winningConfigs[prop].every(value => currentX.includes(value))){
//     console.log(`Match found on ${winningConfigs}, (Index: ${index})`)
//   } else {
//     console.log(`Not this time.`)
//   };
//   index++;
// }


const startBtn = document.getElementById('start-game');
const squares = document.querySelectorAll('.square');
const markers = document.querySelectorAll('.marker');
const username1 = document.querySelector('#username1')
const username2 = document.querySelector('#username2')


// gameBoard Module - inside an IIFE
const board = (() => {

  // Event listeners for marker squares
  markers.forEach((marker) => {
    marker.addEventListener('mouseup', (e) => {
      if (marker.textContent == '' && game.gameStatus != 'over'){
        marker.textContent = game.activePlayer.marker;
        let choice = e.target.getAttribute('data-id')
        board.gameBoard.spots[choice] = game.activePlayer.marker;
          if (game.activePlayer.username == 'player1'){
            board.gameBoard.p1Choices.push(choice);
          } else if (game.activePlayer.username == 'player2'){
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
    game.checkTieGame();
    // Check if player1 won
    for (let [key, value] of Object.entries(game.winningConfigs)){
      if (value.every(x => board.gameBoard.p1Choices.includes(x.toString()))){
        game.winningPlayer.username = 'player1';
        console.log(`Match found at ${key}, which checks for ${value}`)
        game.endGame();
        // Then check if player 2 won.
      } else if (value.every(x => board.gameBoard.p2Choices.includes(x.toString()))){
        game.winningPlayer.username = 'player2';
        console.log(`Match found at ${key}, which checks for ${value}`)
        game.endGame();
      };
    };
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

  let activePlayer = {
    username: 'player1',
    marker: 'x'
  }
  let winningPlayer = {
    username: ''
  };

  // Winning configuartions
  /// Define possible wins
  let winningConfigs = {
    // Row wins
    "row1Win": [0, 1, 2], // 3
    "row2Win": [3, 4, 5], // 12
    "row3Win": [6, 7, 8], // 21
    // Col wins
    "col1Win": [0, 3, 6], // 9
    "col2Win": [1, 4, 7], // 12
    "col3Win": [2, 5, 8], // 15
    // Diagonal wins
    "diagNESW": [2, 4, 6], // 12
    "diagSENW": [0, 4, 8], // 12
  };
  
  const oneTurn = () => {
    if (game.activePlayer.username === 'player1'){
      game.activePlayer.username = 'player2';
      game.activePlayer.marker = 'o';
      username1.classList.remove('your-turn');
      username2.classList.add('your-turn-2');
    } else {
      game.activePlayer.username = 'player1';
      game.activePlayer.marker = 'x';
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

    setTimeout(function () {
      alert(`${game.winningPlayer.username} wins!`);
  }, 10);
  // alert(`${game.winningPlayer.username} wins!`)
};

  let gameStatus = 'active';

  const endGame = () => {
    game.gameStatus = 'over';
    declareWinner();  
  }

  return {  activePlayer, winningPlayer, winningConfigs, oneTurn, checkTieGame, declareTie, declareWinner, endGame, gameStatus };
})();


// Player factory function
const player = (username, marker, active ) => {
  username,
  marker,
  active
  /* not sure how to make this method work atm
  ,
  changeName = () => {
    let update = prompt('Enter a new username');
    username = update;
  };
  */
  return { username, marker, active };
};

function signIn() {
  let p1Name = prompt('Player 1 username');
  player1 = player(p1Name, 'x', true);
  document.getElementById('username1').textContent = player1.username;
  
  let p2Name = prompt('Player 2 username');
  player2 = player(p2Name, 'o', false);
  document.getElementById('username2').textContent = player2.username;

  // Init the first turn
  username1.classList.add('your-turn');
}

startBtn.addEventListener('click', () => {
  signIn();
  closeModal();
  dissolveMarkers();
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




