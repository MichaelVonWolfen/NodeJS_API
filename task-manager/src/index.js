const express = require('express')
const Users = require('./models/user')
require('./db/mongoose')
const Tasks = require('./models/task')
const { ObjectID } = require('bson')
const { update } = require('./models/user')


const app = express()
const port = process.env.port || 3000

app.use(express.json())



app.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})