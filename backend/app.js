const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const pictureRoute = require("./routes/picture");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
*/

app.use("/", pictureRoute);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sonyg.mongodb.net/${process.env.MONGODB_NAME}?authSource=admin&replicaSet=atlas-12s196-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("w: ", process.env.MONGODB_NAME);
      console.log("server run at 5000");
    });
  })
  .catch((err) => console.log(err));
