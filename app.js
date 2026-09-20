const express = require('express');
const session = require('express-session');
const passport = require('passport');
const PgSession = require('connect-pg-simple')(session);
const path = require('path');
const pool = require('./config/db');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: new PgSession({ pool, tableName: 'session' }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

require('./config/passport')();
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const membershipRoutes = require('./routes/membership');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', messageRoutes);
app.use('/', membershipRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
