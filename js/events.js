import { render_Castles } from "./castles.js";
import { selectedDOM } from "./DOMs.js";
import { select_Castle } from "./gamelogic.js";

// Show cards button
export function showCards(pickCard, cardBoard, overlay) {
    pickCard.addEventListener("click", () => {
        cardBoard.style.display = "grid";
        overlay.style.display = "inline";

    })
};
// Show castles button
export function showCastles(pickCastle, castleBoard, overlay, gameState, selectedDOM) {
    pickCastle.addEventListener("click", () => {
        render_Castles(gameState, castleBoard);
        castleBoard.style.display = "grid";
        overlay.style.display = "inline"
        select_Castle(gameState, castleBoard, overlay, selectedDOM)

    })
    
};
// Close cards button
export function closeCards(closeCard, cardBoard, overlay) {
    closeCard.addEventListener("click", () => {
        cardBoard.style.display = "none";
        overlay.style.display = "none"

    })
};

// Close castles button
export function closeCastles(closeCastle, castleBoard, overlay) {
    closeCastle.addEventListener("click", () => {
        castleBoard.style.display = "none";
        overlay.style.display = "none"
    })
};
