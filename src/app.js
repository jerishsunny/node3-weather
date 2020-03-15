const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const dirPath = path.join(__dirname,'..','public')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(dirPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'weather',
        name: 'Jerish'
    })
})
app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'weather',
        name: 'Jerish'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'weather',
        name: 'Jerish',
        message : 'this is the help file'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    } else {
        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                res.send({error: error})
            } else {

                forecast(longitude, latitude, (error, {summary, temp, prob}) => {
                    if (error) {
                        res.send({error: error})
                    } else {
                        //console.log('Data', dataforecast)
                        console.log('Geocode location: ', location)
                        console.log(summary + ' It is currently ' + temp + ' degress out. There is a ' + prob + '% chance of rain')
                        res.send({
                            location: location,
                            temparature: temp,
                            summary: summary,
                            probability: prob
                        })
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) =>{
    res.render('notfound',{
        message: 'Help article not Found'
    })
})
app.get('*',(req, res)=>{
    res.render('notfound',{
        message: 'Page not Found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is started on port 3000')
})