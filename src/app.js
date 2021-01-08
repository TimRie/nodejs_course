const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weatherstack')

const app = express()

//path definitions
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weahter App',
        name: 'Timo Rieskamp'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: 'This is the first message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide an address.'
        })
    }
    geocode(req.query.address, (error, {coordinates, location} = {}) => {
        if (error) {
            return res.send({
                error: 'Location not found.'
            })
        }
        forecast(coordinates[1],coordinates[0], (error, forecastData) => {
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            })
        })
    })
})

//error pages
 app.get('/help/*', (req, res) => {
     console.log("testtesttest")
     res.render('404',{
        title: '404 Error help',
        message: 'Help article not found.'
     })
})

app.get('*', (req, res) => {
    console.log("test")
    res.render('404', {
        title: '404 Error',
        message: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})