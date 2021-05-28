const mongoose = require("mongoose")
const validator = require("validator")

const Users = mongoose.model('user',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw Error("Password cannot contain password")
            }
        }

    },
    age:{
        type:Number,
        validate(value){
            if(value <= 0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("Email is invalid!")
            }
        }
    }
})

module.exports = Users