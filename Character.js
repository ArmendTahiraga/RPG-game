import {getPlaceholderDiceHtml, getDiceNumbers, getPercentage} from "./utils.js"

function Character (data){
    Object.assign(this, data)

    this.maxHealth = this.health
    this.diceArray = getPlaceholderDiceHtml(this.diceCount)
    
    this.getDiceRoll = function (){
        this.currentDiceScore = getDiceNumbers(this.diceCount)
        this.diceArray = this.currentDiceScore.map(function(num){
            return`<div class="dice">${num}</div>`
        }).join("")
    }
    
    this.takeDamage = function (attackArray){
        const totalDamage = attackArray.reduce((total, num) => total + num)
        this.health -= totalDamage
        if(this.health <= 0){
            this.dead = true
            this.health = 0
        }
    }

    this.getHealthBarHtml = function (){
        const percent = getPercentage(this.health, this.maxHealth)
        return `
            <div class="health-bar-outer">
                <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                    style="width:${percent}%;">
                </div>
            </div>
        `
    }
    this.getCharacterHtml = function () {
        const {name, avatar, health, diceArray } = this
        const healthBar = this.getHealthBarHtml()
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceArray}
                </div>
            </div>`
    }
}
export default Character