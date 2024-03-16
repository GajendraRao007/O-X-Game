document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll("[id^='row']");
    const restartBtn = document.getElementById("restart-btn");
    let currentPlayer = "X";
    let userScore = 0;
    let compScore = 0;
    let userMoves = [];
    let compMoves = [];

    // Function to check if there's a winner
    function checkWinner(playerMoves) {
        const winningConditions = [
            ["row1", "row2", "row3"],
            ["row-one", "row-two", "row-three"],
            ["row1", "row-two-1", "row-three-1"],
            ["row2", "row-two-2", "row-three-2"],
            ["row3", "row-two-3", "row-three-3"],
            ["row1", "row-two-2", "row-three-3"],
            ["row3", "row-two-2", "row-three-1"],
            ["row-one", "row2", "row-three-3"],
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (playerMoves.includes(a) && playerMoves.includes(b) && playerMoves.includes(c)) {
                return true;
            }
        }
        return false;
    }

    // Function to handle cell click
    function cellClick(event) {
        if (event.target.innerText === "") {
            event.target.innerText = currentPlayer;
            event.target.style.fontSize = "80px";
            event.target.style.textAlign = "center";
            event.target.style.display = 'flex';
            event.target.style.justifyContent = 'center';
            event.target.style.alignItems = 'center';
            event.target.style.color = 'white';
            // Pushing the move into the respective player's moves array
            if (currentPlayer === "X") {
                userMoves.push(event.target.id);
            } else {
                compMoves.push(event.target.id);
            }
            if (checkWinner(currentPlayer === "X" ? userMoves : compMoves)) {
                if (currentPlayer === "X") {
                    userScore++;
                    document.getElementById("userscore").innerText = userScore;
                } else {
                    compScore++;
                    document.getElementById("compscore").innerText = compScore;
                }
                alert(currentPlayer + " wins!");
                resetBoard();
            } else if (isBoardFull()) {
                alert("It's a draw!");
                resetBoard();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (currentPlayer === "O") {
                    setTimeout(computerMove, 500); // Delay for the computer move
                }
            }
        }
    }

    // Function to handle computer's move
    function computerMove() {
        // Generate a random index to choose a cell
        const index = Math.floor(Math.random() * cells.length);
        const cell = cells[index];
        if (cell.innerText === "") {
            cell.innerText = currentPlayer;
            cell.style.fontSize = "80px";
            cell.style.textAlign = "center";
            cell.style.display = 'flex';
            cell.style.justifyContent = 'center';
            cell.style.alignItems = 'center';
            cell.style.color = 'white';
            // Pushing the move into the computer's moves array
            compMoves.push(cell.id);
            if (checkWinner(currentPlayer === "X" ? userMoves : compMoves)) {
                if (currentPlayer === "X") {
                    userScore++;
                    document.getElementById("userscore").innerText = userScore;
                } else {
                    compScore++;
                    document.getElementById("compscore").innerText = compScore;
                }
                alert(currentPlayer + " wins!");
                resetBoard();
            } else if (isBoardFull()) {
                alert("It's a draw!");
                resetBoard();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        } else {
            computerMove(); // If the chosen cell is not empty, try again
        }
    }

    // Function to check if the board is full
    function isBoardFull() {
        for (let cell of cells) {
            if (cell.innerText === "") {
                return false;
            }
        }
        return true;
    }

    // Function to reset the board
    function resetBoard() {
        for (let cell of cells) {
            cell.innerText = "";
        }
        currentPlayer = "X";
        userMoves = [];
        compMoves = [];
    }

    // Event listeners
    for (let cell of cells) {
        cell.addEventListener("click", cellClick);
    }

    restartBtn.addEventListener("click", resetBoard);
});
