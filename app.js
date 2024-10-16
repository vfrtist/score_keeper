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
        this.setup()
    }

    setup() {
        let name = make('span')
        let percent = make('span')

        name.classList.add('player')
        this.display.classList.add('cabin')
        percent.classList.add('cabin')
        name.contentEditable = true;

        name.innerText = this.name
        this.display.innerText = this.score
        percent.innerText = '0%'

        playerGrid.insertBefore(name, total)
        playerGrid.insertBefore(this.display, total)
        playerGrid.insertBefore(percent, total)

        name.addEventListener('focusout', (e) => {
            this.name = e.target.innerText
        })
    }

    update_score(value) {
        this.score += parseFloat(value)
        this.display.innerText = this.score
    }
}

class ScoreBoard {
    constructor() {
        this.players = []
        this.currentPlayer = 0;
    }

    add_player() { this.players.push(new Player('P' + (this.players.length + 1))) }
    remove_player(player) { this.players.pop(player) }
    add_score(value) {
        let cp = this.players[this.currentPlayer]
        cp.update_score(value)
        this.currentPlayer + 1 < this.players.length ? this.currentPlayer++ : this.currentPlayer = 0
        currentPlayer.innerText = 'Add points to ' + cp.name
        // Need to update to the next player, not the current one....
    }
}

const board = new ScoreBoard()

for (let i = 0; i < 3; i++) {
    board.add_player()
}

scoreForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let score = e.submitter.value
    board.add_score(score)
})