const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const userSchema = new Schema({
    name:{
        type : String,
        required:true
    },
    number:{
        type: Number,
        required:true,
        unique:true,
        minLength:10
    },
    otp:{
        type: Number,
         minLength:4
    },
    inlineRadioOptions:{
        type: String,
        require: true
    },
    isAdmin:{
        type: String,
        require: false
    }
},
    {timestamps:true},

)

const User = mongoose.model('User' , userSchema)
module.exports =User
