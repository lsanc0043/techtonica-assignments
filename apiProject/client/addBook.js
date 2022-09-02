const yesImg = document.getElementById("yes");
const noImg = document.getElementById("no");
const imgForm = document.querySelector(".showCoverSpine");

function yesFunc() {
  let x = document.getElementById("yes").checked;
  if (x === true) {
    imgForm.style.display = "block";
  }
}

function noFunc() {
  let x = document.getElementById("no").checked;
  if (x === true) {
    imgForm.style.display = "none";
  }
}
