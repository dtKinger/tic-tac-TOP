// gameBoard Module - inside an I
let board = function () {
  let gameBoard = {
    "spots": [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    "x-marked": [1, 4, 7],
    "o-marked": [0, 2, 8]
  };

  // winning configs here?
}();

let playerOne = {"username": "", "marker": "X"};
let playerTwo = {"username": "", "marker": "O"};

// Player factory function
const player = (username, marker) => {
  username,
  marker
  return { username, marker };
}

function signIn() {
  let p1Name = prompt('Player 1 username');
  let playerOne = player(p1Name, 'X');
  document.getElementById('username1').textContent = playerOne.username;
  
  
  let p2Name = prompt('Player 2 username');
  let playerTwo = player('Computer', 'O');
}

// Uncomment this to start a real game;
// signIn(); 

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

if (gameBoard == winningConfigs){
  declareWinner();
}
/// Check for a Tie (full board, no win))
else if (gameBoard.some('undefined' === false)){
  declareTie();
}
};

function declareTie(){
  alert('Tie game!');
};

function declareWinner(){
  alert(`${winningPlayer} wins!`)
};