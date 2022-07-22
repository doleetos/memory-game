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

let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = 0;


cardArray.sort(() => 0.5 - Math.random());  //shuffles array randomly

const gridDisplay = document.getElementById('grid');
const result = document.getElementById('result');
const restart = document.getElementById('restart-button');


function createBoard() {
    for ( let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        restart.addEventListener('click', restartGame);
        gridDisplay.appendChild(card);
    };
}



function checkMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    console.log(optionOneId);

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('You clicked the same image!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
        alert('you found a match');
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);

        cardsWon = cardsWon + 1;

        result.innerHTML = cardsWon;

        restart.onclick = function () {
            cardsWon = 0;
            result.innerHTML = '';
        }

    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('Sorry, try again...');
    }

    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon === cardArray.length / 2) {
        result.textContent = 'Congratulations you found them all!';
    }

    
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout( checkMatch, 500);
    }

    console.log(`Card id is: ${cardId}, Card chosen is: ${cardsChosen}, Card chosen id is: ${cardsChosenIds}`);
}

function restartGame() {
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = 0;
    gridDisplay.innerHTML = '';
    result.innerHTML = 0;

    cardArray.sort(() => 0.5 - Math.random());

    createBoard();
}

createBoard();
