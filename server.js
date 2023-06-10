const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth')
const queryRoutes = require('./routes/queries')

const app = express();
app.use(session({
  secret: 'msn2023',
  resave: false,
  saveUninitialized: true
}));
session.userId = null
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRoutes)
app.use(queryRoutes)

app.use("/", express.static('./'));
app.listen(3001, () => { });
app.get('/', (req, res) => { res.sendFile(__dirname + "/home.html"); });


// TODO BACKEND:

// LOGIN OLAN USERIN SAVED ALBUMS, SAVED PLAYLISTS
// LOGIN OLAN KİŞİNİN TÜM ARKADAŞLARI ve bilgileri
// LOGIN OLAN KİŞİNİN AVATARı vs vs bilgileri
// ALBÜM içerik sayfası için ALBUM bilgileri
// aynısı playlist için
// aynısı artist profili için...

// TODO FRONTEND

// LOGIN
// HOME ve SEARCH scrollable
// SEARCH sayfası düzenlemesi/ekstra fonksiyonalite (checkbox falan)
// Artist profili


function exampleQuery(parameter, callback) {
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
app.listen(3001, () => { });

app.get('/', (req, res) => { res.sendFile(__dirname + "/login.html"); });
// app.get('/search', (req, res) => {res.sendFile(__dirname + "/search.html");});

