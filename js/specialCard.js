
// Dragon effect
export function applyDragonEffect(cells) {
  let modifiedScore = 0;

  cells.forEach((cell) => {
    if (cell && cell.value !== undefined) {
      if (cell.value > 0) {
        // Ignore positive values (turn them to 0 for scoring)
        modifiedScore += 0;
      } else if (cell.value < 0) {
        // Keep negative values
        modifiedScore += cell.value;
      }
    }
  });

  return modifiedScore;
}
// Goldmine effect
export function applyGoldmineEffect(cells) {
  let modifiedScore = 0;

  cells.forEach((cell) => {
    if (cell && cell.value !== undefined) {
      // Double both positive and negative values
      modifiedScore += cell.value * 2;
    }
  });

  return modifiedScore;
}
// Mountain effect
export function applyMountainEffect(cells) {
  const segments = [];
  let currentSegment = [];

  // Split the row/column into segments divided by mountains
  cells.forEach((cell) => {
    if (cell && cell.effect === "mountain") {
      // End the current segment when a mountain is found
      if (currentSegment.length > 0) {
        segments.push(currentSegment);
        currentSegment = [];
      }
    } else {
      currentSegment.push(cell);
    }
  });

  // Add the last segment if it exists
  if (currentSegment.length > 0) {
    segments.push(currentSegment);
  }

  return segments;
}
