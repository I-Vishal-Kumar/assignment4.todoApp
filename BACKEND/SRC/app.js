require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { todoControler } = require("../controlers/todoControler");
const { loginSignup } = require("../controlers/loginSignup");
const MongoDBStore = require("connect-mongodb-session")(session);

const mongoose = require("mongoose");
const { USER } = require("../MODALS/db");
const port = process.env.PORT || 2000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.use(cookieParser());
app.use(express.json());
const WHITE_LIST = process.env.FRONTEND_LINK;
app.use(
  cors({
    origin: WHITE_LIST,
    credentials: true,
  })
);

let link = process.env.DB_LINK;

mongoose
  .connect(link)
  .then(function (db) {
    console.log("dtabse connected");
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  })
  .catch(function (err) {
    console.log(err);
  });

const one_day = 1000 * 60 * 60 * 100;

var store = new MongoDBStore({
  uri: link,
  databaseName: "assignment4",
  collection: "sessions",
});

app.use(
  session({
    secret: "vishal",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: "None",
      domain: WHITE_LIST,
      maxAge: one_day,
    },
    store: store,
  })
);

app.post("/login", loginSignup.LOGIN);
app.post("/signup", loginSignup.SIGNUP);

app.post("/create_note", todoControler.create_todo);
app.get("/retrive_notes", todoControler.get_todo);
app.post("/delete_note", todoControler.delete_todo);
