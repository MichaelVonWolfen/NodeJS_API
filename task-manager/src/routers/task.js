const express = require('express')
require('../db/mongoose')
const Tasks = require('../models/task')

const taskRouter = express.Router()
const auth = require('../middleware/auth')
const { ObjectID } = require('bson')

taskRouter.get('/tasks/:id',auth, async (req,res) =>{
    let _id = req.params.id
    try {
        let task = await Tasks.find({_id, owner:req.user._id})
        if(task.length ===0){
            return res.sendStatus(404)
        }
        return res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})
taskRouter.get('/tasks',auth, async(req,res) =>{
    try{
        await req.user.populate('task').execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.sendStatus(500)
    }
})
taskRouter.post('/tasks', auth, async (req, res) =>{
    try {
        const task = new Tasks({
            ...req.body,
            owner: req.user._id
        })
        res.send(task) 
        await task.save()
        
    } catch (error) {
        res.status(400).send(error)
    }
    
})
taskRouter.patch('/tasks/:id', async (req, res) =>{
    let updates = Object.keys(req.body)
    let allowedUpdates = ['description', 'completed']
    let isValid = updates.every((update) => allowedUpdates.includes(update))
    let {id} = req.params
    if(!isValid){
        return res.sendStatus(400)
    }        
    try {
        let task = await Tasks.findByIdAndUpdate(id, req.body, {upsert:true, new:true, runValidators:true})
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
taskRouter.delete('/tasks/:id',auth, async(req, res) =>{
    let {id} = req.params
    try{
        let task = await Tasks.findOneAndDelete({_id:ObjectID(id), owner: req.user._id})
        if(task==null){
            return res.sendStatus(404)
        }
        res.send(task)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
    
})

module.exports = taskRouter