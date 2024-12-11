import { calculateScores } from "./gamelogic.js";

// Helper: Get a random card from the board
function getRandomCard(c_board, condition = () => true) {
  const availableCards = [];

  // Collect all available cards
  for (let row = 0; row < c_board.length; row++) {
    for (let col = 0; col < c_board[row].length; col++) {
      const card = c_board[row][col];
      const cardTile = document.querySelector(`.c-tiles[data-row="${row}"][data-col="${col}"]`);

      // Exclude cards that are hidden
      if (
        card &&
        condition(card) &&
        cardTile &&
        cardTile.style.display !== "none" && // Ensure card is not hidden
        cardTile.style.visibility !== "hidden"
      ) {
        availableCards.push({ card, row, col });
      }
    }
  }

  // Pick a random card that matches the condition
  if (availableCards.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    return availableCards[randomIndex];
  }
  return null; // No matching cards available
}


// Helper: Calculate scores for rows and columns
function calculateSegmentScores(board) {
  const scores = { rows: [], cols: [] };

  for (let row = 0; row < board.length; row++) {
    scores.rows[row] = board[row].reduce(
      (sum, cell) => (cell?.value ?? 0) + sum,
      0,
    );
  }

  for (let col = 0; col < board[0].length; col++) {
    scores.cols[col] = board.map((row) => row[col]).reduce((sum, cell) => (cell?.value ?? 0) + sum, 0);
  }

  return scores;
}

// Helper: Check if a cell is valid and empty
function isValidEmptyCell(row, col, board) {
  const cell = board[row][col];
  return (
    !cell || (!cell.castleOwner && cell.value === undefined && !cell.effect)
  );
}

// Helper: Find all valid empty tiles
function findValidEmptyTiles(board) {
  const emptyTiles = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (isValidEmptyCell(row, col, board)) {
        emptyTiles.push({ row, col });
      }
    }
  }
  return emptyTiles;
}


