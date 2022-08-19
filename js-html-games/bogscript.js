const grid = document.getElementById("boggle");
const word = document.getElementById("word");
const wordForm = document.getElementById("wordForm");
const error = document.getElementById("errorMessage");
const restart = document.getElementById("restart");
const numR = 6;
const numC = 4;
const maxGuess = numR;
let currentRow = 0;
const keyboardLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
const alphabet = (keyboardLetters.split("").sort().join(""));
let typedInput = [];
let letterArray = [];
let url = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

function createGrid(rows, cols) { // generates grid with random letters
    for (let i = 0; i < rows; i++) {
        const row1 = document.createElement('div');
        row1.setAttribute('class', "line");
        grid.appendChild(row1);
        function createCols() {
            for (let j = 0; j < cols; j++) {
                const col1 = document.createElement('div');
                const letter = document.createElement('p');
                col1.setAttribute('class', "letter");
                // letter.innerHTML = randLetter();
                col1.appendChild(letter);
                row1.appendChild(col1);
            }
        }
        createCols();
        // const allDivs = document.querySelectorAll(".letter");
        // for (let i = 0; i < allDivs.length; i++) {
        //     allDivs[i].innerText = i + 1;
        // }
    }
}

function createKeyboard(rightWord, wordList) {
    const enter = document.createElement('button');
    enter.setAttribute('class', "enter");
    enter.innerText = "Enter";
    enter.addEventListener('click', function () {
        matchWord(rightWord, typedInput.join(""), wordList)
        typedInput = [];
        console.log(typedInput.join(""));
    })
    const back = document.createElement('button');
    back.setAttribute('class', "back");
    back.innerText = "Backspace";
    back.addEventListener('click', function () {
        erase();
        typedInput.pop();
    })
    for (let i = 0; i < keyboardLetters.length; i++) {
        const alphaLetter = document.createElement('button');
        alphaLetter.setAttribute('class', "alphaLetter");
        alphaLetter.innerText = keyboardLetters[i];
        alphaLetter.addEventListener('click', function () {
            typedInput.push(keyboardLetters[i]);
            type();
            console.log(typedInput);
            console.log(keyboardLetters[i]);
        })
        if (i < 10) {
            document.getElementById("one").appendChild(alphaLetter);
        }
        else if (i > 18) {
            document.getElementById("three").appendChild(alphaLetter);
        }
        else {
            document.getElementById("two").appendChild(alphaLetter);
        }
    }
    document.getElementById("three").appendChild(enter);
    document.getElementById("three").appendChild(back);
}

function keyDownEvents(rightWord, wordList) {
    const buttons = document.querySelectorAll('button');
    document.addEventListener('keydown', function (event) {
        if (event.code === "Enter") {
            buttons[buttons.length - 2].style.backgroundColor = "rgb(104, 157, 157)";
            matchWord(rightWord, typedInput.join(""), wordList)
            typedInput = [];
            console.log(typedInput.join(""));
        }
        if (event.code === "Backspace") {
            buttons[buttons.length - 1].style.backgroundColor = "rgb(104, 157, 157)";
            erase();
            typedInput.pop();
            console.log(typedInput);
        }
        for (let i = 0; i < keyboardLetters.length; i++) {
            if (event.code === `Key${alphabet[i]}`) {
                buttons[keyboardLetters.indexOf(alphabet[i]) + 1].style.backgroundColor = "rgb(104, 157, 157)";
                typedInput.push(alphabet[i]);
                type();
                console.log(typedInput);
                console.log(alphabet[i]);
            }
        }
    })
    document.addEventListener('keyup', function (event) {
        if (event.code === "Enter") {
            buttons[buttons.length - 2].style.backgroundColor = "lightblue";
        }
        if (event.code === "Backspace") {
            buttons[buttons.length - 1].style.backgroundColor = "lightblue";
        }
        for (let i = 0; i < keyboardLetters.length; i++) {
            if (event.code === `Key${alphabet[i]}`) {
                if (buttons[keyboardLetters.indexOf(alphabet[i]) + 1].style.backgroundColor !== "grey") {
                    buttons[keyboardLetters.indexOf(alphabet[i]) + 1].style.backgroundColor = "lightblue";
                }
            }
        }
    })
}

