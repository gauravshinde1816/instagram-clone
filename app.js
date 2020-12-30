const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Post = require("./models/Post");
//

//DataBase connection
mongoose.connect("mongodb://localhost/instagram");

//connection response
mongoose.connection
  .once("open", () => {
    console.log("Connection has been established");
  })
  .on("error", (error) => {
    console.log("Console error: ", error.message);
  });

//Boy parser middleware
app.use(express.json());
//routes
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever is started at ${PORT}`));
