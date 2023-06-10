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

app.get('/', (req, res) => {
  if (req.session.userId == null)
    res.sendFile(__dirname + "/login.html"); 
  else
    res.sendFile(__dirname + "/home.html")
});

// TODO BACKEND:

// ALBÜM içerik sayfası için ALBUM bilgileri
// aynısı playlist için
// aynısı artist profili için...

// TODO FRONTEND

// HOME ve SEARCH scrollable
// SEARCH sayfası düzenlemesi/ekstra fonksiyonalite (checkbox falan)
// Artist profili