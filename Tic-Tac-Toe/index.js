///----VARIABLES----
let gameBoard= document.querySelector("#game-board")
let winner = document.querySelector("#game-winner");
let playerElem = document.querySelector(".player-name");

///----GAME STATE-----

let game = {
    players: ['', ''],
    gameOver: false,
    gameStarted:false,
    currentLetter: 'X',
    winningLine: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
}
function newMark () {
    if (game.currentLetter ==="X") {
        game.currentLetter = "0";
    } else {
        game.currentLetter ="X";
    }
}

//----------------
function setGame () {
    game.board = [
        {value: '', boxClicked: false},
        {value: '', boxClicked: false},
        {value: '', boxClicked: false},
        {value: '', boxClicked: false},
        {value: '', boxClicked: false},
        {value: '', boxClicked: false},
        {value: '', boxClicked: false},
        {value: '', boxClicked: false},
        {value: '', boxClicked: false},];
        game.players = ['', ''];
        game.currentPlayerIdx = 0;
        game.getCurrentPlayer  = () => game.players[game.currentPlayerIdx];
        
}

const changeTurn = () => {
     game.currentPlayerIdx = Math.abs(game.currentPlayerIdx - 1);
    
  };

//-------------RENDER------------------------

 function render() {
     gameBoard.innerHTML = '';

     for (let i = 0; i < game.board.length; i++) {

       let box = document.createElement('div');
        box.innerHTML= game.board[i].value;
        box.className = 'box';
        box.dataset.index = i;

        gameBoard.appendChild(box);

         }
     }

function renderPlayer () {
        let text;
        if (!game.players[0] && !game.players[1]) {
          text = `
          <input id='player1' placeholder="Player One's Name">
          <input id='player2' placeholder="Player Two's Name">
          <button class='start' onclick="startBtn()">Start Game</button>
          `;
        } else {
          text = `It's now ${game.getCurrentPlayer()}'s turn`;
        }
        playerElem.innerHTML = text;
        
      };

//-------------------------------------

 function playersTurn(boxIdx) {
     if (game.currentPlayerIdx === 0) {
         mark = ' X';
     }
        else {
            mark = 'O';
        }

     currentItem = game.board[boxIdx];
        if (currentItem.boxClicked === false) {
                 game.board[boxIdx].value = mark;
                 currentItem.boxClicked = true;
                 if (wonGame(mark))  {
                    winner.innerHTML = "Game Over! Got a Winner!";
                }
                 changeTurn();
             }
          }

function wonGame (mark) {
    const marks = mark.repeat(3);
    for (let row of game.winningLine) {
        let rowMarks = "";
        for (let index of row) {
            rowMarks += game.board[index].value;
        }
        if (rowMarks ===marks) return row;
    }
    return false;
}

//------

gameBoard.addEventListener('click', function({target}) {
    if (!game.started && !game.gameOver) {
        if (target.className ==='box') {
            let boxIdx = target.dataset.index;
            playersTurn(boxIdx)
            render();
            renderPlayer();
        }
    }
});

  function startBtn() {
     let name1 = document.querySelector("#player1").value;
     let name2 = document.querySelector("#player2").value;
    game.players = [name1, name2];
    renderPlayer();
  }

  function resetBtn() {
      game.board = [];
        game.players = ['', ''];
        game.currentPlayerIdx = 0;
        game.getCurrentPlayer  = () => game.players[game.currentPlayerIdx];
        winner.innerHTML = " "
        setGame ();
        render();
        renderPlayer();
  }

setGame ()
 render()
 renderPlayer()





