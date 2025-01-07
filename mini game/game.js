document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('memory-game');
    const movesDisplay = document.getElementById('moves');
    const timeDisplay = document.getElementById('time');
    const restartButton = document.getElementById('restart');
    
    const emojis = ['☃️', '❄️', '🎗️', '🎁', '🦌', '🔔', '🎅🏻', '🎄'];
    const cardPairs = [...emojis, ...emojis];
    let moves = 0;
    let time = 0;
    let timer;
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function createCard(emoji) {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.innerHTML = `
            <div class="front-face">${emoji}</div>
            <div class="back-face">?</div>
        `;
        card.addEventListener('click', flipCard);
        return card;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        moves++;
        movesDisplay.textContent = moves;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.querySelector('.front-face').textContent === 
                       secondCard.querySelector('.front-face').textContent;

        isMatch ? disableCards() : unflipCards();
    }

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    
    const allCards = document.querySelectorAll('.memory-card');
    const matchedCards = document.querySelectorAll('.memory-card.flip');
    
    if (allCards.length === matchedCards.length) {
        clearInterval(timer);
        setTimeout(() => {

            const popup = document.getElementById('custom-popup');
            const popupContent = document.getElementById('popup-content');
            popupContent.innerHTML = `
                <h2>Selamat!</h2>
                <p>Anda Memenangkan Coupon Diskon 90%!</p>
                <p>Moves: ${moves}</p>
                <p>Time: ${time} seconds</p>
                <button onclick="closePopup()">OK</button>
            `;
            popup.style.display = 'flex';
        }, 500);
    }
}

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function startGame() {
        moves = 0;
        time = 0;
        movesDisplay.textContent = moves;
        timeDisplay.textContent = time;
        gameContainer.innerHTML = '';
        
        clearInterval(timer);
        timer = setInterval(() => {
            time++;
            timeDisplay.textContent = time;
        }, 1000);

        const shuffledCards = shuffle(cardPairs);
        shuffledCards.forEach(emoji => {
            const card = createCard(emoji);
            gameContainer.appendChild(card);
        });
    }

    restartButton.addEventListener('click', startGame);
    startGame();
});


function toggleMusic() {
    var music = document.getElementById("bgMusic");
    var musicBtn = document.getElementById("musicBtn");
    
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = "Pause Music";
    } else {
        music.pause();
        musicBtn.innerHTML = "Play Music";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var music = document.getElementById("bgMusic");
    music.volume = 0.5; // 
});

function closePopup() {
    const popup = document.getElementById('custom-popup');
    popup.style.display = 'none';
}

function playClickSound() {
    const clickSound = new Audio('.mp3');  
    clickSound.volume = 0.3; 
    clickSound.play();
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.getElementsByTagName('button');
    for(let button of buttons) {
        button.addEventListener('click', playClickSound);
    }
});

function playPopupSound() {
    const popupSound = new Audio('popup sound.mp3');  
    popupSound.volume = 0.4; 
    popupSound.play();
}

function showPopup(title, message) {
    const popup = document.getElementById('custom-popup');
    const popupContent = document.getElementById('popup-content');
    
    popupContent.innerHTML = `
        <h2>${title}</h2>
        <p>${message}</p>
        <button onclick="closePopup()">OK</button>
    `;
    
    popup.style.display = 'flex';
    playPopupSound(); 
}

