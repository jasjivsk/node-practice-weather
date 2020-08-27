const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const { rawListeners } = require('process')

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//Setup 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'JJ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'JJ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'help message',
        title: 'Help',
        name: 'JJ'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address term' })
    }
    console.log(req.query.address)

    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error: 'Error in processing geocode' })
        }

        forecast(latitude, longtitude, (error, forcastData) => {
            if (error) {
                return res.send({ error: 'error in fetching forecast' })
            }
            res.send({
                location,
                forecast: forcastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send(
            { error: 'You must provide a search term' }
        )
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404 Page',
        name: 'JJ'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'My 404 Page',
        title: '404 Page',
        name: 'JJ'
    })
})

app.listen(3000, '192.168.12.131', () => {
    console.log('Server is up now on port 3000')
})