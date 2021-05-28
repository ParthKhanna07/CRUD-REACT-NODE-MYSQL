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

module.exports.get = (event, context, callback) => {

app.get("", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews  ";
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  });
}