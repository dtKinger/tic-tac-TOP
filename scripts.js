
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


// gameBoard Module - inside an IIFE
const board = (() => {

  // Event listeners for marker squares
  markers.forEach((marker) => {
    marker.addEventListener('mouseup', (e) => {
      marker.textContent = game.activePlayer.marker;
      console.log(e);
    });
  });

  const gameBoard = {
    "spots": ['', '', '', '', '', '', '', '', ''],
    "p1Choices": [],
    "p2Choices": []
  };
  const render = () => {
    for (i = 0; i < board.gameBoard.spots.length; i += 1){
      markers[i].textContent = board.gameBoard.spots[i];
    }
    game.changeActive();
  };

  const checkWinner = () => {
    checkTieGame();
    // Check if player1 won
    for (let [key, value] of Object.entries(game.winningConfigs)){
      if (value.every(value => board.gameBoard.p1Choices.includes(value))){
        game.winningPlayer = player1;
        console.log(`Match found at ${key}, which checks for ${value}`)
        declareWinner();
        // Then check if player 2 won.
      } else if (value.every(value => board.gameBoard.p2Choices.includes(value))){
        game.winningPlayer = player2;
        console.log(`Match found at ${key}, which checks for ${value}`)
        declareWinner();
      };
    };
  };

  ///  Update board.gameBoard
  const refreshBoard = () => {
    game.oneTurn();
    // Visually update the board to reflect new array.
    board.render();
    // Check for a Winner
    checkWinner();
  }

  return { gameBoard, render, checkWinner, refreshBoard }; // Add , checkWinner to return
  // winning configs here?
})();

// Write something to update p1Choices with x values from board.gameBoard.spots
// and p2CHoices from o values in board.gameBoard.spots.
// Do this after the click event that grabs which spot was clicked
// but right before checking winner.

const game = (() => {

  let winningPlayer;

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
  

  const changeActive = () => {
    if (game.activePlayer === 'player1'){
      game.activePlayer = 'player2';
    } else {
      game.activePlayer = 'player1';
    };
  };

  let activePlayer = 'player1';

  const oneTurn = () => {
    
    // Add the click to gameBoard array
    updateSpotsArray();
    // board.gameBoard.spots[`${e.target["data-id"]}`] = activePlayer.marker;
    updatePlayerChoices();
    // Hand it over to other player
    changeActive();
  }


  return { winningPlayer, winningConfigs, activePlayer, changeActive, oneTurn };
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

function checkTieGame () {
  if (board.gameBoard.spots.every(value => (value != ''))){
    declareTie();
  }
};

function declareTie(){
  alert('Tie game!');
};

function declareWinner(){
  alert(`${game.winningPlayer.username} wins!`)
};


