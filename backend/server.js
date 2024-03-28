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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to KT's application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 