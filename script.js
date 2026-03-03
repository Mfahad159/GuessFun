// Game state
let gameState = {
    secretNumber: 0,
    attemptsLeft: 10,
    guessHistory: [],
    gameOver: false
};

// DOM elements
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const feedbackEl = document.getElementById('feedback');
const attemptsEl = document.getElementById('attempts');
const historyEl = document.getElementById('history');

// Initialize game
function initializeGame() {
    gameState.secretNumber = Math.floor(Math.random() * 30) + 1;
    gameState.attemptsLeft = 10;
    gameState.guessHistory = [];
    gameState.gameOver = false;
    
    attemptsEl.textContent = gameState.attemptsLeft;
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    historyEl.innerHTML = '';
    guessInput.value = '';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Guess';
    guessInput.focus();
}

// Process guess
function processGuess(guess) {
    if (gameState.gameOver) return;
    
    // Validate input
    if (!guess || isNaN(guess) || guess < 1 || guess > 30) {
        showFeedback('Please enter a number between 1 and 30!', 'hint');
        return;
    }
    
    guess = parseInt(guess);
    
    // Check if already guessed
    if (gameState.guessHistory.includes(guess)) {
        showFeedback('You already guessed that number!', 'hint');
        return;
    }
    
    gameState.guessHistory.push(guess);
    gameState.attemptsLeft--;
    attemptsEl.textContent = gameState.attemptsLeft;
    addToHistory(guess);
    
    // Check result
    if (guess === gameState.secretNumber) {
        showFeedback(`🎉 Correct! It was ${gameState.secretNumber}! You won with ${gameState.attemptsLeft + 1} attempts!`, 'correct');
        endGame();
    } else if (gameState.attemptsLeft === 0) {
        showFeedback(`Game Over! The number was ${gameState.secretNumber}.`, 'incorrect');
        endGame();
    } else if (guess < gameState.secretNumber) {
        showFeedback(`Too low! ${gameState.attemptsLeft} attempts remaining.`, 'incorrect');
    } else {
        showFeedback(`Too high! ${gameState.attemptsLeft} attempts remaining.`, 'incorrect');
    }
    
    guessInput.value = '';
    guessInput.focus();
}

// Display feedback
function showFeedback(message, type) {
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback ${type}`;
}

// Add guess to history
function addToHistory(guess) {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = guess;
    historyEl.appendChild(item);
}

// End game
function endGame() {
    gameState.gameOver = true;
    submitBtn.disabled = true;
    guessInput.disabled = true;
}

// Reset game
function resetGame() {
    initializeGame();
    guessInput.disabled = false;
}

// Event listeners
submitBtn.addEventListener('click', () => {
    processGuess(guessInput.value);
});

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processGuess(guessInput.value);
    }
});

resetBtn.addEventListener('click', resetGame);

// Start game
initializeGame();
