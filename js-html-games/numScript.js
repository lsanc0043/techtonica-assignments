const custom = document.getElementById("custom");
const random = document.getElementById("random");
const numForm = document.getElementById("numForm");
const range = document.getElementById("range");
const statement = document.getElementById("statement");
const bttn = document.getElementById("set");
const hint = document.getElementById("hint");
const guess = document.getElementById("guess");
const guessList = document.getElementById("guesses");
let bounds = [];
let correctNum = 0;
let count = 0;
const rightAns = [];

function clear() { // resets the page
    setBgColor("rgb(56, 162, 150)"); // resets to default background color
    setText(""); // resets hint to nothing
    guessList.innerHTML = ""; // empties guessList
}

function setBgColor(color) { // changes bgColor to specified color
    document.body.style.backgroundColor = color;
}

function setText(text) { // sets hint text to specified text
    hint.innerHTML = text;
}

function addGuess(num) { // creates new list item, sets list text to the guess, adds guess to guessList
    const guess1 = document.createElement('li');
    guess1.innerHTML = `<strong>${num}</strong>`;
    guessList.appendChild(guess1);
    console.log(guessList);
}

// function removeFormSubmit(corr) {
//     numForm.removeEventListener('submit', function (event) {
//         event.preventDefault();
//         console.log("ran submit");
//         checkNum(guess.value, corr);
//     });
// }

function addFormSubmit(corr) { // adds formSubmit
    numForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("ran submit");
        checkNum(guess.value, corr);
    })
}

// function hotOrCold(num) {
//     if (num === 0) {
//         setBgColor("#8dcc9e");
//         setText("CORRECT! GOOD JOB!");
//     }
//     else if (num > 0 && num <= 10) {
//         count++;
//         setBgColor("#e8f781");
//         setText("Close! Keep going! (within 10)");
//     }
//     else if (num > 10 && num <= 100) {
//         count++
//         setBgColor("#f0ce7a");
//         setText("Not quite! (within 100)");
//     }
//     else if (num > 100 && num <= 1000) {
//         count++;
//         setBgColor("#d4733b");
//         setText("Not quite! (within 1000)");
//     }
//     else {
//         count++;
//         setBgColor("#d14134");
//         setText("Within range, but you're way off!");
//     }
// }

function upDown(num, ans) { // checks if guess is close to the answer and gives up or down hints
    const diff = num - ans;
    if (diff === 0) {
        setBgColor("#8dcc9e");
        setText(`CORRECT! GOOD JOB! It took you <strong>${count}</strong> tries!`);
    }
    else if (diff > 0) {
        setBgColor("#e8f781");
        setText("Go down!");
    }
    else {
        setBgColor("#f0ce7a");
        setText("Go up!");
    }
}

function checkNum(val, answer) { // checks if val is a number or if it's within bounds
    console.log("ran checkNum");
    if (isNaN(val)) {
        setBgColor("red");
        setText("Not a number! Try again.");
        return;
    }
    if (val >= (bounds[0]) && val <= (bounds[1])) { // within bounds
        upDown(val, answer);
        count++;
        addGuess(val);
    }
    else {
        setBgColor("red");
        setText("Outside of Bounds! Try again.");
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
}

function onButtonClick() {
    const lower = document.getElementById("lower").value;
    const upper = document.getElementById("upper").value;
    statement.innerHTML = `The number is between <strong>${lower}</strong> and <strong>${upper}</strong>`;
    bounds[0] = Number(lower);
    bounds[1] = Number(upper);
    correctNum = Math.floor(Math.random()*(bounds[1]-bounds[0]) + bounds[0]);
    console.log(correctNum);
    if (!isNaN(bounds[0] && !isNaN(bounds[1]))) {
        if (bounds[1] < bounds[0]) {
            setBgColor("red");
            setText("Upper bound cannot be less than lower bound");
        }
        else {
            numForm.style.display = "block";
            clear();
            // addFormSubmit(correctNum);
        }
    }
    else {
        setBgColor("red");
        setText("Not a number! Try again.");
    }
}

custom.addEventListener('click', function() {
    range.style.display = "block";
})

random.addEventListener('click', randomize);

bttn.addEventListener('click', onButtonClick);

addFormSubmit();
