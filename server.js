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
  database: 'msn',
});

// TODO BACKEND:

// LOGIN OLAN USERIN FOLLOWLADIĞI ARTİSTLER (TOP5 / HEPSİ), SAVED ALBUMS, SAVED PLAYLISTS
// LOGIN OLAN KİŞİNİN TÜM ARKADAŞLARI ve bilgileri
// LOGIN OLAN KİŞİNİN AVATARı vs vs bilgileri

// ALBÜM içerik sayfası için ALBUM bilgileri
// aynısı playlist için
// aynısı artist profili için...

// TODO MIDDLE:
// Queryleri bağlama işi vs vs.

// TODO FRONTEND

// LOGIN

// HOME ve SEARCH scrollable
// SEARCH sayfası düzenlemesi/ekstra fonksiyonalite (checkbox falan)
// Artist profili

function exampleQuery(parameter, callback){
  q = `
    # QUERY HERE
    `
  v = [parameter]
  pool.query(q, v, (error, results) => {
    if (error) throw error;
    callback(error, results);
  });
}

app.get('/getExampleQuery', (req, res) => {
  const { parameter } = req.query;
  exampleQuery(parameter, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.use("/", express.static('./'));
app.listen(3000, () => {});

app.get('/', (req, res) => {res.sendFile(__dirname + "/home.html");});
// app.get('/search', (req, res) => {res.sendFile(__dirname + "/search.html");});
