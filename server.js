const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const mongodb = require("mongodb")

// const mongoClient = mongodb.MongoClient; 
// const multer = require("multer");
// const path = require("path");





//Rotues imports and name saved by us
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const hospitalRoute = require("./routes/hospitalUser");


// app.use("/images", express.static(path.join(__dirname, "/images")));

// //route for document upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.put("/api/uploads", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });



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
app.use("/api/user", userRoute);
app.use("/api/hospitalUser",hospitalRoute);











//Connection backend 
  app.get("/", (req, res) => {
    res.send("<h1>Welcome To Backend Server</h1>");
  });







  
const port = 5000
app.listen(port, () => {
  console.log(
     `Server Running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT} Successfully...`
      );
});