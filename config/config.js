//configuration of mongodb

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log(
      `Mongodb DataBase Connected! ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

module.exports = connectDB;