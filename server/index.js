const serverless = require('serverless-http');
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");


const db = mysql.createPool({
  host: "mycrudappdb.cf8aou1pqhfm.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "MyCRUDAPP",
});
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());



app.get("", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews  ";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?); ";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.delete("", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName=? ";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate = "UPDATE movie_reviews SET movieReview=? WHERE movieName=? ";
  db.query(sqlUpdate, [review, name], (err, result) => {
    console.log(result);
    res.send(result);
  });
});

/*app.listen(3001, () => {
  console.log("port 3001");
});
*/
module.exports.handler = serverless(app);
