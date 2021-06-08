const http = require('http')
let url = `http://api.weatherstack.com/current?access_key=d40d3182e99d7d61cff1d825f97d6dac&query=45,-75`

const request = http.request(url,(response)=>{
    let data = ''

    response.on('data',(chunk)=>{
        data += chunk.toString()
    })
    response.on('end',()=>{
        const body = JSON.parse(data)
        console.log(body)
    })
})
request.end()
request.on('error', (error)=>{
    console.log(error)
})