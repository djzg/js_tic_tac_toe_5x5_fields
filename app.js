
// get all elements with class name box
const boxes = Array.from(document.getElementsByClassName('box'));

const playText = document.getElementById('playText');
const restartBtn = document.getElementById('restartBtn');
const o_stats = document.getElementById('o_stats');
const x_stats = document.getElementById('x_stats');
const spaces = [];
const O_TEXT = 'O';
const X_TEXT = 'X';
let o_wins = 0;
let x_wins = 0;
let currentPlayer;


// function for drawing the game board
const drawBoard = () => {
  // building styles for boxes
  boxes.forEach((box, index) => {
    let styleString = '';
    if (index < 20) {
      styleString += `border-bottom: 3px solid var(--purple);`;
    }
    if (index % 5 === 0) {
      styleString += `border-right: 3px solid var(--purple);`;
    }
    if ((index % 5 === 4 || (index % 5 === 3) || (index % 5 === 2))) {
      styleString += `border-left: 3px solid var(--purple);`;
    }

    box.style = styleString;
    
    box.addEventListener('click', boxClicked);

  });
};

// handling the box clicking event
const boxClicked = (e) => {
  const id = e.target.id;
  console.log(id);

  // if the space on game board is empty
  if (!spaces[id]) {
    // set it to current player
    spaces[id] = currentPlayer;
    // change the text
    e.target.innerText = currentPlayer;

    // if the player won 
    if(playerHasWon()) {
      playText.innerText = `${currentPlayer} has won`;
      return;
    }
    // switch the player
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }
};

// handling win condition
const playerHasWon = () => {
  for (let i = 0; i < spaces.length; i++) {
    if ((spaces[i] === currentPlayer) && (spaces[i + 1] === currentPlayer) && (spaces[i + 2] === currentPlayer)) {
      console.log('A win detected horizontally!');
      win_stats();
      return true;
    };
    if ((spaces[i] === currentPlayer) && (spaces[i + 5] === currentPlayer) && (spaces[i + 10] === currentPlayer)) {
      console.log('A win detected vertically!');
      win_stats();
      return true;
    };
    if ((spaces[i] === currentPlayer) && (spaces[i + 6] === currentPlayer) && (spaces[i + 12] === currentPlayer)) {
      console.log('A win detected diagonally!');
      win_stats();
      return true;
    };
    if ((spaces[i] === currentPlayer) && (spaces[i + 4] === currentPlayer) && (spaces[i + 8] === currentPlayer)) {
      console.log('A win detected diagonally reverse!');
      win_stats();
      return true;
    };
  };
};

// win counter 
const win_stats = () => {
  if (currentPlayer === O_TEXT) {
    o_wins++;
    o_stats.innerHTML = o_wins;
    console.log(o_wins);
  };
  if (currentPlayer === X_TEXT) {
    x_wins++;
    x_stats.innerHTML = x_wins;
  };

};

// handling game restart
const restart = () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach(box => {
    box.innerText = '';
  });
  playText.innerHTML = 'Play';
  currentPlayer = O_TEXT;
};

// event for clicking the restart button
restartBtn.addEventListener('click', restart);



// calling restart after the initialization of the game board
restart();
// drawing the board on page
drawBoard();