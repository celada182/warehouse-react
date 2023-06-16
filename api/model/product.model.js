const mongoose = require('mongoose');

const {Schema} = mongoose;

const contain_article = new Schema({
  art_id: String,
  amount_of: Number
}, {_id: false});

const product = new Schema({
  name: {type: String, unique: true},
  contain_articles: [contain_article]
});

module.exports = mongoose.model("Product", product);
