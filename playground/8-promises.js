const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("Succes")
    },2000)
    // reject("Eroare!")
})
doWorkPromise.then((result) =>{
    console.log(result)
}).catch((error) =>{
    console.log(error)
})