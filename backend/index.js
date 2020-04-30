const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('sk_test_X6Mq078VjyCBw8EPzEShrc6T00dLoNmigu');
const { v4: uuidv4 } = require('uuid');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('HELLO')
})

app.post("/payment", (req, res) => {

    // token can contain all the customer data
    const {product, token} = req.body;
    console.log('PRODUCT:', product);
    console.log('PRODUCT:', product.price);
    // give a different key so user wont be charged twice
    const idempontencyKey = uuidv4();

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