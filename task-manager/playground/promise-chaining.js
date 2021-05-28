require("../src/db/mongoose")
const Users = require("../src/models/user")

Users.findByIdAndUpdate('60b0afcbb8fd54a7cbd80536',{
    age: 1
}).then((user)=>{
    console.log(user)
    return Users.countDocuments({age:1})
}).then((res)=>{
    console.log(res)
}).catch((e) =>{console.log(e)})