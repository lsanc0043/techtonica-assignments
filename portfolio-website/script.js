// navBar
const navBarList = [
    "About Me", "Projects", "Contact"
]

for (let i = 0; i < navBarList.length; i++) {
    const label = document.createElement('a');
    label.innerText = navBarList[i];
    label.addEventListener('mouseover', function() {
        label.style.color = "black";
    })
    label.addEventListener('mouseout', function() {
        label.style.color = "white";
    })
    label.addEventListener('click', function() {
        label.setAttribute('href', `#${navBarList[i].split(" ").join("")}`);
        if (i === 2) {
            label.setAttribute('href', "./contactForm.html")
        }
        label.style.textDecoration = "none";
    })

    document.getElementById("navBar").appendChild(label);
}
// end navBar

// typewriter functionality
const span1 = document.createElement('span');
span1.textContent = "Welcome to";
const img = document.createElement('img');
img.setAttribute('src', "https://miro.medium.com/max/875/1*b2ZpVczibdIDlUbuN6S2ZA.png");
img.setAttribute('id', "pfp");
const span2 = document.createElement('span');
span2.textContent = " my website!";
document.querySelector("#first").append(span1);
document.querySelector("#last").append(span2);
let quoteArray = ["Welcome to"];
let quoteArray2 = ["             my website!"];
let textPosition = 0; 
let textPosition2 = 0; 
let speed = 100;
typewriter1 = () => {
    span1.innerHTML = quoteArray[0].substring(0, textPosition);
  
    if(textPosition++ != quoteArray[0].length) {
        setTimeout(typewriter1, speed);
    }
}
typewriter2 = () => {
    span2.innerHTML = quoteArray2[0].substring(0, textPosition2);
  
    if(textPosition2++ != quoteArray2[0].length) {
        setTimeout(typewriter2, speed)
    }
}
window.addEventListener("load", typewriter1);
window.addEventListener("load", typewriter2);

document.getElementById("form").addEventListener('submit', function() {
    document.querySelector("#person", "#email").required = true;
    console.log(document.getElementById("person").value);
})
// typewriter functionality

// scroll to top button
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
