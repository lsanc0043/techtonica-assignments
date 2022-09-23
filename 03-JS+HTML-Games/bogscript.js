const grid = document.getElementById("boggle");
const word = document.getElementById("word");
const wordForm = document.getElementById("wordForm");
const error = document.getElementById("errorMessage");
const points = document.getElementById("score");
const guessList = document.getElementById("guesses");
let guessInput = [];
const NUM_OF_ROWS = 6;
const NUM_OF_COLS = 5;
const keyboardLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
const alphabet = keyboardLetters.split("").sort().join("");

let score = 0;
let letterArray = []; // stores all letters for
let url =
  "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

function randLetter() {
  // generates a random letter
  const rand = Math.floor(Math.random() * 26) + 1;
  letterArray.push(alphabet[rand - 1]); // adds letter to array
  return alphabet[rand - 1];
}

function addGuess(word) {
  // creates new list item, sets list text to the guess, adds guess to guessList
  const guess1 = document.createElement("li");
  guess1.innerHTML = `<strong>${word}</strong>`;
  guessList.appendChild(guess1);
  console.log(guessList);
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
      const letter = document.createElement("p");
      col1.setAttribute("class", "letter");
      letter.innerText = randLetter();

      col1.addEventListener("click", function () {
        guessInput.push(letter.innerText);
        console.log(guessInput);
        word.value = guessInput.join("").toLowerCase();
        col1.style.color = "white";
      });

      col1.appendChild(letter);
      row1.appendChild(col1);
    }
  }
  // const allDivs = document.querySelectorAll(".letter");
  // for (let i = 0; i < allDivs.length; i++) {
  //     allDivs[i].innerText = i + 1;
  // }
}

function clear() {
  // clears the page
  const allDivs = document.querySelectorAll(".letter");
  for (let i = 0; i < allDivs.length; i++) {
    allDivs[i].style.color = "black";
    setDivColor(i, "rgb(56, 162, 150)");
  }
  console.log(allDivs);
}

function setDivColor(target, color) {
  // changes bgColor of a specified div to a specified color
  const targetDiv = document.querySelectorAll(".letter")[target];
  targetDiv.style.backgroundColor = color;
}

function foundOnGrid(theWord) {
  // if the word is on the page
  let lowerLetters = letterArray.map((char) => char.toLowerCase()); // all the characters in the grid
  const allDivs = document.querySelectorAll(".letter");
  const letters = [];
  let countLetters = 0;
  for (let i = 0; i < theWord.length; i++) {
    if (lowerLetters.includes(theWord[i])) {
      // if the word is there
      countLetters++;
    }
  }
  console.log(countLetters);
  let curPos = 0;
  let nextLetterFound = 0;
  for (let i = 0; i < theWord.length; i++) {
    if (verifyPath(theWord[i], theWord[i + 1]) === true) {
      nextLetterFound++;
    }
  }
  if (nextLetterFound === theWord.length - 1) {
    countScore(theWord.length);
    error.innerHTML = "";
    addGuess(theWord);
    // setDivColor(, "lightblue")
    console.log("GOOD JOB WOWOW");
  } else {
    if (countLetters < theWord.length) {
      error.innerHTML = "Not found on the grid! Try again!";
    } else {
      error.innerHTML = "This word cannot be made!";
    }
  }
}

function countScore(lengthOfWord) {
  if (lengthOfWord < 8) {
    switch (lengthOfWord) {
      case 3:
      case 4:
        score++;
        break;
      case 5:
        score += 2;
        break;
      case 6:
        score += 3;
        break;
      case 7:
        score += 5;
        break;
    }
  } else {
    score += 11;
  }
  points.innerHTML = `<strong>${score}<strong>`;
}