function type() {
    const guessCols = document.querySelectorAll(".letter");
    if (typedInput.length < 6) {
        console.log(currentRow);
        guessCols[(typedInput.length - 1) + (numC * currentRow)].innerText = typedInput[typedInput.length - 1];
    }
    else {
        typedInput = typedInput.slice(0, numC);
    }
}

function erase() {
    const guessCols = document.querySelectorAll(".letter");
    console.log(typedInput);
    guessCols[(typedInput.length-1) + (numC * currentRow)].innerText = "";
}

function reset() {
    const guessCols = document.querySelectorAll(".letter");
    currentRow = 0;
    typedInput = [];
    for (let i = 0; i < guessCols.length; i++) {
        error.innerText = "New word!"
        guessCols[i].innerText = "";
        setDivColor(i, "rgb(56, 162, 150)")
    }
}

function matchWord(ans, userAns, txtList) {
    const guessCols = document.querySelectorAll(".letter");
    const buttons = document.querySelectorAll('button');
    let correctLetters = 0;
    if (userAns.length === ans.length) {
        if (txtList.includes(userAns.toLowerCase())) {
            console.log("next row");
            for (let i = 0; i < ans.length; i++) {
                if (userAns[i] === ans[i]) {
                    setDivColor(`${numC * currentRow + i}`, "rgb(104, 196, 54)");
                    correctLetters++;
                }
                else if (ans.includes(userAns[i])) {
                    setDivColor(`${numC * currentRow + i}`, "#f0ce7a");
                }
                else {
                    buttons[keyboardLetters.indexOf(userAns[i]) + 1].style.backgroundColor = "grey";
                    setDivColor(`${numC * currentRow + i}`, "#d14134");
                }
            }
            currentRow++;
            error.innerHTML = "";
        }
        else {
            for (let i = 0; i < ans.length; i++) {
                guessCols[(numC * currentRow) + i].innerText = "";
            }
            if (currentRow > 0) {
                console.log("go back bc not in dictionary");
                currentRow--;
            };
            error.innerHTML = `<strong>Please enter a valid word.</strong>`;
        }
    }
    else {
        for (let i = 0; i < ans.length; i++) {
            guessCols[(numC * currentRow) + i].innerText = "";
        }
        if (currentRow > 0) {
            console.log(`go back bc not ${numC} letters`);
            currentRow--;
        };
        error.innerHTML = `Please enter a <strong>${ans.length}</strong>-lettered word.`
    }
    if (correctLetters === ans.length) {
        restart.style.display = "inline-block";
    }
    console.log(currentRow);
}

function setDivColor(target, color) { // changes bgColor to specified color
    const targetDiv = document.querySelectorAll(".letter")[target];
    console.log(targetDiv);
    targetDiv.style.backgroundColor = color;
}

async function wordle() {
    let dict = await fetch(url);
    let txt = await dict.text();
    let nLetterWords = [];
    let allWords = txt.split("\n").join("").split("\r");
    console.log(numC);
    for (let i = 0; i < allWords.length; i++) {
        if (allWords[i].length === numC) {
            nLetterWords.push(allWords[i]);
        }
    }
    let randNum = Math.floor(Math.random() * (nLetterWords.length));
    let randWord = nLetterWords[randNum].toUpperCase();
    console.log(randWord);
    restart.addEventListener('click', function () {
        randNum = Math.floor(Math.random() * (nLetterWords.length));
        randWord = nLetterWords[randNum].toUpperCase();
        reset();
        console.log(randWord);
    })
    createKeyboard(randWord, nLetterWords);
    keyDownEvents(randWord, nLetterWords);
}
createGrid(numR, numC);
wordle();

// function randLetter() { // generates a random letter
//     const rand = Math.floor(Math.random() * 26) + 1;
//     letterArray.push(alphabet[rand - 1]); // adds letter to array
//     return alphabet[rand - 1];
// }

// function clear() {
//     const allDivs = document.querySelectorAll(".letter");
//     for (let i = 0; i < allDivs.length; i++) {
//         allDivs[i].style.backgroundColor = "none";
//     }
//     console.log(allDivs);
// }

