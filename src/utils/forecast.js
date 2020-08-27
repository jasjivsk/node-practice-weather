const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=41675c2266c7e03ad612e9051c4bc1e9&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location weather', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + ' It is currently ' +
                body.current.temperature + ' degrees out. There is a ' +
                body.current.precip + '% chance of rain'
            )
        }
    })
}

module.exports = forecast