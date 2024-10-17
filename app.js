const playerGrid = document.querySelector('#player_grid')
const total = document.querySelector('#total')
const scoreForm = document.querySelector('#score')
const currentPlayer = document.querySelector('#currentPlayer')

function make(item) { return document.createElement(item.toString()) }

class Player {
    constructor(name) {
        this.name = name
        this.score = 0
        this.display = make('span')
        this.percent = make('span')
        this.setup()
    }

    setup() {
        const name = make('span')

        name.classList.add('player')
        this.display.classList.add('cabin')
        this.percent.classList.add('cabin')
        name.contentEditable = true;

        name.innerText = this.name
        this.display.innerText = this.score
        this.percent.innerText = '0%'

        playerGrid.insertBefore(name, total)
        playerGrid.insertBefore(this.display, total)
        playerGrid.insertBefore(this.percent, total)

        name.addEventListener('focusout', (e) => {
            this.name = e.target.innerText
            if (this == board.player) {
                currentPlayer.innerText = 'Add points to ' + board.player.name
            }
        })
    }

    update_score(value) {
        this.score += parseFloat(value)
        this.display.innerText = this.score
        this.percent.innerText = Math.round(100 * this.score / board.gameTotal) + "%"
    }
}

class ScoreBoard {
    constructor() {
        this.players = []
        this.currentPlayer = 0;
        this.gameTotal = 0;
    }

    add_player() { this.players.push(new Player('P' + (this.players.length + 1))) }
    remove_player(player) { this.players.pop(player) }
    add_score(value) {
        this.round_total()
        this.player.update_score(value)
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length
        currentPlayer.innerText = 'Add points to ' + this.player.name
        document.querySelector(':root').style.setProperty('--currentPlayer', this.player.display.offsetTop + 'px')
    }

    get player() {
        return this.players[this.currentPlayer]
    }

    round_total() {
        if (this.currentPlayer == 0) {
            const score = total.nextElementSibling
            const max = scoreForm.lastElementChild.value
            this.gameTotal += parseFloat(max)
            score.innerText = this.gameTotal
        }
    }
}

const board = new ScoreBoard()

for (let i = 0; i < 3; i++) {
    board.add_player()
}
const indicator = make('div')
indicator.classList.add('indicator')
playerGrid.append(indicator)
board.player

scoreForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let score = e.submitter.value
    board.add_score(score)
})