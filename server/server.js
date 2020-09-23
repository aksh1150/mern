const express = require("express");
const mongoose = require("mongoose");
const note = require("./models/note");
const app = express();

const API_PORT = process.env.PORT || 8080;

app.use(express.json());

const dbPath =
  "mongodb+srv://<username>:<password>@cluster0.n8a27.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(dbPath, {
    dbName: "mern",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  const { title, author, body } = req.body;
  let newNote = new note({
    title,
    author,
    body,
  });
  newNote
    .save()
    .then((note) => {
      console.log("NOTE SAVED");
      res.json(note);
    })
    .catch((err) => {
      console.log("Error on saving.");
      res.send("ERROR.");
    });
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

// mongodb+srv://<username>:<password>@cluster0.n8a27.mongodb.net/<dbname>?retryWrites=true&w=majority
