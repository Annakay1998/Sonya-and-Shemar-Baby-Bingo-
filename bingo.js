import gifts from "./gifts.js";


// Shuffle gifts
function shuffle(array){

    return array.sort(() => Math.random() - 0.5);

}



// Get saved guest card
function getSavedCard(){

    const guestID = localStorage.getItem("guestID");

    const storageKey = `bingoCard-${guestID}`;

    const savedCard = localStorage.getItem(storageKey);


    if(savedCard){

        return JSON.parse(savedCard);

    }


    const newCard = generateBingoCard();


    localStorage.setItem(
        storageKey,
        JSON.stringify(newCard)
    );


    return newCard;

}



// Create Bingo card
function generateBingoCard(){


    const selectedGifts = shuffle([...gifts]).slice(0,24);


    return [

        ...selectedGifts.slice(0,12),

        "🧸",

        ...selectedGifts.slice(12)

    ];

}



// Display card
function displayCard(){


    const card = getSavedCard();


    const board = document.getElementById("bingo-board");


    board.innerHTML = "";



    card.forEach((gift,index)=>{


        const cell = document.createElement("div");


        cell.className="cell";


        cell.textContent=gift;



        // Free center space
        if(index===12){

            cell.classList.add("center");
            cell.classList.add("marked");

        }



        cell.onclick=()=>{


            if(index!==12){

                cell.classList.toggle("marked");

            }


            checkBingo();

        };



        board.appendChild(cell);


    });



    // Show card number

    document.getElementById("cardID").textContent =
    "Card #" + Math.floor(100000 + Math.random()*900000);



}



// Start game

displayCard();
