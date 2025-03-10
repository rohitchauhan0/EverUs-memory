const mongoose = require('mongoose')

const authModal = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    token:{
        type:String,
    }
})

module.exports = mongoose.model("Auth", authModal)