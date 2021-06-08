const weather = require('./utils/weather')
const geocode = require('./utils/geocode')
const { argv } = require('process')
if(!argv[2]){
    return console.log("Nu a fost primita o locatie care sa fie cautata")
}
geocode.geocode(argv[2], (error, data) =>{
    if( error)
        return console.log(error)
    weather.weather(data, (error, data)=>{
        if(error){
            return console.log(error)
        }
        console.log(data)
    })
})