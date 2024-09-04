const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb Connected Successfully");
  } catch (error) {
    console.log("Error while connecting Mongodb", error.message);
  }
};

module.exports = connectDb;
