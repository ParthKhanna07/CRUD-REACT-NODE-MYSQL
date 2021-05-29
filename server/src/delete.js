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

module.exports.delete = (event, context, callback) => {

  app.delete("", (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName=? ";
    db.query(sqlDelete, name, (err, result) => {
      if (err) console.log(err);
    });
  });
}