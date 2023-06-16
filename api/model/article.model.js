const mongoose = require('mongoose');
const { Schema } = mongoose;

const article = new Schema({
  _id: String,
  name: String,
  stock: Number
});

module.exports = mongoose.model("Article", article);
