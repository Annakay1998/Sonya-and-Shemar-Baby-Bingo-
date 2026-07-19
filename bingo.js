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
  if (gift !== "FREE") {
    cell.classList.toggle("marked");
  }

  checkForBingo();
};

    board.appendChild(cell);
  });
}

function checkForBingo() {
  const cells = [...document.querySelectorAll(".cell")];

  const wins = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],

    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],

    [0,6,12,18,24],
    [4,8,12,16,20]
  ];

  const bingo = wins.some(pattern =>
    pattern.every(index =>
      cells[index].classList.contains("marked") ||
      cells[index].classList.contains("center")
    )
  );

  if (bingo) {
    alert("🎉 BINGO! Congratulations! 🎉");
  }
}

displayCard();
