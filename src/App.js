import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setProduct] = useState({
    name: 'React from FB',
    price: 10,
    productBy: 'facebook' 
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
        <StripeCheckout
        stripeKey=''
        token=''
        name='Buy React'
        > <button className="btn btn-success">Buy React for $10</button> </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