function findAllPossibleWords(wordList) {
  const allDivs = document.querySelectorAll(".letter");
  let lowerLetters = letterArray.map((char) => char.toLowerCase()); // all the characters in the grid

  function arrs(origin, minLetters) {
    for (let i = 0; i < minLetters; i++) {
      let letArr = origin.filter((word) =>
        lowerLetters.includes(word.charAt(i))
      );
      console.log(arrs);
      arrs(letArr);
    }
  }

  arrs(wordList);

  let firstLetArr = wordList.filter((word) =>
    lowerLetters.includes(word.charAt(0))
  );
  let secLetArr = firstLetArr.filter((word) =>
    lowerLetters.includes(word.charAt(1))
  );
  let thirdLetArr = secLetArr.filter((word) =>
    lowerLetters.includes(word.charAt(2))
  );
  let fourLetArr = thirdLetArr.filter((word) =>
    lowerLetters.includes(word.charAt(3))
  );
  let fiveLetArr = fourLetArr.filter((word) =>
    lowerLetters.includes(word.charAt(4))
  );
  let sixLetArr = fiveLetArr.filter((word) =>
    lowerLetters.includes(word.charAt(5))
  );
  let sevLetArr = sixLetArr.filter((word) =>
    lowerLetters.includes(word.charAt(6))
  );
  let eightLetArr = sevLetArr.filter((word) =>
    lowerLetters.includes(word.charAt(7))
  );

  // console.log(
  //   eightLetArr.filter((word) => lowerLetters.includes(word.charAt(8)))
  // );

  // for (let i = 0; i < lowerLetters.length; i++) {
  //   let lettersAround = [];
  //   let surDiv = surroundingDiv(i);
  //   for (let j = 1; j < surDiv.length; j++) {
  //     lettersAround.push(allDivs[surDiv[j]].innerText.toLowerCase());
  //     let filterOne = wordList.filter(
  //       (word) => word.charAt(0) === lowerLetters[i]
  //     );
  //     let filterTwo = filterOne.filter((word) =>
  //       lettersAround.includes(word.charAt(1))
  //     );
  //     let filterThree = filterTwo.filter((word) =>
  //       lettersAround.includes(word.charAt(2))
  //     );
  //     console.log(filterThree);
  //   }
  //   // console.log(lettersAround);
  //   // console.log(wordList.filter((word) => word.charAt(0) === lowerLetters[i]));
  // }
  // const allDivs = document.querySelectorAll(".letter");
  // for (let i = 0; i < letterArray.length; i++) {
  //   let surDiv = surroundingDiv(i);
  //   for (let j = 1; j < surDiv.length; j++) {
  //     let lettersAround = allDivs[surDiv[j]].innerText.toLowerCase();
  //   }
  //   console.log(`surDiv for index ${i}: ${lowerLetters[i]}`, surDiv);
  // }
  // console.log(letterArray);
}

function verifyPath(currLetter, nextLetter) {
  let lowerLetters = letterArray.map((char) => char.toLowerCase()); // all the characters in the grid
  const allDivs = document.querySelectorAll(".letter");
  let hasNextLetter = false;
  if (lowerLetters.includes(currLetter)) {
    // if input letter is on the grid
    let letterIndex = [];
    for (let j = 0; j < lowerLetters.length; j++) {
      if (lowerLetters[j] === currLetter) {
        // if input letter is on the grid multiple times
        letterIndex.push(j); // add to letter index array
      }
      for (let k = 0; k < letterIndex.length; k++) {
        // go through letter index
        // setDivColor(letterIndex[k], "green"); // set selected letter index to green
        let surDiv = surroundingDiv(letterIndex[k]); // get all the surrounding boxes
        // console.log("SurroundingDivs", surDiv);
        for (let m = 1; m < surDiv.length; m++) {
          // go through the array of surrounding boxes
          if (allDivs[surDiv[m]].innerText.toLowerCase() === nextLetter) {
            // if the innertext of the boxes surrounding the selected has the next letter of input
            setDivColor(letterIndex[k], "green");
            setDivColor(surDiv[m], "lightblue");
            console.log("match");
            return true;
          } else {
            // setDivColor(surDiv[m], "lightgreen");
          }
          // console.log("Letter inside", [surDiv[m]].innerText.toLowerCase());
          // console.log("Next Letter", nextLetter);
        }
      }
    }
  }
  return hasNextLetter;
}

function move(start, direction) {
  // moves in a certain direction
  switch (direction) {
    case "up":
      return start - NUM_OF_COLS; // current position - num of columns, move one row up
    case "down":
      return start + NUM_OF_COLS; // current position + num of coliums, move one row down
    case "left":
      return start - 1; // current position - 1, move one column to the left
    case "right":
      return start + 1; // current position + 1, move one colium to the right
  }
}

function isCorner(pos) {
  if (
    pos === 0 ||
    pos === NUM_OF_COLS - 1 ||
    pos === NUM_OF_COLS * NUM_OF_ROWS - NUM_OF_COLS ||
    pos === NUM_OF_COLS * NUM_OF_ROWS - 1
  ) {
    return true;
  }
  return false;
}

function whichCorner(corner) {
  let cornerDiv = [];
  switch (corner) {
    case 0:
      cornerDiv.push(
        corner,
        move(corner, "down"),
        move(corner, "right"),
        move(move(corner, "down"), "right")
      );
      break;
    case NUM_OF_COLS - 1:
      cornerDiv.push(
        corner,
        move(corner, "down"),
        move(corner, "left"),
        move(move(corner, "down"), "left")
      );
      break;
    case NUM_OF_COLS * NUM_OF_ROWS - NUM_OF_COLS:
      cornerDiv.push(
        corner,
        move(corner, "up"),
        move(corner, "right"),
        move(move(corner, "up"), "right")
      );
      break;
    case NUM_OF_COLS * NUM_OF_ROWS - 1:
      cornerDiv.push(
        corner,
        move(corner, "up"),
        move(corner, "left"),
        move(move(corner, "up"), "left")
      );
      break;
  }
  return cornerDiv;
}

