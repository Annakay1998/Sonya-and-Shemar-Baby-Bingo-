// ===============================
// Baby Shower Bingo - Confetti
// ===============================

let bingoWon = false;

// Check for a winning Bingo
function checkBingo() {

    if (bingoWon) return;

    const cells = document.querySelectorAll(".cell");

    const board = [];

    for (let r = 0; r < 5; r++) {
        board[r] = [];
        for (let c = 0; c < 5; c++) {
            board[r][c] = cells[r * 5 + c].classList.contains("marked");
        }
    }

    // Rows
    for (let r = 0; r < 5; r++) {
        if (board[r].every(v => v)) {
            celebrate();
            return;
        }
    }

    // Columns
    for (let c = 0; c < 5; c++) {
        let win = true;
        for (let r = 0; r < 5; r++) {
            if (!board[r][c]) {
                win = false;
                break;
            }
        }
        if (win) {
            celebrate();
            return;
        }
    }

    // Diagonal \
    if (
        board[0][0] &&
        board[1][1] &&
        board[2][2] &&
        board[3][3] &&
        board[4][4]
    ) {
        celebrate();
        return;
    }

    // Diagonal /
    if (
        board[0][4] &&
        board[1][3] &&
        board[2][2] &&
        board[3][1] &&
        board[4][0]
    ) {
        celebrate();
        return;
    }
}

// Celebrate
function celebrate() {

    bingoWon = true;

    alert("🎉 BINGO! 🎉\n\nCongratulations!\nPlease show your card to the host.");

    confettiBurst();

}

// Confetti animation
function confettiBurst() {

    for (let i = 0; i < 180; i++) {

        let piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.left = Math.random() * window.innerWidth + "px";

        piece.style.animationDelay = Math.random() + "s";

        piece.style.background =
            [
                "#B08968",
                "#F5E8D7",
                "#8B5E3C",
                "#DDB892",
                "#FFF8F2"
            ][Math.floor(Math.random() * 5)];

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 4000);
    }

}
