

export function select_Card(gameState, c_board, selectedDOM, cardBoard, overlay) {
    const cards = document.querySelectorAll(".c-tiles");
    cards.forEach(cardTile => {
        cardTile.addEventListener("click", () => {
            const row = cardTile.dataset.row;
            const col = cardTile.dataset.col;
            const selectedCard = c_board[row][col];
            if (selectedCard) {
                selectedCard.row = row;
                selectedCard.col = col;
                gameState.selectedCard = selectedCard; // Update shared state

                cardTile.style.backgroundImage = `${selectedCard.image}`;
                cardBoard.style.display = "none";
                overlay.style.display = "none"; 
                selectedDOM.style.backgroundImage = selectedCard.image;
                selectedDOM.style.visibility = "visible";
                cardTile.style.visibility = "hidden";
            } else {
                alert("Please select a Card");
            }
        });
    });
}

export function place_Card(gameState, board, selectedDOM) {
    const boardTiles = document.querySelectorAll(".b-tiles");
    boardTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const row = tile.dataset.row;
            const col = tile.dataset.col;

            if (gameState.selectedCard) {
                board[row][col] = { ...gameState.selectedCard }; // Copy selectedCard data into board
                tile.style.backgroundImage = `${gameState.selectedCard.image}`;
                selectedDOM.style.visibility = "hidden";

                const cardTile = document.querySelector(`.c-tiles[data-row="${gameState.selectedCard.row}"][data-col="${gameState.selectedCard.col}"]`);
                if (cardTile) {
                    cardTile.style.visibility = "hidden";
                   
                }

                gameState.selectedCard = null; // Clear selectedCard after placement
            } else {
                console.log("No card selected to place");
            }
        });
    });
}