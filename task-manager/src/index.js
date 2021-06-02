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

// const jwt = require('jsonwebtoken')

// async function myFunction(){
//     let token = jwt.sign({_id:"abcdefghijklmnopqrstuvwxyz"}, 'thisismynewcoursec', {expiresIn: "7 days"})
//     console.log(token)

//     let data = jwt.verify(token, 'thisismynewcoursec')

//     console.log(data)
// }
// myFunction()