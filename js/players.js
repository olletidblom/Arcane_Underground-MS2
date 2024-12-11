import { castles } from "./castles.js";

// Generate Players Based on Count
export function generatePlayers(numPlayers) {
  if (numPlayers < 2 || numPlayers > 4) {
    throw new Error("The game supports 2 to 4 players only.");
  }

  const players = [];
  for (let i = 1; i <= numPlayers; i++) {
    // Read player name and bot status from the form

    players.push({
      id: i,
      name: `Player ${i}`, // Fallback to default name if empty
      color: null,
      castles: [],
      score: 0,
      totalscore: 0,
      isBot: false, // Set the bot status
    });
  }
  return players;
}

// Assign Color to Player and Link Castles
export function assignPlayerColor(player, color) {
  if (castles[color].chosenBy) {
    throw new Error(`The color ${color} is already chosen!`);
  }

  player.color = color;
  castles[color].chosenBy = player.name; // Mark color as chosen
  player.castles = Object.values(castles[color].castles); // Assign castles to player
}

// Update Player Score
export function updatePlayerScore(player, points) {
  player.score += points;
}
