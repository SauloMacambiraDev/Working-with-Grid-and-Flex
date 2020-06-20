const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/.env`})
const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const path = require('path')

const routes = require('./routes') 

const app = express()
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use(morgan('tiny'))

// Setting template engine
app.engine('.hbs', hbs({
    layoutsDir: path.resolve(__dirname, 'views', 'layouts'),
    partialsDir: path.resolve(__dirname, 'views', 'partials'),
    extname: '.hbs', 
    defaultLayout: 'main'
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// Importing routes
app.use(routes)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listenning on port ${process.env.PORT || 3000}`)
})


