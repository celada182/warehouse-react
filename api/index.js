const express = require('express');
const mongoose = require('mongoose');
const inventory = require('./routes/inventory');
const product = require('./routes/product');

const app = express();

app.use(express.json());

app.use('/inventory', inventory);
app.use('/product', product);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})