// function foundOnGrid(theWord) {
//     let lower = letterArray.map((char) => char.toLowerCase());
//     console.log(lower);
//     for (let i = 0; i < theWord.length; i++) {
//         if (lower.includes(theWord[i])) {
//             setInterval(setDivColor(lower.indexOf(theWord[i]), "green"), 4000);
//             error.innerHTML = "Try again!"
//         }
//         // console.log("yes");
//     }
// }

// function move(start, direction) {
//     switch (direction) {
//         case "up":
//             return start - numC;
//         case "down":
//             return start + numC;
//         case "left":
//             return start - 1;
//         case "right":
//             return start + 1;
//     }
// }

// function isCorner(pos) {
//     if (pos === 1 || pos === numC || pos === (numC * numR) - numC + 1 || pos === numC * numR) {
//         console.log("is Corner");
//         return true;
//     }
//     return false;
// }

// function whichCorner(corner) {
//     let cornerDiv = [];
//     switch (corner) {
//         case 1:
//             cornerDiv.push(corner, move(corner, "down"), move(corner, "right"), move(move(corner, "down"), "right"));
//             break;
//         case numC:
//             cornerDiv.push(corner, move(corner, "down"), move(corner, "left"), move(move(corner, "down"), "left"));
//             break;
//         case (numC * numR) - numC + 1:
//             cornerDiv.push(corner, move(corner, "up"), move(corner, "right"), move(move(corner, "up"), "right"));
//             break;
//         case (numC * numR):
//             cornerDiv.push(corner, move(corner, "up"), move(corner, "left"), move(move(corner, "up"), "left"));
//             break;
//     }
//     return cornerDiv;
// }

// function isEdge(pos) {
//     if (!isCorner(pos)) {
//         if (pos % numC === 0 || pos % numC === 1) {
//             console.log("is Edge")
//             return true;
//         }
//     }
//     return false;
// }

// function leftOrRight(edge) {
//     let edgeDiv = [];
//     switch (edge % numC) {
//         case 1:
//             edgeDiv.push(edge, move(edge, "up"), move(edge, "down"), move(edge, "right"), move(move(edge, "up"), "right"), move(move(edge, "down"), "right"));
//             break;
//         case 0:
//             edgeDiv.push(edge, move(edge, "up"), move(edge, "down"), move(edge, "left"), move(move(edge, "up"), "left"), move(move(edge, "down"), "left"));
//             break;
//     }
//     return edgeDiv;
// }

// function isUDEdge(pos) {
//     if (!isCorner(pos)) {
//         if (pos % numC === 0 || pos % numC === (numC - 1)) {
//             return true;
//         }
//     }
//     return false;
// }

// function surroundingDiv(pos) { // 17
//     let surDivMid = [
//         pos,
//         move(pos, "left"),
//         move(pos, "right"),
//         move(pos, "up"),
//         move(move(pos, "up"), "left"),
//         move(move(pos, "up"), "right"),
//         move(pos, "down"),
//         move(move(pos, "down"), "left"),
//         move(move(pos, "down"), "right")
//     ];

//     if (isCorner(pos)) { //  17, yes
//         for (let i = 0; i < whichCorner(pos).length; i++) { // 17
//             setDivColor(whichCorner(pos)[i], "green"); // 5
//         }
//     }
//     else if (isEdge(pos)) { // 5
//         for (let i = 0; i < leftOrRight(pos).length; i++) {
//             setDivColor(leftOrRight(pos)[i], "green");
//         }
//     }
//     else {
//         console.log("not edge or corner");
//         for (let i = 0; i < surDivMid.length; i++) {
//             setDivColor(surDivMid[i], "green");
//         }
//     }
// }

// let randDiv = Math.floor(Math.random() * (numC * numR - 1) + 1);
// // console.log(randDiv);
// // surroundingDiv(randDiv);

// async function boggle() {
//     let dict = await fetch(url);
//     let txt = await dict.text();
//     function checkWord(guess) {
//         if (txt.includes(guess)) {
//             // foundOnGrid(word.value);
//             console.log("yes")
//         }
//     }
//     wordForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         checkWord(word.value);
//     })
// }

