const express = require("express");
const router = express.Router();
const UserInfo = require("../models/UserInfo");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = "jGa3BhjuS2Msg";


let user;

// Get all Users
router.get ("/", async (req, res, next) => {
    let user;
    try {
      user = await UserInfo.find();
    } catch (err) {
      console.log(err);
    }
    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }
    return res.status(200).json({ user });
  });
  


//  Get User By ID
  router.get("/:id", async (req, res) => {
    try {
      const user = await UserInfo.findById(req.params.id);
      const { otp, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
   


//Post UserDetails in clinic flow
  router.post("/userinfo",  async  (req, res) => {
    const userCheck = await User.findOne({ number: req.body.number });
    user = userCheck._id
    if (userCheck) {
      const newUser = new UserInfo({
        _id: user,
        name: req.body.name,
        dob: req.body.dob,
        identificationNumber: req.body.identificationNumber,
        acknowledgementNumber: req.body.acknowledgementNumber,
        highestQualification: req.body.highestQualification,
        dog: req.body.dog,
      });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
    }
  });



  //Update UserDetails in clinic flow
router.put("/userinfo",  async (req, res) => {

  let token;
  token = req.body.token
  const decode = jwt.verify(token, secret);

  console.log("thaa" + decode.users)
  req.user = await UserInfo.findById(decode.users);

  const userCheck = await UserInfo.findOne({ _id: req.user });
  console.log(userCheck)
  if (userCheck) {
     userCheck.UPDTD = {
      checked: req.body.checked,
      fromTime: req.body.fromTime,
      toTime: req.body.toTime,
      consultationFees: req.body.consultationFees,
      location: req.body.location,
      upload:req.body.upload
    }
 await userCheck.save(function (err, userObj) {
    if (err) {
      console.log(err);
      res.status(200).json({ status: "error" });
    } else {
      res.status(200).json({ status: "success" });
      console.log("UserObj" + userObj);
    }
  } 
 );
} 
});

router.put("/approval/:id",  async (req, res) => {

  const userCheck = await UserInfo.findOne({ _id: req.user });
  console.log(userCheck)
  if (userCheck) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});






  module.exports = router;