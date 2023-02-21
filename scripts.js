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

const startBtn = document.getElementById('start-game');
const squares = document.querySelectorAll('.square');
const markers = document.querySelectorAll('.marker');

// gameBoard Module - inside an IIFE
const board = (() => {
  const gameBoard = {
   "spots": ['x', 'x', 'o', 'x', 'o', '', 'x', '', ''],
    "playerOne": [0, 1, 3, 6],
    "playerTwo": [2, 4, 7]
  };
  const render = () => {
    for (i = 0; i < board.gameBoard.spots.length; i += 1){
      markers[i].textContent = board.gameBoard.spots[i];
    }
    game.changeActive();
  };
  // Check for winner
    // const checkWinner = () => {

      // Check where playerOne's markers are. 
      // [0, 1, 3, 6] should win because [0, 3, 6] is a win

      /* Write as a for...in loop through object properties */

      for (let prop in winningConfigs) {
        console.log(`${prop}: ${object[prop]}`);
      }

      // for (let i = 0; i < winningConfigs.length; i += 1){
      //   if (gameBoard.playerOne === winningConfigs[i]){
      //     declareWinner(playerOne);
      //   } else {
      //   if (gameBoard.playerTwo == winningConfigs[i]){
      //   declareWinner();
      //   } else {
      //     if (board.gameBoard.every() != ''){
      //   declareTie();
      //   }
      // };
    //};

  return { gameBoard, render }; // Add , checkWinner to return
  // winning configs here?
})();

const game = (() => {
  
  let activePlayer = 'readyPlayerOne';

  const changeActive = () => {
    if (game.activePlayer === 'readyPlayerOne'){
      game.activePlayer = 'readyPlayerTwo';
    } else {
      game.activePlayer = 'readyPlayerOne';
    };
  };

    ///  Update board.gameBoard
  const refreshBoard = () => {
    board.gameBoard[i] = activePlayer.marker;
    board.render();
  // Check for a Winner
    checkWinner();
  }

  return { activePlayer, changeActive, refreshBoard };
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

function signIn() {
  let p1Name = prompt('Player 1 username');
  playerOne = player(p1Name, 'X');
  document.getElementById('username1').textContent = playerOne.username;
  
  let p2Name = prompt('Player 2 username');
  playerTwo = player(p2Name, 'O');
  document.getElementById('username2').textContent = playerTwo.username;

}

startBtn.addEventListener('click', () => {
  signIn();
  closeModal();
  dissolveMarkers();
});


function closeModal(){
  startBtn.parentElement.classList.remove('show');
};

// Hidden class gives a fadeaway animation
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


function declareTie(){
  alert('Tie game!');
};

function declareWinner(){
  alert(`${winningPlayer} wins!`)
};
