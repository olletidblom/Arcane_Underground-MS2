


export function renderBoard(gameBoard, rows, cols) {
    gameBoard.innerHTML = ""; // Clear any existing tiles
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = document.createElement("div");
            tile.classList.add("b-tiles");
            tile.dataset.row = row;
            tile.dataset.col = col;
            gameBoard.appendChild(tile);
        }
    }
    console.log("Game board rendered");
}