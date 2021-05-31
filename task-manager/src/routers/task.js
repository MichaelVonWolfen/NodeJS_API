const express = require('express')
require('../db/mongoose')
const Tasks = require('../models/task')

const taskRouter = express.Router()
taskRouter.get('/tasks/:id',(req,res) =>{
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
taskRouter.get('/tasks',(req,res) =>{
    Tasks.find({}).then((tasks) =>{
        res.send(tasks)
    }).catch((e) =>{
        res.sendStatus(500)
    })
})
taskRouter.post('/tasks',(req, res) =>{
    const task = new Tasks(req.body)
    task.save().then((task) =>{
        res.send(task)
    }).catch((e) =>{
        res.status(400).send(e)
    })
})
taskRouter.patch('/tasks/:id', async (req, res) =>{
    let updates = Object.keys(req.body)
    let allowedUpdates = ['description', 'completed']
    let isValid = updates.every((update) => allowedUpdates.includes(update))

    let {id} = req.params
    if(!isValid) return res.sendStatus(400)
    try {
        let task = await Tasks.findByIdAndUpdate(id, req.body, {upsert:true, new:true, runValidators:true})
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
taskRouter.delete('/tasks/:id', async(req, res) =>{
    let {id} = req.params
    try{
        let task = await Tasks.findByIdAndDelete(id)
        if(!task){
            return res.sendStatus(404)
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
    
})

module.exports = taskRouter