const mongoose = require("mongoose");

//Connect to Loacal server

const connectDB = () => {
  mongoose.connect("mongodb://localhost/instagram");

  //connection response
  mongoose.connection
    .once("open", () => {
      console.log("Connection has been established");
    })
    .on("error", (error) => {
      console.log("Console error: ", error.message);
    });
};

module.export = connectDB;
