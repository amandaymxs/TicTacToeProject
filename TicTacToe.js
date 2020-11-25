const playerOne = {
    mark: 'X',
    point: 1
}
const playerTwo = {
    mark: 'O',
    point: -1
}

const board = document.querySelector(".boardContainer");
const allCells = document.querySelectorAll(".cell");
const reset = document.querySelector("#reset");
let scoreCounter = [...Array(8)].fill('0');
let counter = 0;

//////////////////////////////////////////////////////////////

board.addEventListener("mouseup", playBoard);

reset.addEventListener('click', () => {
    for (let cell in allCells) {
        allCells[cell].innerText = "";
    }
    counter = 0;
})

//////////////////////////////////////////////////////////////

function playBoard(e) {
    let player = turn();
    if (e.target.innerText == "") {
        e.target.innerText = `${player.mark}`;
        scoreCounter[e.target.id] = player.point;
        console.log(scoreCounter[e.target.id]);
        if (counter >= 4) {
            if (isGameOver()) {
                console.log(`Player ${player.mark} is the winner!`);
                toggleBoard(this.Function);
            }
        }
        counter++;
    }
}

function turn() {
    return (counter % 2 == 0 ? playerOne : playerTwo);
}

function isGameOver() {
    for (let i = 0; i < 9; i += 3) {
        let _sum = scoreCounter[0 + i] + scoreCounter[1 + i] + scoreCounter[2 + i];
        if (Math.abs(_sum) === 3) {
            return true;
        }
    }
    let sumCounter = 0;
    for (let i = 0; i < 9; i += 4) {
        sumCounter += scoreCounter[i];
        if (Math.abs(sumCounter) === 3) {
            return true;
        }
    }
    sumCounter = 0;
    for (let i = 2; i < 7; i += 2) {
        sumCounter += scoreCounter[i];
        if (Math.abs(sumCounter) === 3) {
            return true;
        }
    }
    return false;
}

function toggleBoard(boardFunction) {
    board.removeEventListener('mouseup', playBoard);
}