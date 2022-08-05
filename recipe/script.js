const ingredientList = [
    "1 lb of ground meat", "choice of baby spinach of napa cabbage",
"wonton/dumpling wrappers", "3 spoons of soy sauce", 
"1 spoon of dark soy sauce", "2 spoons of corn starch", 
"1 teaspoon of sugar", "a pinch of salt", "a pinch of white pepper", 
"a cup of water", "optional: mushrooms or green onions for fragrance"];

const navBarList = [
    "Ingredients", "Steps to Make", "Links to Other Wonton Soup Recipes", "About Me"
]

function check(target, phrase) { // adds checkboxes
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.setAttribute('type', "checkbox")
    label.innerHTML = phrase;
    // label.style.textDecoration = "none";
    
    input.addEventListener('change', function () {
        if (this.checked) {
            label.style.textDecoration = "line-through";
        } 
        else {
            label.style.textDecoration = "none";
        }
    })

    target.appendChild(input);
    target.appendChild(label);
}

for (let i = 0; i < ingredientList.length; i++) {
    const li = document.createElement('li');
    check(li, ingredientList[i]);
    document.getElementById("Ingredients").appendChild(li);
}

for (let i = 0; i < navBarList.length; i++) {
    const label = document.createElement('a');
    label.innerText = navBarList[i];
    label.style.margin = "0px 70px 0px";
    label.addEventListener('mouseover', function() {
        label.style.color = "white";
    })
    label.addEventListener('mouseout', function() {
        label.style.color = "black";
    })
    label.addEventListener('click', function() {
        label.setAttribute('href', `#${navBarList[i].split(" ").join("")}`);
        label.style.textDecoration = "none";
    })

    document.getElementById("navBar").appendChild(label);
}

const button = document.getElementById("bttn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

button.addEventListener('click', topFunction);


