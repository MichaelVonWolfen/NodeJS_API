const express = require('express')
const app = express()
const weather = require('../../weather-app/utils/weather')
const geocode = require('../../weather-app/utils/geocode')
const path = require('path')
const views_path = path.join(__dirname, '../templates')

app.set('view engine', 'hbs')
app.set('views', views_path)
app.use(express.static(path.join(__dirname, '../public')))
app.get('/weather', (req, res)=>{
    geocode.geocode("Bucuresti",(error, data) =>{
        if(error)
            res.send(JSON.stringify(error))
        else 
            weather.weather(data,(error, data) =>{
                if(error)
                    res.send(JSON.stringify(error))
                else{
                    res.send(`<title>Hello Express</title>${JSON.stringify(data)}`)
                }
            })
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        name: "Mihai Stoica"
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        name:"Mihai Stoica"
    })
})
app.get('', (req, res) =>{
    res.render('index',{
        title:"Weather app",
        name: "Mihai Stoica"
    })
})
app.get('*', (req, res) =>{
    res.sendStatus(404)
})
app.listen(3000, () =>{
    console.log("Server is up on port 3000")
})