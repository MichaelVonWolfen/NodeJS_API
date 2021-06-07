const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')

const upload = multer({
    dest: 'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(docx|doc)$/)){
            cb(new Error('File must be a word document.'))
        }
        cb(undefined, true)
    }
})
const ErrorMidleware = ()=>{
    throw new Error("My middleware")
}
app.post('/upload',upload.single('upload'), (req, res) =>{
    res.sendStatus(200)
},(error, req, res, next) => {
    res.status(400).send(error.message)
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})