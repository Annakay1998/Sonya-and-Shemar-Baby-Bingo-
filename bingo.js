import gifts from "./gifts.js";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getSavedCard() {
  const guestID = localStorage.getItem("guestID");
  const storageKey = `bingoCard-${guestID}`;

  const savedCard = localStorage.getItem(storageKey);

  if (savedCard) {
    return JSON.parse(savedCard);
  }

  const newCard = generateBingoCard();
  localStorage.setItem(storageKey, JSON.stringify(newCard));

  return newCard;
}

function generateBingoCard() {
  const selectedGifts = shuffle([...gifts]).slice(0, 24);

  return [
    ...selectedGifts.slice(0, 12),
    "FREE",
    ...selectedGifts.slice(12)
  ];
}

function displayCard() {
  const card = getSavedCard();
  const board = document.getElementById("bingo-board");

  board.innerHTML = "";

  card.forEach((gift) => {
    const cell = document.createElement("div");

    cell.className = "cell";
    cell.textContent = gift;

    if (gift === "FREE") {
      cell.classList.add("center");
      cell.classList.add("marked");
    }

    cell.onclick = () => {
      cell.classList.toggle("marked");
    };

    board.appendChild(cell);
  });
}

displayCard();
