document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    const board = Array(9).fill(null);

    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => board[index] === player);
        });
    }

    function isBoardFull() {
        return board.every(cell => cell !== null);
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function animateWin() {
        alert("Congratulations! You Win!");
    }

    function animateDraw() {
        alert("It's a Draw!");
    }

    function animateLose() {
        alert("Sorry, You Lose!");
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (!board[index]) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWin(currentPlayer)) {
                setTimeout(() => {
                    animateWin();
                    resetGame();
                }, 10);
            } else if (isBoardFull()) {
                setTimeout(() => {
                    animateDraw();
                    resetGame();
                }, 10);
            } else {
                switchPlayer();
            }
        }
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});
