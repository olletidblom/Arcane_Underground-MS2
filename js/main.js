let pickcard = document.getElementById("pickcard");
let pickcastle = document.getElementById("pickcastle")
let cardboard = document.getElementById("cardboard")
let castleboard = document.getElementById("castleboard")
let hidecards = document.getElementById("hidecards")
let overlay = document.getElementById("overlay")
let closecard = document.getElementById("closecard")
let closecastle = document.getElementById("closecastle")



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
    cardboard.style.display = "grid";   
});

pickcastle.addEventListener("click", () => { 
    castleboard.style.display="grid"; 
})


closecard.addEventListener("click", () => {

        cardboard.style.display = "none"; 
 
});

closecastle.addEventListener("click", () => {
    castleboard.style.display = "none"; 
});













