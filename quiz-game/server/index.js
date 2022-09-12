import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("hey little mama, lemme whisper in your ear");
});

app.get("/api/categories", (req, res) => {
  fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.listen(PORT, () => console.log(`Hello! You are listening on port ${PORT}`));
