const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const orderSchema = require('./models/orderModels');
const factorySchema = require('./models/factoryModels');
// const favicon = require('serve-favicon')

require('dotenv').config;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(favicon(path.join(__dirname, 'public/moon-logo.png')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

mongoose.connect(`mongodb+srv://dannyh186:codenation@clusterduck-cpzou.mongodb.net/orders?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
    


app.get('/order', (req, res)=>{
    res.render('order')
});

app.post('/order', async(req, res) =>{
    const newOrder = new orderSchema({
            fullName: req.body.fullName,
            email: req.body.email,
            orderDate: orderSchema.orderDate,
            billingAddress: req.body.billingAddress,
            dispatchAddress: req.body.dispatchAddress,
            // orderID: orderSchema.orderID,
            productType: req.body.productType,
            quantity: req.body.quantity

        })
        newOrder.save()

        res.render('order', {newOrder:newOrder.toObject()});
        console.log(newOrder);
        
    });


app.get('/factory', (req, res)=>{
    res.render('factory')
});

const guernseyFactory = new factorySchema({
    factoryName: "GuernseyLoveIsland Ltd Factory",
    productType: ["Cards", "Mugs", "T-Shirts"],
    totalCapacity: 10000,
    currentCapacity:0,
    remainingCapacity:0,
})
guernseyFactory.save();

const proFactory = new factorySchema({
    factoryName: "ProFulfillingWorld Ltd Factory",
    productType: ["Cards", "Gifts"],
    totalCapacity: 5000,
    currentCapacity:0,
    remainingCapacity:0,
})
proFactory.save();

const coolFactory = new factorySchema({
    factoryName: "CygnificantlyCool Ltd Factory",
    productType: ["Gifts"],
    totalCapacity: 7000,
    currentCapacity:0,
    remainingCapacity:0,
})
coolFactory.save();

const doctorFactory = new factorySchema({
    factoryName: "DoctorsPackingSolutions Ltd Factory",
    productType: ["T-Shirts"],
    totalCapacity: 2000,
    currentCapacity:0,
    remainingCapacity:0,
})
doctorFactory.save();


app.get('/engineer', (req, res)=>{
    res.render('engineer')
});

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})
