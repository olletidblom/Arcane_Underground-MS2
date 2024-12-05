import { generatePlayers, assignPlayerColor } from "./players.js";
import { startGameBtn, startScreen, playerSetup, playerForm, playerDetails, playButton } from "./DOMs.js";


// Setup for game
export function setupStartScreen(startGameCallback) {
    // Start Game Button
    playButton.addEventListener("click", () => {
        startScreen.style.display = "none";
        playerSetup.style.display = "block";
    });

    // Player Count Selection
    document.querySelectorAll(".player-count-btn").forEach(button => {
        button.addEventListener("click", () => {
            const numPlayers = parseInt(button.dataset.players, 10);
            setupPlayerForm(numPlayers, startGameCallback);
        });
    });
}

// Add and select players for game
function setupPlayerForm(numPlayers, startGameCallback) {
    const players = generatePlayers(numPlayers);
   
    playerForm.innerHTML = ""; // Clear existing form

    players.forEach(player => {
        playerForm.innerHTML += `
            <div class="player-input">
                <label for="player${player.id}-name">Player ${player.id}</label>
                <input type="text" id="player${player.id}-name" placeholder="Enter name" required>
                <label for="player${player.id}-color">Color:</label>
                <select id="player${player.id}-color">
                    <option value="" disabled selected>Pick a color</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                </select>
            </div>
        `;
    });

    playerDetails.style.display = "block";

    // Start Game Button
    startGameBtn.addEventListener("click", () => {
        players.forEach(player => {
            const name = document.getElementById(`player${player.id}-name`).value;
            const color = document.getElementById(`player${player.id}-color`).value;

            if (!name || !color) {
                alert(`Please fill out all details for Player ${player.id}`);
                return;
            }

            player.name = name;
            try {
                assignPlayerColor(player, color);
            } catch (error) {
                alert(error.message);
                return;
            }
        });

        startGameCallback(players); // Pass the players to the game
    });
}