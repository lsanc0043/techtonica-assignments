import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());

// sets the default page
app.get("/", (req, res) => {
  res.json("Hello from Techtonica!");
});

// hardcode the student response since we are not fetching any outer data
app.get("/api/students", (req, res) => {
  // an array of student objects to show up to my 2 pm class
  const STUDENTS = [
    { firstname: "Lisa", lastname: "Lee" },
    { firstname: "Cristina", lastname: "Rodriguez" },
    { firstname: "Diana", lastname: "Olivas" },
    { firstname: "Andrea", lastname: "Sanchez" },
    { firstname: "Paola", lastname: "Trejo" },
  ];
  res.json(STUDENTS);
});

app.listen(PORT, () =>
  console.log(`Hello, you are listening to port ${PORT}.`)
);
