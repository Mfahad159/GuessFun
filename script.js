let game = {
    secret: 0,
    over: false
};

const input = document.getElementById('guessInput');
const submit = document.getElementById('submitBtn');
const reset = document.getElementById('resetBtn');
const feedback = document.getElementById('feedback');

function init() {
    game.secret = Math.floor(Math.random() * 20) + 1;
    game.over = false;
    feedback.textContent = '';
    feedback.className = '';
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
    
    if (num === game.secret) {
        show(`Correct! It was ${game.secret}!`, 'correct');
    } else {
        show(`Wrong! It was ${game.secret}`, 'incorrect');
    }
    
    end();
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
