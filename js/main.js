import {
  pickCard,
  pickCastle,
  cardBoard,
  castleBoard,
  overlay,
  closeCard,
  closeCastle,
  gameBoard,
  selectedDOM,
  playerSetup,
  gameScreen,
  playerTurn,
  playerRoundScore,
  totalScore,
} from "./DOMs.js";
import { cards, shuffleCards } from "./cards.js";
import { renderBoard, renderCards, initializeBoard } from "./init.js";
import {
  select_Card,
  place_Card,
  select_Castle,
  calculateScores,
} from "./gamelogic.js";
import { showCards, closeCards, showCastles, closeCastles } from "./events.js";
import { setupStartScreen } from "./startscreen.js";
import { render_Castles } from "./castles.js";
import { preloadImages, imageUrls } from "./onload.js";
import { performBotTurn } from "./bot.js";

window.addEventListener("load", () => preloadImages(imageUrls));
setupStartScreen(startGame);
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

  showCards(pickCard, cardBoard, overlay);
  showCastles(pickCastle, castleBoard, overlay, gameState, selectedDOM);
  closeCards(closeCard, cardBoard, overlay);
  closeCastles(closeCastle, castleBoard, overlay);
  select_Card(gameState, c_board, selectedDOM, cardBoard, overlay);
  render_Castles(gameState, castleBoard, overlay);
  select_Castle(gameState, castleBoard, overlay);
  place_Card(gameState, board, selectedDOM);
  calculateScores(gameState);

  playerTurn.innerText = `${players[0].name}'s Turn`;
  playerRoundScore.innerText = `Score: ${players[0].score}`;
  const totalScores = gameState.players
    .map((player) => `${player.name}: ${player.totalscore}`)
    .join("<br>");
  totalScore.innerHTML = `Total Scores:<br>${totalScores}`;

  // Start the game loop

  startGameLoop(
    gameState,
    c_board,
    cardBoard,
    closeCard,
    c_rows,
    c_cols,
    cards,
    rows,
    cols,
    board,
  );
}

// Modify game loop

function startGameLoop(
  gameState,
  c_board,
  cardBoard,
  closeCard,
  c_rows,
  c_cols,
  cards,
  rows,
  cols,
  board,
) {
  const interval = setInterval(() => {
    if (checkBoardFilled(gameState.board)) {
      clearInterval(interval);

      if (gameState.round > 3) {
        endGame(gameState);
      } else {
        endRound(gameState, () => {
          gameState.round += 1;
          resetBoard(
            gameState,
            c_board,
            cardBoard,
            closeCard,
            c_rows,
            c_cols,
            cards,
            rows,
            cols,
            board,
          );
          document.getElementById("round").innerText =
            `Round: ${gameState.round}`;
          startGameLoop(
            gameState,
            c_board,
            cardBoard,
            closeCard,
            c_rows,
            c_cols,
            cards,
            rows,
            cols,
            board,
          );
        });
      }
    } else {
      const currentPlayer = gameState.players[gameState.currentPlayerIndex];

      if (currentPlayer.isBot) {
        performBotTurn(gameState, c_board, board, selectedDOM); // Execute bot logic
        gameState.currentPlayerIndex =
          (gameState.currentPlayerIndex + 1) % gameState.players.length;
      }

      document.getElementById("player-round-score").innerText =
        `Score: ${gameState.players[gameState.currentPlayerIndex].score}`;
      document.getElementById("playerTurn").innerText =
        `${gameState.players[gameState.currentPlayerIndex].name}'s Turn`;
    }
  }, 1000); // Adjust interval for pacing
}

function checkBoardFilled(board) {
  return board.every((row) => row.every((cell) => cell !== null));
}

function endRound(gameState, onNextRound) {
  calculateScores(gameState);

  const { players } = gameState;
  const roundScores = players
    .map((player) => `${player.name}: ${player.score}`)
    .join("\n");

  // Display the scores
  setTimeout(() => {
    alert(`Round Over! Scores:\n${roundScores}`);

    // Update total scores for each player and reset round scores
    players.forEach((player) => {
      player.totalscore = (player.totalscore || 0) + player.score;
      player.score = 0; // Reset score for the next round
    });
    // Trigger the next round
    if (onNextRound) onNextRound();
  }, 100); // Slight delay to ensure alert works correctly
}

function resetBoard(
  gameState,
  c_board,
  cardBoard,
  closeCard,
  c_rows,
  c_cols,
  cards,
  rows,
  cols,
  board,
) {
  // Reset the game board
  gameState.board.forEach((row) => row.fill(null));

  // Reset castles and cards
  gameState.players.forEach((player) => {
    player.castles[0].amount = 4;
  });

  // Clear and reinitialize the boards
  cardBoard.innerHTML = "";
  gameBoard.innerHTML = "";
  castleBoard.innerHTML = "";

  renderBoard(gameBoard, rows, cols);
  renderCards(cardBoard, c_rows, c_cols);
  shuffleCards(cards, c_board, c_rows, c_cols);

  // Update the display
  const totalScores = gameState.players
    .map((player) => `${player.name}: ${player.totalscore}`)
    .join("<br>");
  totalScore.innerHTML = `Total Scores:<br>${totalScores}`;

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  playerRoundScore.innerText = `Score: ${currentPlayer.score}`;

  showCards(pickCard, cardBoard, overlay);
  showCastles(pickCastle, castleBoard, overlay, gameState, selectedDOM);
  closeCards(closeCard, cardBoard, overlay);
  closeCastles(closeCastle, castleBoard, overlay);
  select_Card(gameState, c_board, selectedDOM, cardBoard, overlay);
  render_Castles(gameState, castleBoard, overlay);
  select_Castle(gameState, castleBoard, overlay);
  place_Card(gameState, board, selectedDOM);
  calculateScores(gameState);
}

function endGame(gameState) {
  calculateScores(gameState);

  const { players } = gameState;
  const winner = players.reduce(
    (max, player) => (player.totalscore > max.totalscore ? player : max),
    players[0],
  );

  alert(
    `Game Over! The winner is ${winner.name} with ${winner.totalscore} points.`,
  );
}
