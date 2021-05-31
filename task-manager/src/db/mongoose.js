const mongoose = require("mongoose")

const conURL = 'mongodb://127.0.0.1:27017/task-manager-api'
mongoose.connect(conURL,{
                            useNewUrlParser: true, 
                            useCreateIndex:true,
                            useUnifiedTopology:true,
                        })
