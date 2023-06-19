const Product = require("../model/product.model");
const Article = require("../model/article.model");

const importProducts = (req, res) => {
  if (!req.body.products) {
    res.status(400)
    res.json({error: "Invalid request"});
  }
  req.body.products.forEach(article => insertProduct(article));
  res.status(201);
  res.json({message: "Products saved"});
};

const getProducts = async (req, res) => {
  const pageSize = req.query.page_size || process.env.DEAFULT_PAGE_SIZE;
  const offset = req.query.offset || 0;
  let response = [];
  const products = await Product.find({}, null,
      {skip: offset, limit: pageSize});
  for (const product of products) {
    const processedProduct = await processProduct(product);
    if (processedProduct.stock > 0) {
      response.push(processedProduct);
    }
  }
  res.json(response);
}

const sellProduct = async (req, res) => {
  const name = req.query.name;
  const amount = req.query.amount;
  const product = await Product.findOne({name: name});
  const articles = await findArticles(product.contain_articles);
  const stock = calculateStock(product.contain_articles, articles);
  const isAvailable = stock >= amount;
  if (isAvailable) {
    await updateArticles(product.contain_articles, articles, amount);
    res.json({message: "Products sold"});
  } else {
    res.status(404);
    res.json({error: "Product is not available at the moment"});
  }
}

async function updateArticles(contain_articles, articles, amount) {
  for (const contain_article of contain_articles) {
    const article = articles.find(a => a._id === contain_article.art_id);
    const stock = article.stock - (contain_article.amount_of * amount);
    await Article.updateOne({_id: article._id}, {stock: stock});
  }
}

async function processProduct(product) {
  const json = product.toJSON();
  const articles = await findArticles(json.contain_articles);
  const stock = calculateStock(json.contain_articles, articles);
  return {name: product.name, stock: stock};
}

function insertProduct(product) {
  // TODO Input Validation
  if (product.name && product.contain_articles) {
    const dto = new Product({
      name: product.name,
      contain_articles: product.contain_articles
    });
    dto.save()
    .catch(
        error => console.error("Error updating product:", product.name, error));
  }
}

function calculateStock(contain_articles, articles) {
  let stock = 0;
  for (const contain_article of contain_articles) {
    const article = articles.find(a => a._id === contain_article.art_id);
    const availableProducts = Math.floor(
        article.stock / contain_article.amount_of);
    if (availableProducts === 0) {
      return 0;
    }
    if (stock === 0) {
      stock = availableProducts;
    }
    if (availableProducts < stock) {
      stock = availableProducts;
    }
  }
  return stock;
}

async function findArticles(contain_articles) {
  const ids = contain_articles.map(article => article.art_id);
  return Article.find({'_id': {$in: ids}});
}

module.exports = {
  importProducts: importProducts,
  getProducts: getProducts,
  sellProduct: sellProduct
};
