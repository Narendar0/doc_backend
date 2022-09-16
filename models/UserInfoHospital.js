const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfoHospitalSchema = new Schema(
  {
    hospitalName: {
      type: String,
      require: true,
    },
    HospitalMobileNumber: {
      type: Number,
    },

    clinicalEstablishmentNumber: {
      type: Number,
    },

    HospitalRegistrationNumber: {
      type: Number,
    },

    NumberOfDoctors: {
      type: Number,
    },

    NumberOfBeds: {
      type: Number,
    },
   UPDTDS:{
  type: Object,
 },
    // doctorName: {
    //   type: String,
    // },

    // dob: {
    //   type: String,
    // },
    // doctorRegNumber:{
    //     type: Number
    // },

    // registeredState: {
    //   type: String,
    // },

    // acknowledgementNumber:{
    //     type: Number
    // },
    
    // highestQualification: {
    //     type: String,
    //   },

    //   dog:{
    //     type: String
    // },

    // experience:{
    //   type: Number
    // },

    // isApproved:{
    //   type: String,
    //    default: false

    // },

    uploads: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserInfoHospital = mongoose.model("UserInfoHospital", userInfoHospitalSchema);
module.exports = UserInfoHospital;
