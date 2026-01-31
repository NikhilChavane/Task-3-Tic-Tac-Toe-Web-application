let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp";

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const buttons = document.querySelectorAll(".mode-btn");

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

/* Button active state handling */
function setActiveButton(clickedBtn) {
    buttons.forEach(btn => btn.classList.remove("active"));
    if (clickedBtn) clickedBtn.classList.add("active");
}

/* Game mode */
function setMode(selectedMode, btn) {
    mode = selectedMode;
    setActiveButton(btn);
    resetGame();
}

function makeMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    cells[index].style.color = currentPlayer === "X" ? "#00ffd5" : "#caffbf";

    if (checkWin()) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;

    if (mode === "ai" && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    let available = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(v => v !== null);

    let randomIndex = available[Math.floor(Math.random() * available.length)];
    makeMove(randomIndex);
}

function checkWin() {
    return winConditions.some(condition =>
        condition.every(index => board[index] === currentPlayer)
    );
}

/* Reset game */
function resetGame(btn) {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "Player X's Turn";
    cells.forEach(cell => cell.innerText = "");

    if (btn) setActiveButton(btn);
}
