import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

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

app.get("/api/weather", (req, res) => {
  const params = new URLSearchParams({
    lat: req.query.lat,
    lon: req.query.lon,
    appid: process.env.API_KEY,
    units: "imperial",
  });
  console.log(params);
  // res.send();
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    });
  // const WEATHER = {
  //   coord: { lon: -95.3633, lat: 29.7633 },
  //   weather: [
  //     { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
  //   ],
  //   base: "stations",
  //   main: {
  //     temp: 307.13,
  //     feels_like: 312.19,
  //     temp_min: 304.77,
  //     temp_max: 308.87,
  //     pressure: 1013,
  //     humidity: 52,
  //   },
  //   visibility: 10000,
  //   wind: { speed: 1.34, deg: 143, gust: 4.02 },
  //   clouds: { all: 0 },
  //   dt: 1662580987,
  //   sys: {
  //     type: 2,
  //     id: 2001415,
  //     country: "US",
  //     sunrise: 1662552122,
  //     sunset: 1662597436,
  //   },
  //   timezone: -18000,
  //   id: 4699066,
  //   name: "Houston",
  //   cod: 200,
  // };
  // res.json(WEATHER);
});

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
