async function showBooks() {
  const URL = "http://localhost:8080/api/books";
  const response = await fetch(URL);
  const responseBooks = await response.json();

  const addURL = "http://localhost:8080/api/addedBooks";
  const addResponse = await fetch(addURL);
  const newBooks = await addResponse.json();

  const delURL = "http://localhost:8080/api/deletedBooks";
  const delResponse = await fetch(delURL);
  const oldBooks = await delResponse.json();

  for (let book of responseBooks) {
    const card = `<div class="row-4">
      <button class="card" style="background-image: url(${book.spine})">
        <div class="card-body">
        </div>
      </button>
    </div>`;
    document.getElementById("books").innerHTML =
      document.getElementById("books").innerHTML + card;
  }
  addBooks(responseBooks, newBooks);
  updateStatus(newBooks, oldBooks);
}

async function addBooks(books, newBooks) {
  const bookList = document.querySelectorAll("button");

  for (let i = books.length - newBooks.length; i < bookList.length - 1; i++) {
    bookList[i].setAttribute("class", "card");
    bookList[i].innerHTML = `<h5 class="book-title">
    <span> ${books[i].title}</span>
    </h5>
    <h5>
    <span id="bookAuthor">${books[i].authorLast}</span>
    </h5>`;
  }

  for (let i = 0; i < bookList.length - 1; i++) {
    bookList[i].addEventListener("click", () => {
      document.getElementById("book-info").innerHTML = `<div>
      <img src=${books[i].cover}>
      <h5>${books[i].title}</h5>
      <p>by ${books[i].authorFirst} ${books[i].authorLast}<p>
      <p>${books[i].length} pages</p>
      <button id="delete" onclick="deleteBook('${books[i].length}')">Delete</button>
      <button id="edit" onclick="editBook('${books[i].length}')">Edit</button>
      </div>`;
      editSelBook(books[i]);
    });
  }
}

function deleteBook(length) {
  const xhttp = new XMLHttpRequest();

  xhttp.open("DELETE", `http://localhost:8080/index.html/${length}`);
  xhttp.send();

  location.reload();
}

function editBook(length) {
  document.querySelector(".editForm").style.display = "block";

  // const xhttp = new XMLHttpRequest();
  // xhttp.open("PUT", `http://localhost:8080/index.html/${length}}`);
  // xhttp.send();
}

function editSelBook(book) {
  const inputs = document.querySelectorAll("input");
  const ids = [];
  const keys = Object.keys(book);
  const values = Object.values(book);

  for (let i = 0; i < inputs.length; i++) {
    ids.push(inputs[i].getAttribute("id"));
  }

  const filt = ids.filter((val) => keys.includes(val));
  const indices = filt.map((val) => ids.indexOf(val));
  for (let i = 0; i < indices.length; i++) {
    inputs[indices[i]].setAttribute("placeholder", values[i]);
  }
}

async function updateStatus(newBooks, oldBooks) {
  for (let i = 0; i < newBooks.length; i++) {
    const newBook = `<div><p>Added <strong>${newBooks[i].title}</strong> by <strong>${newBooks[i].authorFirst} ${newBooks[i].authorLast}</strong></p></div>`;
    document.getElementById("status-info-new").innerHTML += newBook;
  }

  for (let i = 0; i < oldBooks.length; i++) {
    const oldBook = `<div><p>Deleted <strong>${oldBooks[i].title}</strong> by <strong>${oldBooks[i].authorFirst} ${oldBooks[i].authorLast}</strong></p></div>`;
    document.getElementById("status-info-old").innerHTML += oldBook;
  }
}

showBooks();
