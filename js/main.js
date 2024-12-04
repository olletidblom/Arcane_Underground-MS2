let pickcard = document.getElementById("pickcard");
let cardboard = document.getElementById("cardboard")
let hidecards = document.getElementById("hidecards")
let overlay = document.getElementById("overlay")


const rows = 5;
const cols = 6;
const board = [];


for (let row = 0; row < rows; row++) {
    board[row] = []
    for (let col = 0; col < cols; col++) {
        board[row][col] = null;
    }
}


pickcard.addEventListener("click", () => {
    overlay.style.display = "block"; // Visa overlay
    cardboard.style.display = "grid"; 
    hidecards.style.display = "inline"; 
    
});











