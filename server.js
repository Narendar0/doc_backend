const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const mongodb = require("mongodb")




//Rotues imports and name saved by us
const authRoute = require("./routes/auth");



//DB
connectDb();





dotenv.config();
app.use(express.json());




//cors
app.use(cors(
    {

        origin:"*"
    }
  ))

  



//Routes use after imports
app.use('/api/auth', authRoute)










//Connection backend 
  app.get("/", (req, res) => {
    res.send("<h1>Welcome To Node Server</h1>");
  });







  
const port = 5000
app.listen(port, () => {
  console.log(
     `Server Running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT} Successfully...`
      );
});