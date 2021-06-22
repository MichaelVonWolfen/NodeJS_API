const request = require('request')
const geocode = (address, callbkack)=>{
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoidm9ud29sZmVuIiwiYSI6ImNrb3ZpOWkxcjAzMmwyb3V0eTZoem1rdDUifQ.vqGek0F-cupV2qqdV6N_mw&limit=1`

    request({url, json:true}, (error, {body}) =>{
        let data = body.features[0]
        if(!data){
            return callbkack({error: `No location has been found for '${address}'`})
        }
        if(error){
            callbkack(error)
        }else if (body.message){
            callbkack(body.message)
        }else{
            callbkack(undefined ,{latitude:data.center[1], longitude:data.center[0], name:data.place_name})
        }
    })
}

module.exports ={geocode: geocode}