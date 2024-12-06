import { closeCastle } from "./DOMs.js";

// Generate Castles
const generateCastles = (color) => {
    return {
        castles: {
            castle1: { image: `assets/images/castles/${color}1.png`, multi: 1, amount: 4 },
            castle2: { image: `assets/images/castles/${color}2.png`, multi: 2, amount: 3 },
            castle3: { image: `assets/images/castles/${color}3.png`, multi: 3, amount: 2 },
            castle4: { image: `assets/images/castles/${color}4.png`, multi: 4, amount: 1 },
        },
        chosenBy: null
    };
};

// Add Castles to players
export const castles = {
    blue: generateCastles("blue"),
    red: generateCastles("red"),
    green: generateCastles("green"),
    yellow: generateCastles("yellow"),
};


/*export function render_Castles(gameState, castleBoard) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    let playerCastles = currentPlayer.castles; // Get castles for current player

    // Clear the castle board before rendering new data
    castleBoard.innerHTML = "";

    // Dynamically render castles based on the current player's data
    playerCastles.forEach((castle, index) => {
        if (castle.amount > 0) { // Only render castles with remaining amount
            const castleTile = document.createElement("div");
            castleTile.classList.add("c-tiles");
            castleTile.style.backgroundImage = `url(${castle.image})`;
            castleTile.style.backgroundSize = "cover";
            castleTile.dataset.index = index;

            // Add to the castle board
            castleBoard.appendChild(castleTile);
        }
        castleBoard.appendChild(closeCastle)
    });


}*/
export function render_Castles(gameState, castleBoard) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    let playerCastles = currentPlayer.castles; // Get castles for current player

    // Clear the castle board before rendering new data
    castleBoard.innerHTML = "";

    // Dynamically render castles based on the current player's data
    playerCastles.forEach((castle, index) => {
        if (castle.amount >= 0) { // Only render castles with remaining amount
            const castleTile = document.createElement("div");
            castleTile.classList.add("c-tiles");
            castleTile.style.backgroundImage = `url(${castle.image})`;
            castleTile.style.backgroundSize = "cover";
            castleTile.dataset.index = index;

            // Add a label to show how many are left
            const castleCount = document.createElement("span");
            castleCount.classList.add("castle-count");
            castleCount.textContent = `x${castle.amount}`;
            castleTile.appendChild(castleCount); // Add count label to the castle tile

            // Add to the castle board
            castleBoard.appendChild(castleTile);
        }
    });

    // Append close button or functionality (assuming it's a DOM element)
    castleBoard.appendChild(closeCastle);
}