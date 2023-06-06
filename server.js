const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'phanchi99',
  database: 'world',
});

function diff_lang(country1, country2, callback){
  q = `
    # QUERY HERE
    `
  v = [country1, country2]
  pool.query(q, v, (error, results) => {
    if (error) throw error;
    callback(error, results);
  });
}

app.get('/getDiffLang', (req, res) => {
  const { country1, country2 } = req.query;
  diff_lang(country1, country2 , (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.use("/", express.static('./'));
app.listen(3000, () => {});


app.get('/', (req, res) => {res.sendFile(__dirname + "/main.html");});
