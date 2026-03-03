# Build a Number Guessing Game in 15 Minutes

A quick tutorial to build a number guessing game (1-100, 10 chances) with HTML, CSS, and JavaScript.

---

## What You Need

```
index.html  →  Structure
style.css   →  Styling
script.js   →  Logic
```

---

## HTML Structure

```html
<h1 class="title">Fun Guess</h1>
<div class="wrapper">
  <header>Guess a number from 1 to 100</header>
  <p class="guess"></p>
  <input type="number" />
  <button>Check</button>
  <p>You have <span class="chances">10</span> chances</p>
</div>
```

**Elements:**
- `<input>` → Player's guess
- `<button>` → Submit/Replay
- `.guess` → Feedback text
- `.chances` → Remaining attempts

---

## CSS Essentials

**Body:**
```css
background: #4a98f7
display: flex
flex-direction: column
```

**Title (.title):**
```css
font-size: 56px
font-weight: 900
color: #fff
font-family: 'Arial Black'
```

**Wrapper:**
```css
background: #fff
border-radius: 12px
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1)
```

**Feedback colors:**
- Correct: `#27ae60`
- Wrong: `#333`
- Invalid: `#e74c3c`

---

## JavaScript Logic

**Setup:**
```javascript
const input = document.querySelector("input");
const guess = document.querySelector(".guess");
const checkButton = document.querySelector("button");
const remainChances = document.querySelector(".chances");

let randomNum = Math.floor(Math.random() * 100);
let chance = 10;
```

**Check Button Click:**
```javascript
checkButton.addEventListener("click", () => {
  if (input.disabled) {
    resetGame();
    return;
  }

  chance--;
  let num = input.value;

  if (num == randomNum) {
    guess.textContent = "Congrats! Found it!";
    guess.style.color = "#27ae60";
    input.disabled = true;
    checkButton.textContent = "Replay";
  } else if (num > randomNum) {
    guess.textContent = "Too high";
    remainChances.textContent = chance;
  } else if (num < randomNum) {
    guess.textContent = "Too low";
    remainChances.textContent = chance;
  } else {
    guess.textContent = "Invalid";
    guess.style.color = "#e74c3c";
  }
});
```

**Reset Function:**
```javascript
const resetGame = () => {
  randomNum = Math.floor(Math.random() * 100);
  chance = 10;
  input.disabled = false;
  input.value = "";
  guess.textContent = "";
  remainChances.textContent = 10;
  checkButton.textContent = "Check";
};
```

---

## How It Works

1. Generate random 1-100
2. Player guesses
3. Compare: too high/low/correct
4. Update chances
5. Disable input when correct or out of chances
6. Show "Replay" button to reset

---

## Key Techniques

| Code | What It Does |
|------|------------|
| `querySelector()` | Find DOM elements |
| `==` operator | Compare values |
| `input.disabled` | Lock/unlock input |
| `.style.color` | Change text color dynamically |
| `Math.floor(Math.random() * 100)` | Random number |
| `addEventListener()` | Handle clicks |

---

## Result

✅ Game works  
✅ Clean UI  
✅ 10 chances  
✅ Instant feedback  
✅ Replay button  

Done! 🎮
