const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('pk_test_79JeVWRj8aRBf0p5kjYM6Hlr00vy6T5coG');
// const uuid = require('uuid/v4');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('HELLO')
})

app.post('/payment', (req, res) => {

    // token can contain all the customer data
    const {product, token} = req.body;
    console.log('PRODUCT:', product);
    console.log('PRODUCT:', product.price);
    // give a different key so user wont be charged twice
    const idempontencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, ({idempontencyKey}))
    }).then(result => res.status(200).json(result))
      .catch(err => console.log(err))
})

// listen
app.listen(3001, () => console.log('Listening 👂...'))