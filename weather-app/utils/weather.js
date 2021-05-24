const request = require('request')
const weather = ({latitude, longitude}, callbkack)=>{
    let url = `http://api.weatherstack.com/current?access_key=d40d3182e99d7d61cff1d825f97d6dac&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({url, json: true}, (error, {body})=>{
        if(error){
            callbkack("Unable to connect to the weather service.")
        }else if (body.error){
            callbkack("error at retrieving the weather")
        }else{
            let data = body.current
            let location = body.location
            callbkack(undefined,{
                description:data.weather_descriptions[0],
                real_temp:data.temperature, 
                location:location.name,
                region:location.region,
                country:location.country,
                temp_feels:data.feelslike
            })
        }
    })
}

module.exports ={weather: weather}