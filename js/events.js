
export function showCards(pickCard, cardBoard, overlay) {
    pickCard.addEventListener("click", () => {
        cardBoard.style.display = "grid";
        overlay.style.display = "inline";

    })
};

export function showCastles(pickCastle, castleBoard, overlay) {
    pickCastle.addEventListener("click", () => {
        castleBoard.style.display = "grid";
        overlay.style.display = "inline"
    })
};

export function closeCards(closeCard, cardBoard, overlay) {
    closeCard.addEventListener("click", () => {
        cardBoard.style.display = "none";
        overlay.style.display = "none"

    })
};


export function closeCastles(closeCastle, castleBoard, overlay) {
    closeCastle.addEventListener("click", () => {
        castleBoard.style.display = "none";
        overlay.style.display = "none"
    })
};
