const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected", process.env.MONGO_URI);
  } catch (err) {
    console.error("Error connecting to Mongo DB",err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
