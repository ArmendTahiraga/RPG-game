function getPlaceholderDiceHtml(diceCount) {
	return new Array(diceCount)
		.fill(0)
		.map(function () {
			return `<div class="placeholder-dice"></div>`;
		})
		.join("");
}
function getDiceNumbers(diceCount) {
	return new Array(diceCount).fill(0).map(function () {
		return Math.floor(Math.random() * 6) + 1;
	});
}
const getPercentage = (remainingHealth, maximumHealth) => (100 * remainingHealth) / maximumHealth;

export { getPlaceholderDiceHtml, getDiceNumbers, getPercentage };
