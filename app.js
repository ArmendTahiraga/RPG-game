import CharacterData from "./data.js";
import Character from "./Character.js";

let monstersArray = ["orc", "demon", "goblin"];
function getNewMonster() {
	const nextMonster = CharacterData[monstersArray.shift()];
	return nextMonster ? new Character(nextMonster) : {};
}

const wizard = new Character(CharacterData.hero);
let monster = getNewMonster();
render();
let isWaiting = false;

document.getElementById("attack-button").addEventListener("click", attack);
function attack() {
	if (!isWaiting) {
		wizard.getDiceRoll();
		monster.getDiceRoll();
		wizard.takeDamage(monster.currentDiceScore);
		monster.takeDamage(wizard.currentDiceScore);
		render();
		if (wizard.dead) {
			endGame();
		} else if (monster.dead) {
			isWaiting = true;
			if (monstersArray.length > 0) {
				setTimeout(() => {
					monster = getNewMonster();
					render();
					isWaiting = false;
				}, 1500);
			} else {
				endGame();
			}
		}
	}
}
function endGame() {
	isWaiting = true;
	const endMessage =
		wizard.health === 0 && monster.health === 0
			? "No victors - all creatures are dead"
			: wizard.health > 0
			? "The Wizard Wins"
			: "The monsters are Victorious";

	const endEmoji = wizard.health > 0 ? "🔮" : "☠️";
	setTimeout(() => {
		document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `;
	}, 1500);
}

function render() {
	document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
	document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}
