//import
const express = require('express')
const handlebars = require('express-handlebars')

//configure PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

//create an Express app instance
const app = express()

//configure handlebars engine
app.engine('hbs', handlebars({defaultLayout: 'default.hbs'}))
app.set('view engine', 'hbs')

let cart = []

//Middlewares/Routing
app.get(['/', 'index.html'], (req, res) => {
    res.status(200)
    res.type('text/html')
    res.render('addItem', {
        cart
    })
})

app.post('/', 
    express.urlencoded({ extended: true }),
    (req, res) => {
        let newObj = {
            item: req.body.item,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice
        }
        cart.push(newObj)
        res.status(201)
        res.type('text/html')
        res.render('addItem', {
            cart
        })
    }
)

//If all routing fails to match, redirect to default page
app.use((req, res) => {
    res.status(302)
    res.type('text/html')
    res.render('addItem', {
        cart
    })
})

//start
app.listen(PORT, () => {
    console.info(`App has started on ${PORT} at ${new Date()}`)
})