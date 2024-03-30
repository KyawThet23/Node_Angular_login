const express = require('express')
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "KT-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to KT's application." });
});

require('./app/routes/auth.route')(app);
require('./app/routes/user.route')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}