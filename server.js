require("./models/User");
const express = require('express')
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);


const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0-jprrl.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongoUri,{ useUnifiedTopology: true,useNewUrlParser: true  });

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/",requireAuth, (req, res) => {
    res.send("hello")
  });

app.listen(3000, () => console.log("Listeneing on port"));