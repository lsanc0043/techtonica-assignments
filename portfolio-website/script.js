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
        label.style.textDecoration = "none";
    })

    document.getElementById("navBar").appendChild(label);
}