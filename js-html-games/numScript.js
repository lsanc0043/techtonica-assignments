const custom = document.getElementById("custom");
const random = document.getElementById("random");
const numForm = document.getElementById("numForm");
const range = document.getElementById("range");
const statement = document.getElementById("statement");
const bttn = document.getElementById("set");
const hint = document.getElementById("hint");
let bounds = [];
let correctNum = 0;

function clear() {
    bgColor("white");
    setText("");
}

function bgColor(color) {
    document.body.style.backgroundColor = color;
}

function setText(text) {
    hint.innerText = text;
}

function addFormSubmit(corr) {
    numForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const guess = document.getElementById("guess").value;
        checkNum(guess, corr);
    })
}

function hotOrCold(num) {
    if (num === 0) {
        bgColor("#8dcc9e");
        setText("CORRECT! GOOD JOB!");
    }
    else if (num > 0 && num <= 10) {
        bgColor("#e8f781");
        setText("Close! Keep going! (within 10)");
    }
    else if (num > 10 && num <= 100) {
        bgColor("#f0ce7a");
        setText("Not quite! (within 100)");
    }
    else if (num > 100 && num <= 1000) {
        bgColor("#d4733b");
        setText("Not quite! (within 1000)");
    }
    else {
        bgColor("#d14134");
        setText("Within range, but you're way off!");
    }
}

function upDown(num) {
    if (num === 0) {
        bgColor("#8dcc9e");
        setText("CORRECT! GOOD JOB!");
    }
    else if (num > 0) {
        bgColor("#e8f781");
        setText("Go down!");
    }
    else if (num < 0) {
        bgColor("#f0ce7a");
        setText("Go up!");
    }
}

function checkNum(val, answer) {
    if (!isNaN(val)) {
        if (val >= (bounds[0]) && val <= (bounds[1])) { // within bounds
            const diff = (val - answer);
            upDown(diff);
            // hotOrCold(Math.abs(diff));
        }
        else {
            bgColor("red");
            setText("Outside of Bounds! Try again.")
        }
    }
    else {
        bgColor("red");
        setText("Not a number! Try again.");
    }
}

function randomize() {
    clear();
    const num1 = Math.floor(Math.random() * 10000);
    const num2 = Math.floor(Math.random() * 10000);
    bounds[0] = Math.min(num1, num2);
    bounds[1] = Math.max(num1, num2);
    statement.innerHTML = `The number is between <strong>${bounds[0]}</strong> and <strong>${bounds[1]}</strong>`;
    numForm.style.display = "block";
    correctNum = Math.floor(Math.random()*(bounds[1]-bounds[0]) + bounds[0]);
    console.log(correctNum);
    
    addFormSubmit(correctNum);
}

custom.addEventListener('click', function() {
    range.style.display = "block";
})

random.addEventListener('click', function() {
    randomize();
});

bttn.addEventListener('click', function() {
    const lower = document.getElementById("lower").value;
    const upper = document.getElementById("upper").value;
    statement.innerHTML = `The number is between <strong>${lower}</strong> and <strong>${upper}</strong>`;
    bounds[0] = Number(lower);
    bounds[1] = Number(upper);
    correctNum = Math.floor(Math.random()*(bounds[1]-bounds[0]) + bounds[0]);
    console.log(correctNum);
    if (!isNaN(bounds[0] && !isNaN(bounds[1]))) {
        if (bounds[1] < bounds[0]) {
            bgColor("red");
            setText("Upper bound cannot be less than lower bound");
        }
        else {
            numForm.style.display = "block";
            clear();
            addFormSubmit(correctNum);
        }
    }
    else {
        bgColor("red");
        setText("Not a number! Try again.");
    }
})
