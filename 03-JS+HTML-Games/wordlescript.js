const grid = document.getElementById("wordle");
const error = document.getElementById("errorMessage");
const restart = document.getElementById("restart");
const NUM_OF_ROWS = 6;
const NUM_OF_COLS = 5;
const keyboardLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
const alphabet = keyboardLetters.split("").sort().join("");

let typedInput = []; // stores typed input value
let letterArray = []; // stores all letters for boggle
let currentRow = 0; // current row value
let max_guess = NUM_OF_ROWS;
let url =
  "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

function randomWord(arr) {
  let randNum = Math.floor(Math.random() * arr.length); // generates random number
  let randWord = arr[randNum].toUpperCase(); // generates random word
  return randWord;
}

function createGrid(rows, cols) {
  // generates grid with random letters
  for (let i = 0; i < rows; i++) {
    // creates all rows
    const row1 = document.createElement("div");
    row1.setAttribute("class", "line");
    grid.appendChild(row1);

    // creates all columns and adds random letters to those columns
    for (let j = 0; j < cols; j++) {
      const col1 = document.createElement("div");
      col1.setAttribute("class", "letter");
      row1.appendChild(col1);
    }
  }
  // const allDivs = document.querySelectorAll(".letter");
  // for (let i = 0; i < allDivs.length; i++) {
  //     allDivs[i].innerText = i + 1;
  // }
}

function createKeyboard(ans, wordList) {
  // generates a keyboard
  // generates the enter button and allows you to access typed input
  const enter = document.createElement("button");
  enter.setAttribute("class", "enter");
  enter.innerText = "Enter";
  enter.addEventListener("click", function () {
    matchWord(ans, typedInput.join(""), wordList);
    typedInput = []; // resets input
    console.log(typedInput.join(""));
  });

  // generates a back button and allows you to erase typed input
  const back = document.createElement("button");
  back.setAttribute("class", "back");
  back.innerText = "Backspace";
  back.addEventListener("click", function () {
    erase(); // remove letter from HTML
    typedInput.pop(); // removes the letter at the end of the typed input
  });

  // creates a button for each keyboard letter
  for (let i = 0; i < keyboardLetters.length; i++) {
    const alphaLetter = document.createElement("button");
    alphaLetter.setAttribute("class", "alphaLetter");
    alphaLetter.innerText = keyboardLetters[i];

    alphaLetter.addEventListener("click", function () {
      typedInput.push(keyboardLetters[i]); // add char to typed input
      type(); // add char to HTML
      console.log(typedInput);
      console.log(keyboardLetters[i]);
    });

    if (i < 10) {
      // separates row one QWERTYUIOP
      document.getElementById("one").appendChild(alphaLetter);
    } else if (i > 18) {
      // separates row three ZXCVBNM
      document.getElementById("three").appendChild(alphaLetter);
    } else {
      // separates row two ASDFGHJKL
      document.getElementById("two").appendChild(alphaLetter);
    }
  }

  // add enter and back button
  document.getElementById("three").appendChild(enter);
  document.getElementById("three").appendChild(back);
}

function keyDownEvents(ans, wordList) {
  // checks for when keyboard letters are pressed
  const buttons = document.querySelectorAll("button"); // retrieves all keyboard buttons
  // checks for keydown
  document.addEventListener("keydown", function (event) {
    // if enter,
    if (event.code === "Enter") {
      buttons[buttons.length - 2].style.backgroundColor = "rgb(104, 157, 157)"; // index of enter button
      matchWord(ans, typedInput.join(""), wordList);
      typedInput = []; // resets typed input
      console.log(typedInput.join(""));
    }
    // if backspace,
    if (event.code === "Backspace") {
      buttons[buttons.length - 1].style.backgroundColor = "rgb(104, 157, 157)"; // index of back button
      erase(); // remove char from HTML
      typedInput.pop(); // remove char from typed input
      console.log(typedInput);
    }

    // loops through keyboard letters to highlight the right char on keyboard when letter is pressed
    for (let i = 0; i < keyboardLetters.length; i++) {
      let posOnKeyboard = keyboardLetters.indexOf(alphabet[i]) + 1;
      if (event.code === `Key${alphabet[i]}`) {
        buttons[posOnKeyboard].style.backgroundColor = "rgb(104, 157, 157)"; // darken box to show letter is being pressed
        typedInput.push(alphabet[i]); // add char to typed input
        type(); // add char to HTML
        console.log(typedInput);
        console.log(alphabet[i]);
      }
    }
  });

  // checks for keyup
  document.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
      buttons[buttons.length - 2].style.backgroundColor = "lightblue"; // change event button
    }
    if (event.code === "Backspace") {
      buttons[buttons.length - 1].style.backgroundColor = "lightblue"; // change backspace
    }

    // loops through keyboard letters to highlight the right char on keyboard when letter is pressed
    for (let i = 0; i < keyboardLetters.length; i++) {
      let posOnKeyboard = keyboardLetters.indexOf(alphabet[i]) + 1;
      if (event.code === `Key${alphabet[i]}`) {
        // if button is not already grayed out bc it's not in the correct word
        if (buttons[posOnKeyboard].style.backgroundColor !== "grey") {
          buttons[posOnKeyboard].style.backgroundColor = "lightblue"; // return to original color
        }
      }
    }
  });
}

