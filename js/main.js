import { pickCard, pickCastle, cardBoard, castleBoard, hideCards, overlay, closeCard, closeCastle, gameBoard, selectedDOM, playerSetup, gameScreen, playerTurn, playerRoundScore, totalScore } from "./DOMs.js";
import { cards, shuffleCards } from "./cards.js";
import { renderBoard, renderCards, initializeBoard } from "./init.js";
import { select_Card, place_Card, select_Castle, calculateScores } from "./gamelogic.js";
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

    renderBoard(gameBoard, rows, cols);
    shuffleCards(c_board, c_rows, c_cols);
    renderCards(cardBoard, c_rows, c_cols, closeCard);
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
    playerRoundScore.innerText =`Score: ${players[0].score}`

    // Start the game loop
    startGameLoop(gameState);
}

// Modify game loop

function startGameLoop(gameState) {
    let round = 1; // Track the current round

    const interval = setInterval(() => {
        if (checkBoardFilled(gameState.board)) {
            clearInterval(interval); // Clear interval to avoid multiple calls to `endRound`

            if (round > 3) {
                endGame(gameState);
            } else {
                endRound(gameState, () => {
                    // Advance to the next round
                    round += 1;

                    // Reset the board for the next round
                    resetBoard(gameState);

                    // Update the round display
                    document.getElementById("round").innerText = `Round: ${round}`;

                    // Restart the loop for the next round
                    startGameLoop(gameState);
                });
            }
        }
    }, 1000);
}

    

function checkBoardFilled(board) {
    return board.every(row => row.every(cell => cell !== null));
}


function endRound(gameState, onNextRound) {
    calculateScores(gameState);

    const { players } = gameState;
    let roundScores = players.map(player => `${player.name}: ${player.score}`).join('\n');

    // Display the scores in an alert
    setTimeout(() => {
        alert(`Round Over! Scores:\n${roundScores}`);

        // Update total scores for each player
        players.forEach(player => {
            player.totalscore = (player.totalscore || 0) + player.score;
            player.score = 0; // Reset round score for the next round
        });

        // Call the callback to proceed to the next round
        if (onNextRound) onNextRound();
    }, 100); // Add a slight delay to ensure the alert works correctly
}

function resetBoard(gameState) {
    // Clear the board
    gameState.board.forEach(row => row.fill(null));

    // Re-render the board (if necessary)
    renderBoard(gameBoard, gameState.board.length, gameState.board[0].length);

     // Update the total scores and round score displays
     const totalScores = gameState.players.map(player => `${player.name}: ${player.totalscore}`).join('<br>');
     totalScore.innerHTML = `Total Scores:<br>${totalScores}`;
 
     const currentPlayer = gameState.players[gameState.currentPlayerIndex];
     playerRoundScore.innerText = `Score: ${currentPlayer.score}`;

}

function endGame(gameState) {
    calculateScores(gameState);

    const { players } = gameState;
    const winner = players.reduce((max, player) =>
        player.totalscore > max.totalscore ? player : max, players[0]);

    alert(`Game Over! The winner is ${winner.name} with ${winner.totalscore} points.`);
}





























