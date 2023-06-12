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

app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRoutes)
app.use(queryRoutes)

app.use("/", express.static('./'));
app.listen(3001, () => { });

app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = -1;
  }
  next();
});

app.get('/', (req, res) => {
  if (req.session.userId == -1)
    res.sendFile(__dirname + "/pages/login.html"); 
  else
    res.sendFile(__dirname + "/pages/home.html")
});

// TODO BACKEND:

// DELETE REACTION


// TODO FRONTEND

// HOME ve SEARCH scrollable
// SEARCH sayfası düzenlemesi/ekstra fonksiyonalite (checkbox falan)
// Artist profili