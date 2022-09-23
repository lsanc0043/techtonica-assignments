import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hey little mama, lemme whisper in your ear");
});

app.get("/api/categories", (req, res) => {
  fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.get("/api/questions", async (req, res) => {
  const params = new URLSearchParams({
    category: req.query.category,
    amount: req.query.amount,
    difficulty: req.query.difficulty,
    type: req.query.type,
  });
  const url = `https://opentdb.com/api.php?${params}`;
  const response = await fetch(url);
  const data = await response.json();
  res.send(data);
});

app.listen(PORT, () => console.log(`Hello! You are listening on port ${PORT}`));
