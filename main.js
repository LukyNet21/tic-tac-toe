var player = 'X';
state = Array(9).fill(null);
var gameEnded = false;
var bot = false;
message(`Player ${player} starts!`);

function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    state.forEach((_, i) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
        cell.addEventListener('click', (e) => handleClick(e));
    });
}

createBoard();

function handleClick(e) {
    const index = e.target.dataset.index;
    if (state[index] || gameEnded) return;
    makeMove(index);
    if (gameEnded) return;
    if (bot && player === 'O') {
        botMove();
    }
}

function makeMove(index) {
    state[index] = player;
    const cell = document.querySelector(`[data-index='${index}']`);
    cell.textContent = player;
    cell.classList.add('active');
    cell.classList.add(player === 'X' ? 'red' : 'blue');
    const combo = checkWinner();
    checkGameEnded(combo);
    player = player === 'X' ? 'O' : 'X';
}

function botMove() {
    let move = findBestMove();
    makeMove(move);
}

function findBestMove() {
    for (let i = 0; i < state.length; i++) {
        if (state[i] === null) {
            state[i] = player;
            if (checkWinner()) {
                state[i] = null;
                return i;
            }
            state[i] = null;
        }
    }
    
    let currentPlayer = player;
    player = player === 'O' ? 'X' : 'O';
    for (let i = 0; i < state.length; i++) {
        if (state[i] === null) {
            state[i] = player;
            if (checkWinner()) {
                state[i] = null;
                player = currentPlayer;
                return i;
            }
            state[i] = null;
        }
    }
    player = currentPlayer;

    let emptyCells = state.map((val, i) => val === null ? i : null).filter(val => val !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function checkWinner() {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return wins.find(combo => {
        return combo.every(i => state[i] === player);
    });
}

function checkGameEnded(combo) {
    if (combo) {
        gameEnded = true;
        state.forEach((_, i) => {
            document.querySelector(`[data-index="${i}"]`).classList.add('active');
        });
        combo.forEach(i => {
            document.querySelector(`[data-index="${i}"]`).classList.add('winner');
        });
        message(`Player ${player} wins!`);
    } else if (state.every(cell => cell !== null)) {
        gameEnded = true;
        state.forEach((_, i) => {
            document.querySelector(`[data-index="${i}"]`).classList.add('active');
        });
        message('It\'s a draw!');
    }
}

function message(msg) {
    document.getElementById('message').textContent = msg;
}

const resetBtn = document.getElementById('restart');
resetBtn.addEventListener('click', () => {
    state = Array(9).fill(null);
    player = 'X';
    gameEnded = false;
    message(`Player ${player} starts!`)
    createBoard();
})

const botmode = document.getElementById('botmode');
botmode.addEventListener('click', () => {
    bot = botmode.checked ? true : false;
    message(`Bot mode is now ${bot ? 'enabled' : 'disabled' }`);
});