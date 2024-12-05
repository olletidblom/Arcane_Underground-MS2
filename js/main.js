import { pickCard, pickCastle, cardBoard, castleBoard, hideCards, overlay, closeCard, closeCastle, gameBoard, selectedDOM, playerSetup, gameScreen } from "./DOMs.js";
import { cards, shuffleCards } from "./cards.js";
import { renderBoard, renderCards, initializeBoard } from "./init.js";
import { select_Card, place_Card, select_Castle } from "./gamelogic.js";
import { showCards, closeCards, showCastles, closeCastles } from "./events.js";
import { setupStartScreen } from "./startscreen.js";
import { render_Castles } from "./castles.js";

setupStartScreen(startGame)

function startGame(players) {
    console.log("Game starting with players:", players);

    // Hide setup and display the game screen
    playerSetup.style.display = "none";
    gameScreen.style.display = "block";

    // Initialize game state
    const rows = 5;
    const cols = 6;
    const board = initializeBoard(rows, cols);

    const c_rows = 5;
    const c_cols = 5;
    const c_board = initializeBoard(c_rows, c_cols);

    const gameState = {
        players,
        board,
        c_board,
        selected: null,
        currentPlayerIndex: 0,
    };


    console.log(gameState)

    renderBoard(gameBoard, rows, cols);
    shuffleCards(c_board, c_rows, c_cols);
    renderCards(cardBoard, c_rows, c_cols, closeCard);
    showCards(pickCard, cardBoard, overlay)
    showCastles(pickCastle, castleBoard, overlay)
    closeCards(closeCard, cardBoard, overlay)
    closeCastles(closeCastle, castleBoard, overlay)
    select_Card(gameState, c_board, selectedDOM, cardBoard, overlay)
    render_Castles(gameState, castleBoard, overlay)
    select_Castle(gameState, castleBoard, overlay, selectedDOM)
    place_Card(gameState, board, selectedDOM, c_board)
    
    
}

























