const mongoose = require('mongoose');
import Article from "./article.model";
const { Schema } = mongoose;

const product = new Schema({
  name: String,
  contain_articles: [Article]
});

module.exports = mongoose.model("Product", product);