function type() {
  // adds letters to the page
  const allBoxesOnPage = document.querySelectorAll(".letter"); // selects all the letter boxes
  const typedCharPos = typedInput.length - 1 + NUM_OF_COLS * currentRow; // will add a char to the box thats in the current row
  if (typedInput.length < NUM_OF_COLS + 1) {
    // checks if your input is less than the number of columns
    console.log(currentRow);
    allBoxesOnPage[typedCharPos].innerText = typedInput[typedInput.length - 1]; // sets corresponding box to the last char typed in
  } else {
    // otherwise, will stop you from typing an input
    typedInput = typedInput.slice(0, NUM_OF_COLS); // cuts the remainder/extra characters off
  }
}

function erase() {
  // removes letters from the page
  const allBoxesOnPage = document.querySelectorAll(".letter"); // selects all the letter boxes
  const typedCharPos = typedInput.length - 1 + NUM_OF_COLS * currentRow; // will remove the last char thats in the current row
  console.log(typedInput);
  allBoxesOnPage[typedCharPos].innerText = "";
}

function reset() {
  // resets the page
  const allBoxesOnPage = document.querySelectorAll(".letter");
  const buttons = document.querySelectorAll("button"); // retrieves all keyboard buttons
  currentRow = 0;
  typedInput = [];

  // resets color, innertext of boxes, and tells user they are generating a new word
  for (let i = 0; i < allBoxesOnPage.length; i++) {
    error.innerText = "New word!";
    allBoxesOnPage[i].innerText = "";
    setDivColor(i, "rgb(56, 162, 150)");
  }
  for (let j = 0; j < keyboardLetters.length; j++) {
    buttons[j].style.backgroundColor = "lightblue";
  }
  //   grid.innerHTML = "";
  //   document.getElementById("one").innerHTML = "";
  //   document.getElementById("two").innerHTML = "";
  //   document.getElementById("three").innerHTML = "";
}

function matchWord(ans, userAns, txtList) {
  // validates the word
  const allBoxesOnPage = document.querySelectorAll(".letter");
  const buttons = document.querySelectorAll("button");
  let correctLetters = 0; // tracks if user has gotten the exact, right answer

  if (userAns.length === ans.length) {
    // if user input is the right length
    if (txtList.includes(userAns.toLowerCase())) {
      // if user input is considered a real word
      for (let i = 0; i < ans.length; i++) {
        // loops through the answer length
        let posOnKeyboard = 0;
        if (userAns[i] === ans[i]) {
          // if they are the same
          setDivColor(`${NUM_OF_COLS * currentRow + i}`, "rgb(104, 196, 54)"); // set green
          correctLetters++; // add to correct letters
          console.log(correctLetters);
        } else if (ans.includes(userAns[i])) {
          // if they are not exactly the same, but the char is somewhere else
          setDivColor(`${NUM_OF_COLS * currentRow + i}`, "#f0ce7a"); // set yellow
        } else {
          // if not in the word at all
          let posOnKeyboard = keyboardLetters.indexOf(userAns[i]) + 1; // keyboard position of the incorrect color
          buttons[posOnKeyboard].style.backgroundColor = "grey"; // return to original color
          setDivColor(`${NUM_OF_COLS * currentRow + i}`, "#d14134"); // set red
        }
      }
      currentRow++; // if valid input (right length && in the dictionary), move to next row
      max_guess--;
      error.innerHTML = ""; // reset error message
    } else {
      // if right length but not in the dictionary
      for (let i = 0; i < ans.length; i++) {
        allBoxesOnPage[NUM_OF_COLS * currentRow + i].innerText = ""; // resets that particular row,
      }
      //   if (currentRow > 0) {
      //     // if you're not at the beginning and are on your second or third guess
      //     console.log("go back bc not in dictionary");
      //     currentRow--; // go back one row
      //   }
      error.innerHTML = `<strong>Please enter a valid word.</strong>`;
    }
  } else {
    // if not the right length
    for (let i = 0; i < ans.length; i++) {
      allBoxesOnPage[NUM_OF_COLS * currentRow + i].innerText = ""; // resets that particular row
    }
    // if (currentRow > 0) {
    //   // if you're not at the beginning and are on your second or third guess
    //   currentRow--; // go back one row
    // }
    error.innerHTML = `Please enter a <strong>${ans.length}</strong>-lettered word.`;
  }
  if (correctLetters === ans.length) {
    // if your entire answer is correct!
    restart.style.display = "inline-block"; // allow you to restart
  }

  if (max_guess === 0) {
    error.innerHTML = "You have no more guesses! Please restart";
    restart.style.display = "inline-block"; // allow you to restart
  }

  console.log(currentRow);
}

function setDivColor(target, color) {
  // changes bgColor of a specified div to a specified color
  const targetDiv = document.querySelectorAll(".letter")[target];
  targetDiv.style.backgroundColor = color;
}

async function wordle() {
  // creates the board!
  let dict = await fetch(url); // retrieves the dictionary
  let txt = await dict.text(); // allows access to read the text
  let nLetterWords = []; // stores array of words that are n letters
  let allWords = txt.split("\n").join("").split("\r"); // splits text file into array of all words
  // console.log(allWords);

  for (let i = 0; i < allWords.length; i++) {
    if (allWords[i].length === NUM_OF_COLS) {
      // if the word has the right length
      nLetterWords.push(allWords[i]); // add to array
    }
  }
  let word = randomWord(nLetterWords);
  console.log(word);
  restart.addEventListener("click", function () {
    // will restart the game if button clicked
    window.location.reload();
  });

  createGrid(NUM_OF_ROWS, NUM_OF_COLS);
  createKeyboard(word, nLetterWords); // create the actual keyboard
  keyDownEvents(word, nLetterWords); // generate the keypressed event listeners
}

wordle();
