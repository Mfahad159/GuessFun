let game = {
    secret: 0,
    attempts: 10,
    history: [],
    over: false
};

const input = document.getElementById('guessInput');
const submit = document.getElementById('submitBtn');
const reset = document.getElementById('resetBtn');
const feedback = document.getElementById('feedback');
const attempts = document.getElementById('attempts');
const history = document.getElementById('history');

function init() {
    game.secret = Math.floor(Math.random() * 20) + 1;
    game.attempts = 10;
    game.history = [];
    game.over = false;
    attempts.textContent = 10;
    feedback.textContent = '';
    feedback.className = '';
    history.innerHTML = '';
    input.value = '';
    input.disabled = false;
    submit.disabled = false;
    input.focus();
}

function guess() {
    if (game.over) return;
    
    let num = parseInt(input.value);
    
    if (!num || num < 1 || num > 20) {
        show('Please enter 1-20', 'hint');
        return;
    }
    
    if (game.history.includes(num)) {
        show('Already guessed that', 'hint');
        return;
    }
    
    game.history.push(num);
    game.attempts--;
    attempts.textContent = game.attempts;
    
    let guessEl = document.createElement('div');
    guessEl.textContent = num;
    history.appendChild(guessEl);
    
    if (num === game.secret) {
        show(`Correct! It was ${game.secret}!`, 'correct');
        end();
    } else if (game.attempts === 0) {
        show(`Game Over! Number was ${game.secret}`, 'incorrect');
        end();
    } else {
        let msg = num < game.secret ? 'Too low ' : 'Too high ';
        show(msg + `(${game.attempts} left)`, 'incorrect');
    }
    
    input.value = '';
    input.focus();
}

function show(msg, type) {
    feedback.textContent = msg;
    feedback.className = type;
}

function end() {
    game.over = true;
    input.disabled = true;
    submit.disabled = true;
}

submit.addEventListener('click', guess);
input.addEventListener('keypress', (e) => e.key === 'Enter' && guess());
reset.addEventListener('click', init);

init();
