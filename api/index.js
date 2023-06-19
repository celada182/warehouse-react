const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const inventory = require('./routes/inventory');
const product = require('./routes/product');

const app = express();
const cors = require('cors');
const DEFAULT_PORT = 3000;

dotenv.config();

app.use(express.json());
if (process.env.CORS) {
  console.log("Configuring CORS", process.env.CORS)
  app.use(cors({
    origin: process.env.CORS
  }));
}

app.use('/inventory', inventory);

app.use('/product', product);
const port = process.env.PORT || DEFAULT_PORT;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`Server Started at ${port}`);
  })
}).catch(error => {
  console.error("API cannot connect to the DB:", error);
});
