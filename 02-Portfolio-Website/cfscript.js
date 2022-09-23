document.getElementById("form").addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(document.getElementById("person").value + " has been added to your mailing list.");
    console.log("Their email is: " + document.getElementById("email").value);
})