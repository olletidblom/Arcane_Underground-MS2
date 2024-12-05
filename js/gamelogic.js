


export function select_Castle(gameState, castleBoard, overlay, selectedDOM) {
    const castleTiles = castleBoard.querySelectorAll(".c-tiles");
    castleTiles.forEach(castleTile => {
        castleTile.addEventListener("click", () => {
            const index = castleTile.dataset.index;
            const currentPlayer = gameState.players[gameState.currentPlayerIndex];
            const selectedCastle = currentPlayer.castles[index];
            
                gameState.selected = selectedCastle;
                selectedDOM.style.backgroundImage = `url(${selectedCastle.image})`;
                selectedDOM.style.visibility = "visible";

            // Decrease the castle amount
            selectedCastle.amount -= 1;
            console.log(`Castle selected: ${selectedCastle.image}, Remaining: ${selectedCastle.amount}`);
            // Hide the castle modal
            overlay.style.display = "none";
            castleBoard.style.display = "none";
                 
        });
    });
}




// Select cards funcition
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
                gameState.selected = selectedCard; // Update shared state

                cardTile.style.backgroundImage = `${selectedCard.image}`;
                cardBoard.style.display = "none";
                overlay.style.display = "none";

                selectedDOM.style.backgroundImage = `url(${selectedCard.image})`;
                selectedDOM.style.visibility = "visible";
                cardTile.style.visibility = "hidden";
            } else {
                alert("Please select a Card");
            }
        });
    });
}

// Place selected card on board function
export function place_Card(gameState, board, selectedDOM) {
    const boardTiles = document.querySelectorAll(".b-tiles");
    boardTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const row = tile.dataset.row;
            const col = tile.dataset.col;

            if (gameState.selected) {
                // Ensure the cell is empty
                if (board[row][col] !== null) {
                    alert("This spot is already taken!");
                    return;
                }

                // Place the selected item (card or castle) on the board
                board[row][col] = {
                    ...gameState.selected,
                    castleOwner: gameState.selected.amount !== undefined
                        ? gameState.players[gameState.currentPlayerIndex].name
                        : null
                };

                tile.style.backgroundImage = `url(${gameState.selected.image})`;
                selectedDOM.style.visibility = "hidden";

                if (gameState.selected.amount !== undefined) {
                    console.log(`${gameState.selected.amount} remaining for ${gameState.selected.image}`);
                }

                console.log(`${gameState.players[gameState.currentPlayerIndex].name} placed an item.`);
                calculateScores(gameState);

                // Clear the selected item
                gameState.selected = null;

                // Switch to the next player's turn
                gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;

                document.getElementById("playerTurn").innerText = `${gameState.players[gameState.currentPlayerIndex].name}'s Turn`;
            } else {
                alert("No item selected to place.");
            }
        });
    });
}

export function calculateScores(gameState) {
    const { board, players } = gameState;
    const rows = board.length;
    const cols = board[0].length;

    // Reset all players' scores
    players.forEach(player => (player.score = 0));

    // Calculate scores for rows
    for (let row = 0; row < rows; row++) {
        let rowScore = 0;
        let rowCastles = [];
       

        // Collect row data
        const rowCells = [];
        for (let col = 0; col < cols; col++) {
            const cell = board[row][col];
            if (cell) {
                rowCells.push(cell);
              
                if (cell.castleOwner) {
                    rowCastles.push(cell);
                }
            }
        }

    
        rowCells.forEach(cell => {
                if (cell && cell.value !== undefined) {
                    rowScore += cell.value;
                }
         });
       

        // Calculate row scores for castles
        rowCastles.forEach(castle => {
            const owner = players.find(p => p.name === castle.castleOwner);
            if (owner) owner.score += rowScore * castle.multi;
        });
    }

    // Calculate scores for columns
    for (let col = 0; col < cols; col++) {
        let colScore = 0;
        let colCastles = [];
  

        // Collect column data
        const colCells = [];
        for (let row = 0; row < rows; row++) {
            const cell = board[row][col];
            if (cell) {
                colCells.push(cell);
               
                if (cell.castleOwner) {
                    colCastles.push(cell);
                }
            }
        }

       
        // Calculate column scores for castles
        colCastles.forEach(castle => {
            const owner = players.find(p => p.name === castle.castleOwner);
            if (owner) owner.score += colScore * castle.multi;
        });
    }

    console.log("Scores calculated:", players.map(p => ({ name: p.name, score: p.score })));
}


