// navBar
const navBarList = [
    "About Me", "Projects", "Contact"
]

function oppColor(originalColor) {
    return (originalColor === "black") ? "white":"black";
}

function addColorOnEvent(element, event, color) {
    // const col = oppColor(element.style.color);
    return element.addEventListener(event, function () {
        element.style.color = color;
    })
}

for (let i = 0; i < navBarList.length; i++) {
    const link = document.createElement('a');
    const currNavText = navBarList[i];
    link.innerText = currNavText;
    addColorOnEvent(link, 'mouseover', "black");
    addColorOnEvent(link, 'mouseout', "white");
    link.addEventListener('click', function() {
        link.setAttribute('href', `#${currNavText.split(" ").join("")}`);
        if (link.innerText === "Contact") {
            link.setAttribute('href', "./contactForm.html")
        }
        link.style.textDecoration = "none";
    })
    document.getElementById("navBar").appendChild(link);
}

// typewriter functionality
function createTypewriter(location, quote, SPEED) {
    const txt = document.createElement('span');
    document.querySelector(`#${location}`).append(txt);
    let txtPosition = 0;
    return function typewriter() {
        txt.innerHTML = quote[0].substring(0, txtPosition);

        if (txtPosition++ != quote[0].length) {
            setTimeout(typewriter, SPEED)
        }
    }
}

const typeFirst = createTypewriter("first", ["Welcome to"], 100);
const typeSecond = createTypewriter("last", [`           my website!`], 100);

window.addEventListener("load", typeFirst);
window.addEventListener("load", typeSecond);

// scroll to top button
const button = document.getElementsByClassName("bttn");
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//     const isBlockDisplay = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20);
//     button.style.display = (isBlockDisplay ? 'block' : 'none');
// }

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
  
// document.getElementById("form").addEventListener('submit', function() {
//     console.log(document.getElementById("person").value);
// })
