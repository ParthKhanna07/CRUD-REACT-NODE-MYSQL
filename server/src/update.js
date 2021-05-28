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

module.exports.update = (event, context, callback) => {

  app.put("", (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview=? WHERE movieName=? ";
    db.query(sqlUpdate, [review, name], (err, result) => {
      console.log(result);
      res.send(result);
    });
  });
}