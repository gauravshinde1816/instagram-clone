const mongoose = require("mongodb");
const config = require("config");
const MONGO_URI = config.get("MONGO_URI");

const connectDB = async (err) => {
  await mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Data base is connected");
  if (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
