const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const userSchema = new Schema({
    name:{
        type : String
    },
    number:{
        type: Number,
        minLength:10
    },
    otp:{
        type: Number,
         minLength:4
    },
    inlineRadioOptions:{
        type: String,
        require: true
    }
},
    {timestamps:true},

)

const User = mongoose.model('User' , userSchema)
module.exports =User
