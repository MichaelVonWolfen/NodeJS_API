const express = require('express')
const Users = require('../models/user')
const auth = require('../middleware/auth')
const { rawListeners } = require('../models/user')
require('../db/mongoose')

const userRouter = express.Router()

userRouter.post('/users/login',async (req, res) =>{
    try {
        const user = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateNewToken()
        res.send({user: await user.getPublicData(), token})
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})
userRouter.post('/users/logout', auth, async (req, res) =>{
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        res.send("Succes")
        await req.user.save()
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})
userRouter.post('/users/logoutAll', auth, async (req, res) =>{
    try {
        req.user.tokens = []
        res.send("Succesfully deleted all sessions")
        await req.user.save()
    } catch (e) {
        res.sendStatus(500)
    }
})
userRouter.get('/users', async(req, res)=>{
    let users = await Users.find({})
    res.send(users)
})
userRouter.get('/users/me',auth, (req, res) =>{
    return res.send(req.user)
})
// userRouter.get('/users/:id',(req,res) =>{
//     let id = req.params.id
//     Users.findById(id).then((user)=>{
//         if(!user){
//             return res.sendStatus(404)
//         }
//         res.send(user)
//     }).catch((e)=>{
//         console.log(e)
//         res.sendStatus(500)
//     })
// })
userRouter.post('/users', async (req, res) =>{
    const user = new Users(req.body)
    
    try {
        let token = await user.generateNewToken()
        await user.save()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(500).send(error)
    }
})
userRouter.patch('/users/me', auth, async(req, res) =>{
    let updates = Object.keys(req.body)
    let allowedUpdates = ['name', 'email', 'age', 'password']
    let isValid = updates.every((update) => allowedUpdates.includes(update))
    if(!isValid)
        return res.sendStatus(400)
    try {
        let user = req.user
        updates.forEach(update => {
            user[update] = req.body[update]
        });
        res.send(user)
        await user.save()
    } catch (e) {
        res.status(400).send(e)
    }
})
userRouter.delete('/users', auth, async(req,res) =>{
    try {
        req.user.remove()
        res.send({succes:"Succesfully deleted user"})
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = userRouter