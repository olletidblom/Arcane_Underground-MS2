import  {pickCard, pickCastle, cardBoard, castleBoard, hideCards, overlay, closeCard, closeCastle, gameBoard, selectedDOM} from "./DOMs.js";
import { cards, shuffleCards } from "./cards.js";
import { renderBoard, renderCards } from "./render.js";
import { select_Card, place_Card } from "./gamelogic.js";
import { showCards, closeCards, showCastles, closeCastles } from "./events.js";


const rows = 5;
const cols = 6;
const board = [];

const c_rows = 5;
const c_cols = 5;
const c_board = [];
let selectedCard = null;

const gameState = {
    selectedCard: null,
};

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






renderBoard(gameBoard, rows, cols);
shuffleCards(c_board, c_rows, c_cols);
renderCards(cardBoard, c_rows, c_cols, closeCard);
showCards(pickCard, cardBoard, overlay)
showCastles(pickCastle, castleBoard, overlay)
closeCards(closeCard, cardBoard, overlay)
closeCastles(closeCastle, castleBoard, overlay)
select_Card(gameState,c_board, selectedDOM, cardBoard, overlay)
place_Card(gameState, board, selectedDOM, c_board)















