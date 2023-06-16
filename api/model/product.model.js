const mongoose = require('mongoose');

const {Schema} = mongoose;

const product = new Schema({
  name: {type: String, unique: true},
  contain_articles: [{
    art_id: String,
    amount_of: Number
  }]
});

module.exports = mongoose.model("Product", product);
