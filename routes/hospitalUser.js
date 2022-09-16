const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "jGa3BhjuS2Msg";
const User = require("../models/User");
const UserInfoHospital = require("../models/UserInfoHospital");



let user;

// Get all Users in Hospital flow
router.get ("/", async (req, res, next) => {
    let user;
    try {
      user = await UserInfoHospital.find();
    } catch (err) {
      console.log(err);
    }
    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }
    return res.status(200).json({ user });
  });


// Get particular Users in Hospital flow

  router.get("/:id", async (req, res) => {
    try {
      const user = await UserInfoHospital.findById(req.params.id);
      const { otp, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });





// Post UserDetails in Hospital Flow
router.post("/userinfohospital", async (req, res) => {
  const userCheck = await User.findOne({ number: req.body.number });
  user = userCheck._id
  if (userCheck) {
    const newInfo = new UserInfoHospital({

      _id : user,
     hospitalName:req.body.hospitalName,
     HospitalMobileNumber:req.body.HospitalMobileNumber,
     clinicalEstablishmentNumber:req.body.clinicalEstablishmentNumber,
     HospitalRegistrationNumber:req.body.HospitalRegistrationNumber,
     NumberOfDoctors:req.body.NumberOfDoctors,
     NumberOfBeds:req.body.NumberOfBeds,
     number:req.body.number

    });
    try {
    const savedUser = await newInfo.save();
    res.status(200).json(savedUser);
    } catch (err) {
    res.status(500).json(err);
    }     
  }
});

//Update UserDetails in Hospital Flow

router.put("/userinfohospital", async (req, res) => {

  let token;

  token = req.body.token
  const decode = jwt.verify(token, secret);


  console.log("thaa"  + decode.users)
  req.user = await UserInfoHospital.findById(decode.users);


  let userCheck = await UserInfoHospital.findOne({ _id: req.user  });
  console.log(userCheck)
  if (userCheck) {

     userCheck.UPDTDS = {

      name:req.body.name,
      dob:req.body.dob,
      doctorRegNumber:req.body.doctorRegNumber,
      registeredState:req.body.registeredState,
      acknowledgementNumber:req.body.acknowledgementNumber,
      highestQualification:req.body.highestQualification,
      dog:req.body.dog,
      experience:req.body.experience

    };
    await userCheck.save();
    res.status(200).json();
  }
});





  
  module.exports = router;