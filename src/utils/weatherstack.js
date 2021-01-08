const request = require('request')

const forecast = (lat, long, callback) => {
    url = `http://api.weatherstack.com/current?access_key=e108043133dc3b5aa87012d573e4f794&query=${lat},${long}`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Weatherstack API is note callable', undefined)
        } else if(body.error) {
            callback('Location not found', undefined)
        } else {
            const description = body.current.weather_descriptions
            const temperature = body.current.temperature
            callback(undefined, `It is currently ${description} and the temperature is ${temperature} degrees.`)
        }
    })
}

module.exports = forecast