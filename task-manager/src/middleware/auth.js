const jwt = require('jsonwebtoken')
const Users = require('../models/user')
const User = require('../models/user')
const auth = async (req, res, next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'new course')
        const user = User.findOne({_id: decoded._id, 'tokens.token':token })
        
        if(!user){
            throw new Error()
        }
        req.user = user
        next()
    } catch (e) {
        return res.status(401).sent({error:"Please authenticate!"})
    }
    next( )
}
module.exports = auth