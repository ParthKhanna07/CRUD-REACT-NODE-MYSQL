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

module.exports.create = (event, context, callback) => {

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
}