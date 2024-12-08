// Cards Array 
export const cards = [
    { image: "assets/images/tiles/+6_1.png", name: "Knight", value: 6 },
    { image: "assets/images/tiles/+6_2.png", name: "Knight", value: 6 },
    { image: "assets/images/tiles/+5_1.png", name: "Prince", value: 5 },
    { image: "assets/images/tiles/+5_2.png", name: "Prince", value: 5 },
    { image: "assets/images/tiles/+4_1.png", name: "Forth", value: 4 },
    { image: "assets/images/tiles/+4_2.png", name: "Forth", value: 4 },
    { image: "assets/images/tiles/+3_1.png", name: "Third", value: 3 },
    { image: "assets/images/tiles/+3_2.png", name: "Third", value: 3 },
    { image: "assets/images/tiles/+2_1.png", name: "Two", value: 2 },
    { image: "assets/images/tiles/+2_2.png", name: "Two", value: 2 },
    { image: "assets/images/tiles/+1_1.png", name: "One", value: 1 },
    { image: "assets/images/tiles/+1_2.png", name: "One", value: 1 },
    { image: "assets/images/tiles/-6.png", name: "Demon", value: -6 },
    { image: "assets/images/tiles/-5.png", name: "Orcs", value: -5 },
    { image: "assets/images/tiles/-4.png", name: "Orcs", value: -4 },
    { image: "assets/images/tiles/-3.png", name: "Wolves", value: -3 },
    { image: "assets/images/tiles/-2.png", name: "Nasty", value: -2 },
    { image: "assets/images/tiles/-1.png", name: "Poison", value: -1 },
    { image: "assets/images/tiles/dragon.png", name: "Dragon", value: null, effect: "dragon" },
    { image: "assets/images/tiles/goldmine.png", name: "Goldmine", value: null, effect: "goldmine" },
    { image: "assets/images/tiles/mountain.png", name: "Mountain", value: null, effect: "mountain" },
    { image: "assets/images/tiles/mountain.png", name: "Mountain", value: null, effect: "mountain" }
];

// Function to shuffle the cards
export function shuffleCards(cards, c_board, c_rows, c_cols) {
    let shuffledCards = [...cards]; 
    shuffledCards = shuffledCards.sort(() => Math.random() - 0.5);

    let cardIndex = 0;
    for (let row = 0; row < c_rows; row++) {
        for (let col = 0; col < c_cols; col++) {
            if (cardIndex < shuffledCards.length) {
                c_board[row][col] = shuffledCards[cardIndex];
                cardIndex++;
            } else {
                c_board[row][col] = null;
            }
        }
    }
    console.log("Cards shuffled and placed on c_board", c_board);
    
    const cardTiles = document.querySelectorAll(".c-tiles");
    cardTiles.forEach((cardTile, index) => {
        const row = Math.floor(index / c_cols);
        const col = index % c_cols;

        if (!c_board[row][col]) {
            cardTile.style.visability = "hide"; 
        }
    });
}
