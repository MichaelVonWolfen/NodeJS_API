const Tasks = mongoose.model('tasks',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type: Boolean,
        default:false
    }
})