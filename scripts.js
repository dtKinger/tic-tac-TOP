// let currentX = [0, 3, 2, 6];
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
  const gameBoard = {
    "spots": ['x', 'x', 'o', 'x', 'o', '', 'x', 'o', ''],
    "p1Choices": [0, 1, 3, 6],
    "p2Choices": [2, 4, 7]
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
    const checkWinner = () => {
      for (let [key, value] of Object.entries(winningConfigs)){
        if (value.every(value => board.gameBoard.p1Choices.includes(value))){
          winningPlayer = player1;
          console.log(`Match found at ${key}, which checks for ${value}`)
          declareWinner();
        } else if (value.every(value => board.gameBoard.p2Choices.includes(value))){
          winningPlayer = player2;
          console.log(`Match found at ${key}, which checks for ${value}`)
          declareWinner();
        } else {
          checkTieGame();
        };
      };
    };

  return { gameBoard, render, checkWinner }; // Add , checkWinner to return
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
    board.gameBoard[`${e.target["data-id"]}`] = activePlayer.marker;
    board.render();
  // Check for a Winner
    checkWinner();
  }

  return { activePlayer, changeActive, refreshBoard };
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
  player1 = player(p1Name, 'X', true);
  document.getElementById('username1').textContent = player1.username;
  
  let p2Name = prompt('Player 2 username');
  player2 = player(p2Name, 'O', false);
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
    delcateTie();
  }
};

function declareTie(){
  alert('Tie game!');
};

function declareWinner(){
  alert(`${winningPlayer.username} wins!`)
};


