const mongoose = require("mongoose")
const validator = require("validator")

const conURL = 'mongodb://127.0.0.1:27017/task-manager-api'
mongoose.connect(conURL,{
                            useNewUrlParser: true, 
                            useCreateIndex:true,
                            useUnifiedTopology:true
                        })

// const task = new Tasks({
//     description:"Section 10",
//     completed:true
// })
// task.save()
// .then((res)=>{
//     console.log(res)
// })
// .catch((err) =>{
//     console.log(err)
//})
// const me = new Users({
//     name:"Letitia",
//     age:23,
//     email:' leti@lsacbucuresti.com ',
//     password:'testpasssword'
// })
// me.save()
// .then((res) =>{
//     console.log(res)
// })
// .catch((err) =>{
//     console.log(err)
// })