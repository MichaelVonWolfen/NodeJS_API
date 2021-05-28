// require('../src/db/mongoose')
// const Tasks = require('../src/models/task')


// Tasks.findByIdAndRemove('60b0d89c3bb655b67584eaa9').then((res)=>{
//     console.log(res)
//     return Tasks.countDocuments({completed:false})
// }).then((count) =>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })
const doWOrk = async () => {
    return "test"
}
doWOrk().then((res)=>{
    console.log(res)
}).catch((e) =>{
    console.log(e)
})