const express = require('express')
const Users = require('./models/user')
require('./db/mongoose')
const Tasks = require('./models/task')


const app = express()
const port = process.env.port || 3000

app.use(express.json())

app.get('/users/:id',(req,res) =>{
    let id = req.params.id
    Users.findById(id).then((user)=>{
        if(!user){
            return res.sendStatus(404)
        }
        res.send(user)
    }).catch((e)=>{
        console.log(e)
        res.sendStatus(500)
    })
})
app.get('/users',(req, res) =>{
    Users.find({}).then((users)=>{
        res.send(users)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
app.post('/users', (req, res) =>{
    const user = new Users(req.body)
    user.save().then((user)=>{
        res.send(user)
    }).catch((err)=>{
        res.sendStatus(500)
    })
})
app.get('/tasks/:id',(req,res) =>{
    let id = req.params.id
    Tasks.findById(id).then((task) =>{
        if(!task){
            res.sendStatus(404)
        }
        res.send(task)
    }).catch((e) =>{
        res.sendStatus(500)
    })
})
app.get('/tasks',(req,res) =>{
    Tasks.find({}).then((tasks) =>{
        res.send(tasks)
    }).catch((e) =>{
        res.sendStatus(500)
    })
})
app.post('/tasks',(req, res) =>{
    const task = new Tasks(req.body)
    task.save().then((task) =>{
        res.send(task)
    }).catch((e) =>{
        res.status(400).send(e)
    })
})
app.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})