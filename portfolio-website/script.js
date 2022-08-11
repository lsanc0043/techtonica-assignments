const navBarList = [
    "Ingredients", "Steps to Make", "Links to Other Wonton Soup Recipes", "About Me"
]

for (let i = 0; i < navBarList.length; i++) {
    const label = document.createElement('a');
    label.innerText = navBarList[i];
    label.addEventListener('mouseover', function() {
        label.style.color = "white";
    })
    label.addEventListener('mouseout', function() {
        label.style.color = "black";
    })
    label.addEventListener('click', function() {
        label.setAttribute('href', `#${navBarList[i].split(" ").join("")}`);
        if (i === 3) {
            label.setAttribute('href', "./aboutme.html");
        }
        label.style.textDecoration = "none";
    })

    document.getElementById("navBar").appendChild(label);
}