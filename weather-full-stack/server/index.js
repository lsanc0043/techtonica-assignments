import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import COORDS from "./coordinates.js";

import { config } from "dotenv";
config();

const app = express();
const PORT = 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/coords", (req, res) => {
  res.json(COORDS); 
});

app.get("/api/weather", (req, res) => {
  const params = new URLSearchParams({
    lat: req.query.lat,
    lon: req.query.lon,
    appid: process.env.API_KEY,
    units: "imperial",
  });
  console.log(params);
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    });
});

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
