import express, { response } from "express";
import cors from "cors";
import BOOKS from "./books.js";
import path from "path";

const app = express();
const PORT = 8080;

// configuring cors middleware
app.use(cors());

// to let the server know which directory we are working on
const __dirname = path.resolve();
app.use(express.static("client"));

// api/books
// creating the /api/books endpoint - GET request
app.get("/api/books", (req, res) => {
  res.json(BOOKS);
});

app.get("/api/addBooks", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "addBook.html"));
});

app.get("/", (req, res) => {
  // res.send(`Hello Techtonica this is my first RESTAPI`);
  // open the index.html that is in the client folder in your path
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, () => console.log(`Hola! Server running at port ${PORT}`));
