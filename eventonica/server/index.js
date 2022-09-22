import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";
// const marlin = { name: "Marlin", email: "marlin@gmail.com", id: "1" };
// const nemo = { name: "Nemo", email: "nemo@gmail.com", id: "2" };
// const dory = { name: "Dory", email: "dory@gmail.com", id: "3" };

const pgp = pgPromise();
const db = pgp("postgres://localhost:5432/eventonica");

const app = express();
const PORT = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/users", async function (req, res, next) {
  try {
    const users = await db.any("SELECT * FROM users", [true]);
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get("/users/sortedId", async function (req, res, next) {
  try {
    const users = await db.any("SELECT * FROM users ORDER BY id", [true]);
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get("/users/sortedName", async function (req, res, next) {
  try {
    const users = await db.any("SELECT * FROM users ORDER BY name", [true]);
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.post("/users", async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
  };
  console.log("post", user);
  try {
    const users = await db.any("SELECT * FROM users", [true]);
    console.log("database", users);
    if (users.length === 0) {
      db.any("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    }
    const createdUser = await db.one(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      [user.name, user.email]
    );
    console.log("createdUser, post", createdUser);
    res.send(createdUser);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.put("/users/:id", async (req, res) => {
  // : acts as a placeholder
  const userId = req.params.id;
  console.log(userId);
  const user = {
    name: req.body.name,
    email: req.body.email,
  };
  console.log("put", user);
  try {
    await db.many("UPDATE users SET name=$1, email=$2 WHERE id=$3", [
      user.name,
      user.email,
      userId,
    ]);
    res.send({ status: "success" });
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/* Delete users listing. */

//Parameterized queries use placeholders instead of directly writing the
//values into the statements. Parameterized queries increase security and performance.

app.delete("/users/:id", async (req, res) => {
  // : acts as a placeholder
  const userId = req.params.id;
  console.log(userId);
  try {
    await db.many("DELETE FROM users WHERE id=$1", [userId]);
    res.send({ status: "success" });
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get("/events", async function (req, res, next) {
  try {
    const events = await db.any("SELECT * FROM events", [true]);
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get("/events/sortedId", async function (req, res, next) {
  try {
    const events = await db.any("SELECT * FROM events ORDER BY id", [true]);
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get("/events/sortedDate", async function (req, res, next) {
  try {
    const events = await db.any("SELECT * FROM events ORDER BY date", [true]);
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get("/events/sortedName", async function (req, res, next) {
  try {
    const events = await db.any("SELECT * FROM events ORDER BY name", [true]);
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get("/events/sortedCategory", async function (req, res, next) {
  try {
    const events = await db.any("SELECT * FROM events ORDER BY category", [
      true,
    ]);
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.post("/events", async (req, res) => {
  const event = {
    name: req.body.eventName,
    date: req.body.date,
    description: req.body.description,
    category: req.body.category,
  };
  console.log(req.body.eventName);
  console.log(event.name);
  try {
    const events = await db.any("SELECT * FROM events", [true]);
    if (events.length === 0) {
      db.any("ALTER SEQUENCE events_id_seq RESTART WITH 1");
    }
    const createdEvent = await db.one(
      "INSERT INTO events(name, date, description, category) VALUES($1, $2, $3, $4) RETURNING *",
      [event.name, event.date, event.description, event.category]
    );
    console.log(createdEvent);
    res.send(createdEvent);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/* Delete users listing. */

//Parameterized queries use placeholders instead of directly writing the
//values into the statements. Parameterized queries increase security and performance.

app.delete("/events/:id", async (req, res) => {
  // : acts as a placeholder
  const eventId = req.params.id;
  console.log(req.params.id);
  try {
    await db.many("DELETE FROM events WHERE id=$1", [eventId]);
    res.send({ status: "success" });
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.listen(PORT, () => console.log(`Hello, I am listening on port ${PORT}.`));
