var player = 'X';
state = Array(9).fill(null);
var gameEnded = false
message(`Player ${player} starts!`)

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

function handleClick(e){
    cell = e.target;
    i = cell.dataset.index;

    if (state[i] || gameEnded) {
        return;
    }

    state[i] = player;
    cell.textContent = player;
    cell.classList.add('active');
    if (player === 'X') {
        cell.classList.add('red');
    }else{
        cell.classList.add('blue');
    }

    const combo = checkWinner();
    if (combo){
        state.forEach((_, i) => {
            document.querySelector(`[data-index="${i}"]`).classList.add('active');
        });
        combo.forEach(i => {
            document.querySelector(`[data-index="${i}"]`).classList.add('winner');
        });
        console.log(`Player ${player} wins!`);
        message(`Player ${player} wins!`);
        gameEnded = true
    } else if (state.every(cell => cell)){
        console.log("It's a tie!");
        message("It's a tie!");
        gameEnded = true
    } else {
        player = player === 'X' ? 'O' : 'X';
        message(`Player ${player} is playing!`);
    }
}

function message(message){
    const msg = document.getElementById("message")
    msg.innerHTML = message
}

const resetBtn = document.getElementById('restart');
resetBtn.addEventListener('click', () => {
    state = Array(9).fill(null);
    player = 'X';
    gameEnded = false;
    message(`Player ${player} starts!`)
    createBoard();
})