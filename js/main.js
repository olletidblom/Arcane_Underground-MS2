import { pickCard, pickCastle, cardBoard, castleBoard, hideCards, overlay, closeCard, closeCastle, gameBoard, selectedDOM, playerSetup, gameScreen, playerTurn, playerRoundScore, totalScore } from "./DOMs.js";
import { cards, shuffleCards } from "./cards.js";
import { renderBoard, renderCards, initializeBoard } from "./init.js";
import { select_Card, place_Card, select_Castle, calculateScores } from "./gamelogic.js";
import { showCards, closeCards, showCastles, closeCastles } from "./events.js";
import { setupStartScreen } from "./startscreen.js";
import { render_Castles } from "./castles.js";
import { preloadImages, imageUrls } from "./onload.js";

window.addEventListener("load", () => preloadImages(imageUrls));
setupStartScreen(startGame)
// Preload images when the window loads



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
        round: 1, // Initialize round
    };
    

    renderBoard(gameBoard, rows, cols);
    renderCards(cardBoard, c_rows, c_cols);
    shuffleCards(cards, c_board, c_rows, c_cols);



    showCards(pickCard, cardBoard, overlay)
    showCastles(pickCastle, castleBoard, overlay, gameState, selectedDOM)
    closeCards(closeCard, cardBoard, overlay)
    closeCastles(closeCastle, castleBoard, overlay)
    select_Card(gameState, c_board, selectedDOM, cardBoard, overlay)
    render_Castles(gameState, castleBoard, overlay)
    select_Castle(gameState, castleBoard, overlay)
    place_Card(gameState, board, selectedDOM)
    calculateScores(gameState)

    
    playerTurn.innerText = `${players[0].name}'s Turn`;
    playerRoundScore.innerText = `Score: ${players[0].score}`
    const totalScores = gameState.players.map(player => `${player.name}: ${player.totalscore}`).join('<br>');
    totalScore.innerHTML = `Total Scores:<br>${totalScores}`;

    // Start the game loop

    startGameLoop(gameState, c_board, cardBoard, closeCard, c_rows, c_cols, cards, rows, cols, board);
}

// Modify game loop

function startGameLoop(gameState, c_board, cardBoard, closeCard, c_rows, c_cols, cards, rows, cols, board) {
    

    const interval = setInterval(() => {
        if (checkBoardFilled(gameState.board)) {
            clearInterval(interval); // Clear interval to avoid multiple calls to `endRound`

            if (gameState.round > 3) {
                endGame(gameState);
            } else {
                endRound(gameState, () => {
                    // Advance to the next round
                    gameState.round += 1;

                    // Reset the board for the next round
                    resetBoard(gameState, c_board, cardBoard, closeCard, c_rows, c_cols, cards, rows, cols, board);

                    // Update the round display
                    document.getElementById("round").innerText = `Round: ${gameState.round}`;

                    // Restart the loop for the next round
                    startGameLoop(gameState, c_board, cardBoard, closeCard, c_rows, c_cols, cards, rows, cols, board );
                });
            }
        }
    }, 1000);
}
/*
function startGameLoop(gameState, c_board, cardBoard, gameBoard, castleBoard, c_rows, c_cols, cards, rows, cols) {
    const interval = setInterval(() => {
        if (checkBoardFilled(gameState.board)) {
            clearInterval(interval); // Stop the loop

            if (gameState.round >= 3) {
                endGame(gameState);
            } else {
                endRound(gameState, () => {
                    gameState.round++; // Increment the round

                    // Reset the board for the next round
                    resetBoard(gameState, c_board, cardBoard, gameBoard, castleBoard, rows, cols, c_rows, c_cols, cards);

                    // Update the round display
                    document.getElementById("round").innerText = `Round: ${gameState.round}`;

                    // Start the loop again
                    startGameLoop(gameState, c_board, cardBoard, gameBoard, castleBoard, c_rows, c_cols, cards, rows, cols);
                });
            }
        }
    }, 1000);
}
*/


function checkBoardFilled(board) {
    return board.every(row => row.every(cell => cell !== null));
}


function endRound(gameState, onNextRound) {
    calculateScores(gameState);

    const { players } = gameState;
    const roundScores = players.map(player => `${player.name}: ${player.score}`).join('\n');

    // Display the scores
    setTimeout(() => {
        alert(`Round Over! Scores:\n${roundScores}`);

        // Update total scores for each player and reset round scores
        players.forEach(player => {
            player.totalscore = (player.totalscore || 0) + player.score;
            player.score = 0; // Reset score for the next round
        });

        // Trigger the next round
        if (onNextRound) onNextRound();
    }, 100); // Slight delay to ensure alert works correctly
}

function resetBoard(gameState, c_board, cardBoard, closeCard, c_rows, c_cols, cards, rows, cols, board) {
    // Reset the game board
    gameState.board.forEach(row => row.fill(null));

    // Reset castles and cards
    gameState.players.forEach(player => {
        player.castles[0].amount = 4
    });

    // Clear and reinitialize the boards
    cardBoard.innerHTML = "";
    gameBoard.innerHTML = "";
    castleBoard.innerHTML = "";

    renderBoard(gameBoard, rows, cols);
    renderCards(cardBoard, c_rows, c_cols);
    shuffleCards(cards, c_board, c_rows, c_cols);



    // Update the display
    const totalScores = gameState.players.map(player => `${player.name}: ${player.totalscore}`).join('<br>');
    totalScore.innerHTML = `Total Scores:<br>${totalScores}`;

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    playerRoundScore.innerText = `Score: ${currentPlayer.score}`;

    showCards(pickCard, cardBoard, overlay)
    showCastles(pickCastle, castleBoard, overlay, gameState, selectedDOM)
    closeCards(closeCard, cardBoard, overlay)
    closeCastles(closeCastle, castleBoard, overlay)
    select_Card(gameState, c_board, selectedDOM, cardBoard, overlay)
    render_Castles(gameState, castleBoard, overlay)
    select_Castle(gameState, castleBoard, overlay)
    place_Card(gameState, board, selectedDOM)
    calculateScores(gameState)
}



function endGame(gameState) {
    calculateScores(gameState);

    const { players } = gameState;
    const winner = players.reduce((max, player) =>
        player.totalscore > max.totalscore ? player : max, players[0]);

    alert(`Game Over! The winner is ${winner.name} with ${winner.totalscore} points.`);
}





























