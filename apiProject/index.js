import express, { response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import BOOKS from "./books.js";
import path from "path";

const app = express();
const addedBooks = [];
const deletedBooks = [];
const editedBook = [];
const PORT = 8080;

// configuring cors middleware
app.use(cors());

// configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// to let the server know which directory we are working on
const __dirname = path.resolve();
app.use(express.static("client"));

// api/books
// creating the /api/books endpoint - GET request
app.get("/api/books", (req, res) => {
  res.json(BOOKS);
});
app.get("/api/addedBooks", (req, res) => {
  res.json(addedBooks);
});
app.get("/api/deletedBooks", (req, res) => {
  res.json(deletedBooks);
});
app.get("/api/editBook", (req, res) => {
  res.json(editedBook);
});

app.get("/index.html/:length", (req, res) => {
  const length = req.params.length;
  for (let book of BOOKS) {
    if (book.length === length) {
      res.json(book);
      return;
    }
  }

  // Sending 404 when not found something is a good practice
  res.status(404).send("Book not found");
});

app.get("/", (req, res) => {
  // res.send(`Hello Techtonica this is my first RESTAPI`);
  // open the index.html that is in the client folder in your path
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.post("/index.html?", (req, res) => {
  const book = req.body;
  addedBooks.push(book);
  BOOKS.push(book);

  res.redirect("/index.html?");
});

// app.put("/index.html?/:length", (req, res) => {
// const length = req.params.length;
// const book = req.body;

// for (let i = 0; i < BOOKS.length; i++) {
//   if (BOOKS[i].length === length) {
//     editedBook.push(BOOKS[i]);
//   }
// }
// res.send(console.log("put request called"));

// res.redirect("/index.html?");
// });

app.delete("/index.html/:length", (req, res) => {
  const length = req.params.length;
  for (let i = 0; i < BOOKS.length; i++) {
    if (BOOKS[i].length === length) {
      deletedBooks.push(BOOKS[i]);
      BOOKS.splice(i, 1);
    }
  }

  for (let i = 0; i < addedBooks.length; i++) {
    if (addedBooks[i].length === length) {
      addedBooks.splice(i, 1);
    }
  }
});

app.listen(PORT, () => console.log(`Hola! Server running at port ${PORT}`));
