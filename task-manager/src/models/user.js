const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Tasks = require("./task")
const UserSchema = new mongoose.Schema({
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
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("Email is invalid!")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
UserSchema.pre('save', async function(next){
    let user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
UserSchema.pre('remove', async function(next){
    const user = this
    await Tasks.deleteMany({owner:user._id})
    next()
})
UserSchema.statics.findByCredentials = async (email, password) =>{
    const user = await Users.findOne({email : email})
    if(!user){
        throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user

}
UserSchema.methods.generateNewToken = async function(){
    let user = this
    let token = await jwt.sign({_id: user._id.toString()}, 'new course')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
UserSchema.methods.getPublicData = async function(){
    let user = this
    let userPublic = user.toObject()

    delete userPublic.password
    delete userPublic.tokens

    return userPublic
}
UserSchema.virtual('tasks',{
    ref: 'task',
    localField:'_id',
    foreignField: 'ownwer'
})
const Users = mongoose.model('user', UserSchema)

module.exports = Users