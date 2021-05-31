const express = require('express')
const Users = require('../models/user')
require('../db/mongoose')

const userRouter = express.Router()
userRouter.get('/users/:id',(req,res) =>{
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
userRouter.get('/users',(req, res) =>{
    Users.find({}).then((users)=>{
        res.send(users)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
userRouter.post('/users', async (req, res) =>{
    const user = new Users(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
    // user.save().then((user)=>{
    //     res.send(user)
    // }).catch((err)=>{
    //     res.sendStatus(500)
    // })
})
userRouter.patch('/users/:id', async(req, res) =>{
    let updates = Object.keys(req.body)
    let allowedUpdates = ['name', 'email', 'age', 'password']
    let isValid = updates.every((update) => allowedUpdates.includes(update))
    if(!isValid)
        return res.sendStatus(400)
    try {
        let {id} = req.params
        console.log(req.params,req.body)
        const user = await Users.findByIdAndUpdate(
                            id, 
                            {
                                $set:{
                                    "email":req.body.email
                                },
                            },
                            {
                                new:true, 
                                runValidators:true, 
                                upsert:true
                            })
        console.log(user)
        if(!user)
            return res.sendStatus(404)
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
userRouter.delete('/users/:id', async(req,res) =>{
    let {id} = req.params
    try {
        const user = await Users.findByIdAndDelete(id)
        if(!user)
            return res.sendStatus(404)
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = userRouter