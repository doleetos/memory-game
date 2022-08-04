const cardArray = [
    {
        name: 'fries', 
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger', 
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog', 
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream', 
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake', 
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza', 
        img: 'images/pizza.png'
    },
    {
        name: 'fries', 
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger', 
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog', 
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream', 
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake', 
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza', 
        img: 'images/pizza.png'
    }    
];


// initial scores
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = 0;
let keepScore = 0;


cardArray.sort(() => 0.5 - Math.random());  //shuffles cards randomly


//get DOM elements
const gridDisplay = document.getElementById('grid');
const result = document.getElementById('result');
const restart = document.getElementById('restart-button');
const foundAll = document.getElementById('found-all');


// creates game board
function createBoard() {
    for ( let i = 0; i < cardArray.length; i++) {
        result.innerHTML = 0;
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blanks.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        restart.addEventListener('click', restartGame);
        gridDisplay.appendChild(card);
    };
}


// checks if user has a match or not. If there's a match, 3 points added to score. If not, -1 point taken away from score
function checkMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blanks.png');
        cards[optionTwoId].setAttribute('src', 'images/blanks.png');
        alert('You clicked the same image!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);

        cardsWon = cardsWon + 1;
        keepScore = keepScore + 3;

        result.innerHTML = keepScore;

        restart.onclick = function () {
            restartGame();
        }

    } else {
        cards[optionOneId].setAttribute('src', 'images/blanks.png');
        cards[optionTwoId].setAttribute('src', 'images/blanks.png');
        keepScore = keepScore - 1;
        result.innerHTML = keepScore;
    }

    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon === cardArray.length / 2) {
        foundAll.textContent = 'Congratulations you found them all!';
    }

    
}


// stores user chosen card in an array to check if there's a match or not
function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout( checkMatch, 500);
    }
}


// resets score, restarts game
function restartGame() {
    cardsChosen = [];
    cardsChosenIds = [];
    cardsWon = 0;
    keepScore = 0;
    gridDisplay.innerHTML = '';

    cardArray.sort(() => 0.5 - Math.random());

    createBoard();
}

createBoard();
