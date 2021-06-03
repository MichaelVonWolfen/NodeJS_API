const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.port || 3000

// app.use((req, res, next) =>{
//     res.status(503).send("Site under maintanance!")
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})
// const User = require('./models/user')
// const Task = require('./models/task')
// const Users = require('./models/user')
// // const jwt = require('jsonwebtoken')

// // async function myFunction(){
// //     let token = jwt.sign({_id:"abcdefghijklmnopqrstuvwxyz"}, 'thisismynewcoursec', {expiresIn: "7 days"})
// //     console.log(token)

// //     let data = jwt.verify(token, 'thisismynewcoursec')

// //     console.log(data)
// // }
// // myFunction()
// const main = async() =>{
//     // const task = await Task.findById('60b7a1855e65f916ddd8740e')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user = await User.findById('60b7a1765e65f916ddd8740b')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
    
// }
// main()