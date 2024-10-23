document.addEventListener('DOMContentLoaded', () => {
    const animalEmojis = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐯', '🐮'];
    let cardsArray = [...animalEmojis, ...animalEmojis]; // Duplicates to create pairs
    let flippedCards = [];
    let matchedCards = [];

    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');

    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create the board
    function createBoard() {
        shuffle(cardsArray);
        cardsArray.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', index);

            const cardContent = document.createElement('img');
            cardContent.src = `https://twemoji.maxcdn.com/v/13.1.0/72x72/${emoji.codePointAt(0).toString(16)}.png`;
            card.appendChild(cardContent);

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    // Flip the card
    function flipCard() {
        const card = this;
        const cardId = card.getAttribute('data-id');
        
        if (!card.classList.contains('flipped') && flippedCards.length < 2 && !matchedCards.includes(cardId)) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    // Check if two flipped cards match
    function checkMatch() {
        const [firstCard, secondCard] = flippedCards;
        const firstEmoji = firstCard.querySelector('img').src;
        const secondEmoji = secondCard.querySelector('img').src;

        if (firstEmoji === secondEmoji) {
            matchedCards.push(firstCard.getAttribute('data-id'), secondCard.getAttribute('data-id'));
        } else {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }
        
        flippedCards = [];

        // Check if all cards are matched
        if (matchedCards.length === cardsArray.length) {
            setTimeout(() => alert('You win! All animals matched!'), 300);
        }
    }

    // Restart the game
    function restartGame() {
        gameBoard.innerHTML = '';
        flippedCards = [];
        matchedCards = [];
        createBoard();
    }

    // Initialize game
    createBoard();

    // Restart button click handler
    restartButton.addEventListener('click', restartGame);
});
