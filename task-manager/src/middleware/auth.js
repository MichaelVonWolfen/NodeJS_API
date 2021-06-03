const jwt = require('jsonwebtoken')
const Users = require('../models/user')
const auth = async (req, res, next) =>{
    let i = 0
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = await jwt.verify(token, 'new course')
        const user = await Users.findOne({_id: decoded._id,'tokens.token':token })
        
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        // console.log(req)
        return next()
    } catch (e) {
        console.error(e)
        return res.status(401).send({error:"Please authenticate!"})
        
    }
}
module.exports = auth