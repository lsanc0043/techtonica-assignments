const custom = document.getElementById("custom");
const random = document.getElementById("random");
const numForm = document.getElementById("numForm");
const range = document.getElementById("range");
const statement = document.getElementById("statement");
const bttn = document.getElementById("set");
const hint = document.getElementById("hint");
const bounds = [0, 0];
let correctNum = 0;

custom.addEventListener('click', function() {
    range.style.display = "block";
})

random.addEventListener('click', function() {
    const num1 = Math.floor(Math.random() * 10000);
    const num2 = Math.floor(Math.random() * 10000);
    bounds[0] = Math.min(num1, num2);
    bounds[1] = Math.max(num1, num2);
    statement.innerHTML = `The number is between <strong>${bounds[0]}</strong> and <strong>${bounds[1]}</strong>`;
    numForm.style.display = "block";
    correctNum = Math.floor(Math.random()*bounds[1] + bounds[0]);
})

bttn.addEventListener('click', function() {
    const lower = document.getElementById("lower").value;
    const upper = document.getElementById("upper").value;
    statement.innerHTML = `The number is between <strong>${lower}</strong> and <strong>${upper}</strong>`;
    numForm.style.display = "block";
    bounds[0] = lower;
    bounds[1] = upper;
})

console.log(correctNum);

numForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const guess = document.getElementById("guess").value;
    console.log(guess);
    if (!isNaN(guess)) {
        if (guess > Number(bounds[0]) && guess < Number(bounds[1])) {
            const diffLower = guess - Number([bounds[0]]);
            const diffUpper = Number(bounds[1]) - guess;
            hint.style.color = "green";
            hint.innerText = "Close!"
        }
        else {
            hint.style.color = "red";
            hint.innerText = "Outside of Bounds! Try again."
        }
    }
    else {
        hint.style.color = "red";
        hint.innerText = "Not a number! Try again."
    }

})