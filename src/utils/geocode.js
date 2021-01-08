const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmllcmthc3RlbiIsImEiOiJja2psZnR0dnYwODduMzBsOXFzdzBpYzBzIn0.cjcF9FeOYjSvNLsNJWpIUg`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to API', undefined)
        } else if (body.features.length === 0) {
            callback('Location was not found', undefined)
        } else {
            const coordinates = body.features[0].center
            callback(undefined, {coordinates: coordinates, location: body.features[0].place_name})
        }
    })
}

module.exports = geocode