export function performBotTurn(gameState, c_board, board) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  document.getElementById("player-round-score").innerText =
    `Score:${gameState.players[gameState.currentPlayerIndex].score}'`;

 

  // Analyze the board and find priorities
  const segmentScores = calculateSegmentScores(board);
  const { rows, cols } = segmentScores;
  const maxRowScore = Math.max(...rows);
  const maxColScore = Math.max(...cols);
  const isRowPriority = maxRowScore >= maxColScore;
  const bestSegmentIndex = isRowPriority ? rows.indexOf(maxRowScore) : cols.indexOf(maxColScore);
  const availableCastles = currentPlayer.castles.filter( (castle) => castle.amount > 0,);
  if (availableCastles.length > 0) {
    // Sort castles by multiplier, preferring lower-multiplier castles
    const castleToPlace = availableCastles.sort((a, b) => a.multi - b.multi)[0];

    // Only place castles in rows/columns with scores above a threshold
    const highValueThreshold = Math.max(10, 5 * (4 - gameState.round)); // Scale threshold by round
    const highestSegmentScore = isRowPriority ? maxRowScore : maxColScore;

    if (highestSegmentScore >= highValueThreshold) {
      const validTiles = findValidEmptyTiles(board).filter(
        (tile) =>
          isValidEmptyCell(tile.row, tile.col, board) && (isRowPriority ? tile.row === bestSegmentIndex : tile.col === bestSegmentIndex),
      );

      if (validTiles.length > 0) {
        const target = validTiles[Math.floor(Math.random() * validTiles.length)];
        const { row: targetRow, col: targetCol } = target;

        board[targetRow][targetCol] = {
          ...castleToPlace,
          castleOwner: currentPlayer.name,
        };
        castleToPlace.amount -= 1;

        const boardTile = document.querySelector(
          `.b-tiles[data-row="${targetRow}"][data-col="${targetCol}"]`,
        );
        if (boardTile)
          boardTile.style.backgroundImage = `url(${castleToPlace.image})`;

      
        gameState.selected = null; // Clear selection
        return;
      }
    }
  }

  // Step 2: Pick a random card
  const randomCardData = getRandomCard(c_board);
  if (randomCardData) {
    const { card, row, col } = randomCardData;
    gameState.selected = card;
    c_board[row][col] = null; // Remove the card from the card board

    const cardTile = document.querySelector(
      `.c-tiles[data-row="${row}"][data-col="${col}"]`,
    );
    if (cardTile) cardTile.style.visibility = "hidden";

 

    // Step 3: Use the card placement logic
    if (card.value < 0 || card.effect === "dragon") {
      // Get valid empty tiles excluding castles
      const validEmptyTiles = findValidEmptyTiles(board).filter(
        (tile) => !board[tile.row][tile.col]?.castleOwner, // Exclude castle-occupied spaces
      );

      // Determine the target based on opponent castle rows/columns
      const target =
        validEmptyTiles.find((tile) => {
          // Check if the tile is in the same row or column as an opponent castle
          const sameRowAsCastle = board[tile.row].some(
            (cell) =>
              cell?.castleOwner && cell.castleOwner !== currentPlayer.name,
          );
          const sameColAsCastle = board.some(
            (row) =>
              row[tile.col]?.castleOwner &&
              row[tile.col].castleOwner !== currentPlayer.name,
          );

          return sameRowAsCastle || sameColAsCastle;
        }) ||
        validEmptyTiles.find((tile) =>
          isRowPriority ? tile.row === bestSegmentIndex : tile.col === bestSegmentIndex,
        ) ||
        validEmptyTiles[Math.floor(Math.random() * validEmptyTiles.length)]; // Fallback to any valid tile

      if (target) {
        const { row: targetRow, col: targetCol } = target;

        board[targetRow][targetCol] = { ...gameState.selected };

        const boardTile = document.querySelector(`.b-tiles[data-row="${targetRow}"][data-col="${targetCol}"]`,
        );
        if (boardTile)
          boardTile.style.backgroundImage = `url(${gameState.selected.image})`;

     
        calculateScores(gameState);
        gameState.selected = null; // Clear selection
        return;
      }
    } else {
      // Place positive cards in high-scoring areas
      const validTiles = findValidEmptyTiles(board).filter(
        (tile) => !board[tile.row][tile.col]?.castleOwner, // Exclude castle-occupied spaces
      );

      const target =
        validTiles.find((tile) =>
          isRowPriority ? tile.row === bestSegmentIndex  : tile.col === bestSegmentIndex,
        ) || validTiles[Math.floor(Math.random() * validTiles.length)]; // Fallback to any valid tile

      if (target) {
        const { row: targetRow, col: targetCol } = target;
        board[targetRow][targetCol] = { ...gameState.selected };

        const boardTile = document.querySelector(
          `.b-tiles[data-row="${targetRow}"][data-col="${targetCol}"]`,
        );
        if (boardTile)
          boardTile.style.backgroundImage = `url(${gameState.selected.image})`;

        

        calculateScores(gameState);
        gameState.selected = null; // Clear selection
        return;
      }
    }
  }

  // Step 4: Fallback - Place the lowest multiplier castle in the least harmful spot
  const lowestMultiCastle = currentPlayer.castles.find(
    (castle) => castle.amount > 0,
  );
  if (lowestMultiCastle) {
    const validTiles = findValidEmptyTiles(board);
    if (validTiles.length > 0) {
      const target = validTiles.reduce(
        (leastHarmTile, tile) => {
          const rowScore = rows[tile.row];
          const colScore = cols[tile.col];
          const harm = Math.abs(rowScore) + Math.abs(colScore);

          return harm < leastHarmTile.harm  ? { row: tile.row, col: tile.col, harm }  : leastHarmTile;
        },
        { row: null, col: null, harm: Infinity },
      );

      if (target.row !== null && target.col !== null) {
        board[target.row][target.col] = {
          ...lowestMultiCastle,
          castleOwner: currentPlayer.name,
        };
        lowestMultiCastle.amount -= 1;

        const boardTile = document.querySelector(
          `.b-tiles[data-row="${target.row}"][data-col="${target.col}"]`,
        );
        if (boardTile)
          boardTile.style.backgroundImage = `url(${lowestMultiCastle.image})`;

     
        calculateScores(gameState);
        gameState.selected = null; // Clear selection
        return;
      }
    }
  }

  // Final fallback: Skip turn if no valid moves
  document.getElementById("playerTurn").innerText =
    `${gameState.players[gameState.currentPlayerIndex].name}'s Turn`;

  
  gameState.selected = null; // Clear selection
}
