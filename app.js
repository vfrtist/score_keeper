function make(item) { return document.createElement(item.toString()); }

class Player {
    constructor(item) {
        this.container = item
        this.display = item.querySelector('.score');
        this.score = 0;
    }
    addScore(points) {
        this.score += parseInt(points);
        this.display.innerText = `${this.score} pt`;
    }
}

class Card {
    constructor(question, answer, score) {
        this.container = make('button');
        this.question = question;
        this.answer = answer;
        this.score = score;
        this.setup()
    }

    setup() {
        this.container.classList.add('prompt');
        this.container.innerText = this.score;
        this.container.type = 'submit';
        this.container.addEventListener('click', (e) => {
            e.preventDefault()
            if (!this.container.classList.contains('inactive')) {
                this.container.classList.add('inactive')
                promptFrame.classList.toggle('hidden');
                // frame
                const modal = make('dialog');
                modal.classList.add('container', 'vertical');
                const [upper, lower] = this.buildUpperLower()
                modal.append(upper, lower)
                document.body.append(modal);
                lower.querySelector('.refresh').addEventListener('click', () => {
                    upper.innerText = this.answer;
                    this.buildScoreButtons();
                })
                modal.showModal()
            }
        })
    }

    buildUpperLower() {
        // upper
        const upper = make('div');
        upper.classList.add('upper', 'container', 'vertical', 'cabin')
        upper.innerText = this.question
        // lower
        const lower = make('div');
        const refresh = make('div');
        lower.classList.add('lower', 'container', 'horizontal');
        refresh.classList.add('refresh', 'cabin')
        refresh.innerText = 'Reveal Answer'
        lower.append(refresh)
        // combine
        return [upper, lower];
    }

    buildScoreButtons() {
        const scoreP1 = make('div');
        const scoreP2 = make('div');
        const scoreBoth = make('div');
        const scoreNone = make('div');

        scoreP1.classList.add('player1', 'cabin');
        scoreP2.classList.add('player2', 'cabin');
        scoreBoth.classList.add('both', 'cabin');
        scoreNone.classList.add('none', 'cabin');

        scoreP1.innerText = 'BROTHER';
        scoreP2.innerText = 'brother';
        scoreBoth.innerText = 'Bother';
        scoreNone.innerText = 'Failure';

        const lower = document.querySelector('.lower');
        lower.innerHTML = '';
        lower.append(scoreP1, scoreBoth, scoreP2, scoreNone);

        scoreP1.addEventListener('click', () => {
            p1.addScore(this.score)
            this.closeDialog()
        })
        scoreP2.addEventListener('click', () => {
            p2.addScore(this.score)
            this.closeDialog()
        })
        scoreBoth.addEventListener('click', () => {
            p1.addScore(this.score)
            p2.addScore(this.score)
            this.closeDialog()
        })
        scoreNone.addEventListener('click', () => {
            this.closeDialog()
        })
    }

    closeDialog() {
        document.querySelector('dialog').remove()
        promptFrame.classList.toggle('hidden');
    }

    getProperties() {
        return [this.question, this.answer, this.score]
    }
}

const promptFrame = document.querySelector('#prompts');
const p1 = new Player(document.querySelector('#player1'));
const p2 = new Player(document.querySelector('#player2'));
p1.container.classList.add('player1', 'cabin')
p2.container.classList.add('player2', 'cabin')

const prompts = [{
    title: 'Names',
    prompts: [
        { question: 'What are all of the font stylings of McDonalds 2.0?', answer: 'Lowercase\nRight Justified\nHelvetica\n\n"arches"' },
        { question: 'What is the Prime Body?', answer: 'The Ocean 2.0' },
        { question: 'How does one Big Combo?', answer: 'Get Married 2.0' },
        { question: 'Which of these is a Flitz after\ntwo-point-ohification?\n\nFire, Parrots, Lizards\nTables, Fish', answer: 'Tables 2.0' },
        { question: 'What topic was ᗺox a suggestion?', answer: 'Vending Machines 2.0 (Hawks) ' }
    ]
},
{
    title: 'Ambassadors',
    prompts: [
        { question: 'The Great Faries represented what iconic subject?', answer: 'Milk 2.0 (Laxier)' },
        { question: 'What was Will\'s ambassador suggestion for Language/Communication', answer: 'Who is a famous snake?' },
        { question: 'What is Will the ambassador of?', answer: 'Protein Bars 2.0\n(Vitamino)' },
        { question: 'What is John the ambassador of?', answer: 'Museums 2.0\n(Conservatories, Shared with Pikachu)' },
        { question: 'How many times has Garrus been a brand ambassador?', answer: 'Twice\nAliens 2.0 (EPs), Activewear 2.0 (Popwear)' }
    ]
},
{
    title: 'Improvements',
    prompts: [
        { question: 'Will put what on the dentist chair?', answer: 'A dildo' },
        { question: 'Which of these has not been improved?\n\n3-D, Paint, Time, Wet', answer: 'Paint' },
        { question: 'An improvement from Will, what can now say one word a year?', answer: 'Trees 2.0 (Arbys)' },
        { question: 'What subject was the first Dome?', answer: 'Tests 2.0 (Glass Talk)' },
        { question: 'Titled "What Makes Things Memorable" by Jenna Calvert for "Pirates of the Caribbean 2.0"\n\n How many points made up John\'s suggestions?', answer: 'Nine\n\nNovelty, Nature and Strength of Emotion, Attention, Real or Implied Movement, High Contrast Stimuli, Faces, Ambiguity, Unexpected Visuals, Emotional Connection' }
    ]
},
{
    title: 'Bonus Content',
    prompts: [
        { question: 'Name the iconic RateMyTrance', answer: 'Between the lens of you and I' },
        { question: 'Which of these facts is true?\n\nBats are blind\n\nThe fingerprints of koalas are so similar to humans they have been mistaken at crime scenes.', answer: 'Koalas do crime' },
        { question: '"The Best Shooter Ever" is the 10x google translation of what movie title?', answer: 'Top Gun' },
        { question: 'How many times have the boys played mad libs?', answer: '27' },
        { question: 'During the improv exercises bonus episode, what was the teacher\'s name at Clown College?', answer: 'Bell Jingles' }
    ]
},
{
    title: 'Iconic Moments',
    prompts: [
        { question: 'What topic was improved twice?', answer: 'Camping' },
        { question: 'What is FUT?', answer: 'Fucked Up Tuesdays\n\nGrand Canyon 2.0 (Old Hole)' },
        { question: 'What is the "key phrase" at Mona?', answer: 'Mona Lisa look like me' },
        { question: 'Which episode was completely effectless?\n(not on purpose)', answer: 'House Cats 2.0 (Bim)' },
        { question: 'Which episode was the first quote bracket?', answer: 'Coffee Shops 2.0 (Bruce)' }
    ]
},
];

for (let section of prompts) {
    let column = make('section');
    column.classList.add('container', 'vertical')
    let title = make('h2')
    title.innerText = section.title
    title.classList.add('title', 'cabin')
    column.append(title)
    promptFrame.append(column)
    for (const [index, prompt] of section.prompts.entries()) {
        let promptCard = new Card(prompt.question, prompt.answer, (index + 1) * 100);
        column.append(promptCard.container);
    }
}
