import gifts from "./gifts.js";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateBingoCard() {
  const selectedGifts = shuffle([...gifts]).slice(0, 24);

  const card = [
    ...selectedGifts.slice(0, 12),
    "FREE",
    ...selectedGifts.slice(12)
  ];

  return card;
}

function displayCard() {
  const card = generateBingoCard();
  const board = document.getElementById("bingo-board");

  board.innerHTML = "";

  card.forEach((gift, index) => {
    const cell = document.createElement("div");

    cell.className = "cell";

    if (gift === "FREE") {
      cell.classList.add("center");
    }

    cell.textContent = gift;

    cell.onclick = () => {
      cell.classList.toggle("marked");
    };

    board.appendChild(cell);
  });
}

displayCard();
