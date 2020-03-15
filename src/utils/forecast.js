const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/116d9d720ba3f01c3372d7149f35b7aa/'+latitude+','+longitude+'?exclude=hourly&units=si'
    request( {url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                prob: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast