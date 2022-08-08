const express = require('express')
const router = express.Router()
const otpServ = require('../utils/otp');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = "jGa3BhjuS2Msg"
// const bcrypt = require("bcryptjs");



//Authenticate
let authenticate = function (req, res, next) {
  if (req.headers.authorization) {
      try {
          let result = jwt.verify(req.headers.authorization, secret);
          next();
      } catch (error) {
          res.status(401).json({ message: "Token Invalid" })
      }
  } else {
      res.status(401).json({ message: "Not Authorized" })
  }
}





//User Register
router.post("/register", async (req, res) => {
  const { name, number, inlineRadioOptions } = req.body;
  const otpService = otpServ();
  const userExist = await User.findOne({ number });
  if (userExist) {
    res.status(200).json({ status: "User Already Exists!" });
  } else {
    var userReg = new User({
      name: name,
      number: number,
      inlineRadioOptions:inlineRadioOptions,
      otp: otpService
    })
    await userReg.save(function (err, userObj) {

      if (err) {
        console.log(err);
        res.status(200).json({ status: "error" })

      } else {
        res.status(200).json({ status: "success" })
        console.log("UserObj" + userObj)

      }
    })
  }
});




//Login
router.post('/login', async (req, res) => {
  const { number } = req.body
  try {
    const user = await User.find({ number });
    if (user.length > 0) {

      res.status(200).json({ message: "Regitered user" })
    } else {
      res.status(200).json({
        message: 'Login Failed'
      })
    }
  } catch (error) {
    res.status(200).json({
      message: 'Something Went Wrong'
    })
  }
})




// OTP
router.post("/otp", async (req, res) => {

  const user = await User.findOne({ number: req.body.number});
  let otpValidated = false;

  if(!user){
    res.status(200).json({status:"Failed"})
  }else{
  if (parseInt(req.body.otp) == user.otp) {
    otpValidated = true;
  if (otpValidated) {
    let token = jwt.sign({ userid: user._id }, secret, { expiresIn: "1h" });
    res.json({ token })
    console.log(token)
  } else {
    res.status(200).json({ message: "OTP did not match" })
  }}
}
})


//USERDASHBOARD
router.get("/userdashboard", authenticate, function (req, res) {
  res.json({ authorization: "successful" })
})










module.exports = router 