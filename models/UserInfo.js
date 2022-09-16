const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const userInfoSchema = new Schema({
    name:{
        type : String,
        require: true
    },
    dob:{
        type: String
    },
    identificationNumber:{
        type: Number
    },
    acknowledgementNumber:{
        type: Number
    },  
    highestQualification: {
        type: String,
      },
   
    dog:{
        type: String
    },
    
    UPDTD:{
        type : Object
    },
    // checked:{
    //     type: []
    // },
    // fromTime:{
    //     type: String
    // },
    // toTime:{
    //     type: String
    // },
    // consultationFees:{
    //     type: Number
    // },
    // location:{
    //     type: String
    // },   
    approved:{
        type: Object,
         default: false
      },

    uploads:{
        type: String
    },   
    
},
    {timestamps:true},

)

const UserInfo = mongoose.model('UserInfo' , userInfoSchema)
module.exports =UserInfo