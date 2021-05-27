
const {MongoClient, ObjectID} = require('mongodb')

const conURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(conURL,{useNewUrlParser: true, useUnifiedTopology:true}, (error, client)=>{
    if(error) return console.log(error)

    const db = client.db(dbName)
    db.collection('users').deleteMany({age: 26})
    .then((res) =>{
        console.log(res.deletedCount)
    })
    .catch((err) =>{
        console.log(err)
    })
    db.collection('tasks').deleteOne({
        task:"Finish section 12"
    }).then((res) =>{
        console.log(res.deletedCount)
    }).catch((err) =>{
        console.log(err)
    })
    // db.collection('tasks').updateMany({completed:false},{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result) =>{
    //     console.log("Succes! ", result.modifiedCount)
    // }).catch((error) =>{
    //     console.log("ERROR ", error)
    // })

    // db.collection('users').findOne({_id: new ObjectID('60af48161b023d68ed0f4748')},(error, user) =>{
    //     if(error)
    //         return console.log("Unable tu fetch")
    //     console.log(user)
    // })
    // db.collection('users').find({age:23}).toArray((error, result) =>{
    //     console.log(result)
    // })
    // db.collection('users').find({age:23}).count((error, result) =>{
    //     console.log(result)
    // })
    // db.collection('tasks').find({completed:false}).toArray((error, result) =>{
    //     console.log(result)
    // })
        
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: "VICRUM",
    //     age: 26
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
