const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;

const db = mysql.createConnection({
  user: USERNAME,
  host: HOST,
  password: PASSWORD,
  database: DATABASE,
});

app.post("/create", (req, res) => {
  const firstName = req.body.firstName;
  const lastName= req.body.lastName;
  const age = req.body.age;
  const balance = req.body.balance;
  const totalDebt = req.body.totalDebt;

  db.query(
    "INSERT INTO accounts (firstName, lastName, age, balance, totalDebt) VALUES (?,?,?,?,?)",
    [firstName, lastName, age, balance, totalDebt],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/accounts", (req, res) => {
  db.query("SELECT * FROM accounts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName= req.body.lastName;
  const age = req.body.age;
  const balance = req.body.balance;
  const totalDebt = req.body.totalDebt;
  console.log('here')
  db.query(
    "UPDATE accounts SET firstName = ?, lastName = ?, age = ?, balance = ?, totalDebt = ? WHERE id = ?",
    [firstName, lastName, age, balance, totalDebt, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM accounts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(5000, () => {
  console.log("Server Running");
});
