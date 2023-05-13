const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "Basile",
  port: 3306,
  host: "localhost",
  password: "root",
  database: "employees",
});
if (db) {
  console.log("connected to db");
}

app.post("/create", (req, res) => {
  const name = req.body.name;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  const age = req.body.age;

  db.query(
    "INSERT INTO employee (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],

    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("values inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employee", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const position = req.body.position;
  db.query(
    "UPDATE employee SET position= ? WHERE id =?",
    [position, id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employee WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.listen(9090, () => {
  console.log("server is running on port 9090");
});