function isLREdge(pos) {
  // check if left or right edge
  if (!isCorner(pos)) {
    // if not a corner
    if (pos % NUM_OF_COLS === 0 || pos % NUM_OF_COLS === NUM_OF_COLS - 1) {
      return true;
    }
  }
  return false;
}

function whichLREdge(edge) {
  let edgeDivLR = [];

  switch (edge % NUM_OF_COLS) {
    case 0:
      edgeDivLR.push(
        edge,
        move(edge, "up"),
        move(edge, "down"),
        move(edge, "right"),
        move(move(edge, "up"), "right"),
        move(move(edge, "down"), "right")
      );
      break;
    case NUM_OF_COLS - 1:
      edgeDivLR.push(
        edge,
        move(edge, "up"),
        move(edge, "down"),
        move(edge, "left"),
        move(move(edge, "up"), "left"),
        move(move(edge, "down"), "left")
      );
      break;
  }
  return edgeDivLR;
}

function isTBEdge(pos) {
  // check is top or bottom edge
  if (!isCorner(pos)) {
    if (
      (pos > 0 && pos < NUM_OF_COLS - 1) || // in the first row, between 0 and NUM_OF_COLS - 1
      (pos > NUM_OF_COLS * NUM_OF_ROWS - NUM_OF_COLS && // in the last row
        pos < NUM_OF_COLS * NUM_OF_ROWS - 1)
    ) {
      return true;
    }
  }
  return false;
}

function whichTBEdge(edge) {
  let edgeDivTB = [];

  if (edge < NUM_OF_COLS - 1) {
    edgeDivTB.push(
      edge,
      move(edge, "left"),
      move(edge, "right"),
      move(edge, "down"),
      move(move(edge, "down"), "right"),
      move(move(edge, "down"), "left")
    );
  } else {
    edgeDivTB.push(
      edge,
      move(edge, "left"),
      move(edge, "right"),
      move(edge, "up"),
      move(move(edge, "up"), "right"),
      move(move(edge, "up"), "left")
    );
  }
  return edgeDivTB;
}

function surroundingDiv(pos) {
  let divsAroundPos = [];
  let surDivMid = [
    pos,
    move(pos, "left"),
    move(pos, "right"),
    move(pos, "up"),
    move(move(pos, "up"), "left"),
    move(move(pos, "up"), "right"),
    move(pos, "down"),
    move(move(pos, "down"), "left"),
    move(move(pos, "down"), "right"),
  ];

  if (isCorner(pos)) {
    // console.log("is corner");
    for (let i = 0; i < whichCorner(pos).length; i++) {
      divsAroundPos.push(whichCorner(pos)[i]);
      // setDivColor(whichCorner(pos)[i], "green");
    }
  } else if (isLREdge(pos)) {
    // console.log("is LR edge");
    for (let i = 0; i < whichLREdge(pos).length; i++) {
      divsAroundPos.push(whichLREdge(pos)[i]);
      // setDivColor(whichLREdge(pos)[i], "green");
    }
  } else if (isTBEdge(pos)) {
    // console.log("is TB edge");
    for (let i = 0; i < whichTBEdge(pos).length; i++) {
      divsAroundPos.push(whichTBEdge(pos)[i]);
      // setDivColor(whichTBEdge(pos)[i], "green");
    }
  } else {
    // console.log("not edge or corner");
    for (let i = 0; i < surDivMid.length; i++) {
      divsAroundPos.push(surDivMid[i]);
      // setDivColor(surDivMid[i], "green");
    }
  }
  return divsAroundPos;
}

async function boggle() {
  let dict = await fetch(url);
  let txt = await dict.text();
  let allWords = txt.split("\n").join("").split("\r"); // splits text file into array of all words
  createGrid(NUM_OF_ROWS, NUM_OF_COLS);
  // let possibleWords = findAllPossibleWords(allWords);
  function checkWord(guess) {
    if (txt.includes(guess)) {
      console.log(word.value);
      foundOnGrid(word.value);
      console.log("yes");
    } else {
      error.innerHTML = "Not a word! Try again!";
    }
  }
  wordForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clear();
    checkWord(word.value);
    wordForm.reset();
  });
}

boggle();
