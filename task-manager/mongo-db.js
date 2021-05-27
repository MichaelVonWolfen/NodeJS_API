
const {MongoClient, ObjectID} = require('mongodb')

const conURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

const id = new ObjectID()
console.log(id)

MongoClient.connect(conURL,{useNewUrlParser: true, useUnifiedTopology:true}, (error, client)=>{
    if(error) return console.log(error)

    const db = client.db(dbName)

    // db.collection('users').insertOne({
    //     name: "Mihai Stoica",
    //     age: 23
    // }, (error, result)=>{
    //     if (error)
    //        return console.log("Unable to insert user!")
    //     console.log(result.ops)
    // })
    // db.collection('users').insertMany([
    //     {
    //         name:'Jenn',
    //         age:28
    //     },
    //     {
    //         name:'GUnter',
    //         age:27
    //     }
    // ],(error, result) =>{
    //     if(error)
    //        return  console.log("Unable to insert document")
    //     console.log(result.ops)
    // })
//     db.collection('tasks').insertMany([
//         {
//             task:"Finish section 10",
//             completed:false
//         },
//         {
//             task:"Finish section 11",
//             completed:false
//         },
//         {
//             task:"Finish section 12",
//             completed:false
//         }
//     ],(error, result) =>{
//         if(error)
//             return console.log("Unable to insert the document provided")
//         console.log(result.ops)
//     })
})
