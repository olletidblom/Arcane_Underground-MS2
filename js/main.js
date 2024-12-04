import  {pickCard, pickCastle, cardBoard, castleBoard, hideCards, overlay, closeCard, closeCastle, gameBoard, selected} from "./DOMs.js";
import { cards, shuffleCards } from "./cards.js";
import { renderBoard } from "./render.js";


const rows = 5;
const cols = 6;
const board = [];

const c_rows = 5;
const c_cols = 5;
const c_board = [];
let selectedCard = null;

for (let row = 0; row < rows; row++) {
    board[row] = []
    board[row] = [];
    for (let col = 0; col < cols; col++) {
        board[row][col] = null;
    }
}

for (let row = 0; row < c_rows; row++) {
    c_board[row] = [];
    for (let col = 0; col < c_cols; col++) {
        c_board[row][col] = null;
    }
}











function setupCardSelection() {
    const cards = document.querySelectorAll(".c-tiles");
    cards.forEach(cardTile => {
        cardTile.addEventListener("click", () => {
            const row = cardTile.dataset.row;
            const col = cardTile.dataset.col;
            selectedCard = c_board[row][col]; // Set the selected card
            selectedCard.row = row; // Track row and col in selectedCard for later use
            selectedCard.col = col;

            if (selectedCard) {
                //cardTile.textContent = `${selectedCard.name} (${selectedCard.value || selectedCard.effect})`;
                cardTile.style.backgroundImage = `${selectedCard.image}`  // Show name and value/effect


                selected.style.backgroundImage = selectedCard.image;  // Show name and value/effect
                selected.style.visibility = "visible"
                console.log(`Selected card: ${selectedCard.name} with value ${selectedCard.value} url:${selectedCard.image}`);
                cardBoard.style.display = "none";
                overlay.style.display = "none";
            } else {
                console.log("No card found at this location on card board");
            }
        });

    });
}

function setupBoardPlacement() {
    const boardTiles = document.querySelectorAll(".b-tiles");

    boardTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const row = tile.dataset.row;
            const col = tile.dataset.col;

            if (selectedCard) {
                // Place the card on the board and update display
                board[row][col] = { ...selectedCard }; // Copy selectedCard data into board
                // tile.textContent = `${selectedCard.name} (${selectedCard.value || selectedCard.effect})` // Display the card's name on the tile
                tile.style.backgroundImage = `${selectedCard.image}`
                console.log(`Placed ${selectedCard.name} at (${row}, ${col}) on the game board`);
                selected.style.visibility = "hidden";

                // Hide the corresponding card tile in card-board
                const cardTile = document.querySelector(`.c-tiles[data-row="${selectedCard.row}"][data-col="${selectedCard.col}"]`);
                if (cardTile) {
                    cardTile.style.visibility = "hidden"; // Hide the card visually but keep space occupied


                    c_board[selectedCard.row][selectedCard.col] = null; // Remove it from c_board


                }

                // Clear the selected card after placement
                selectedCard = null;
            } else {
                console.log("No card selected to place");
            }
            console.log(board)
        });
    });
}


renderBoard(gameBoard, rows, cols);
shuffleCards(c_board, c_rows, c_cols);
renderCards();
setupCardSelection();
setupBoardPlacement();


pickCard.addEventListener("click", () => {
    cardBoard.style.display = "grid";
    overlay.style.display = "inline";

});

pickCastle.addEventListener("click", () => {
    castleBoard.style.display = "grid";
    overlay.style.display = "inline"
})


closeCard.addEventListener("click", () => {

    cardBoard.style.display = "none";
    overlay.style.display = "none"

});

closeCastle.addEventListener("click", () => {
    castleBoard.style.display = "none";
    overlay.style.display = "none"
});













