async function showBooks() {
  // <h5 class="book-title"><span>${book.title}</span>
  // <span>${book.authorLast}</span></h5>
  const URL = "http://localhost:8080/api/books";
  const response = await fetch(URL);
  const responseBooks = await response.json();

  for (let book of responseBooks) {
    const card = `<div class="row-4">
      <button class="card" style="background-image: url(${book.spine})">
        <div class="card-body">
          <h5></h5>
        </div>
      </button>
    </div>`;
    document.getElementById("books").innerHTML =
      document.getElementById("books").innerHTML + card;
  }

  const bookList = document.querySelectorAll("button");

  for (let i = 0; i < bookList.length - 1; i++) {
    bookList[i].addEventListener("click", () => {
      document.getElementById("book-info").innerHTML = `<div>
      <img src=${responseBooks[i].cover}>
      <h5>${responseBooks[i].title}</h5>
      <p>by ${responseBooks[i].authorFirst} ${responseBooks[i].authorLast}<p>
      <p>${responseBooks[i].length} pages</p>
      </div>`;
    });
  }
}

showBooks();

const mybttn = document.getElementById("")
