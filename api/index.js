const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const inventory = require('./routes/inventory');
const product = require('./routes/product');

const app = express();
const DEFAULT_PORT = 3000;

app.use(express.json());

app.use('/inventory', inventory);
app.use('/product', product);

dotenv.config();
const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})
