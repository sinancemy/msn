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
app.listen(3000, () => { });
app.get('/', (req, res) => { res.sendFile(__dirname + "/home.html"); });


// TODO BACKEND:

// LOGIN OLAN USERIN FOLLOWLADIĞI ARTİSTLER (TOP5 / HEPSİ), SAVED ALBUMS, SAVED PLAYLISTS
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

