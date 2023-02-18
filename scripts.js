const startBtn = document.getElementById('start-game');
const squares = document.querySelectorAll('.square');
const markers = document.querySelectorAll('.marker');

// gameBoard Module - inside an IIFE
const board = (() => {
  const gameBoard = {
    "spots": ["x", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    "x-marked": [1, 4, 7],
    "o-marked": [0, 2, 8]
  };

  const render = () => {
    for (i = 0; i < board.gameBoard.spots.length; i += 1){
      markers[i].textContent = board.gameBoard.spots[i];
    }
  };

  return { gameBoard, render };
  // winning configs here?
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


// Check for winner
function checkWinner(){
/// if gameBoard matches winningConfig

if (board.gameBoard == winningConfigs){
  declareWinner();
}
/// Check for a Tie (full board, no win))
else if (board.gameBoard.some('undefined' === false)){
  declareTie();
}
};

function declareTie(){
  alert('Tie game!');
};

function declareWinner(){
  alert(`${winningPlayer} wins!`)
};
