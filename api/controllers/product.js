const Product = require("../model/product.model");
const Article = require("../model/article.model");
const importProducts = (req, res) => {
  readRequest(req.body, res);
};

const getProducts = async (req, res) => {
  const pageSize = req.query.page_size || process.env.DEAFULT_PAGE_SIZE;
  const offset = req.query.offset || 0;
  let response = [];
  const products = await Product.find({}, null,
      {skip: offset, limit: pageSize});
  for (const product of products) {
    const processedProduct = await processProduct(product, response);
    response.push(processedProduct);
  }
  res.json(response);
}

async function processProduct(product, response) {
  const json = product.toJSON();
  const articles = await findArticles(json.contain_articles);
  const stock = calculateStock(json.contain_articles, articles);
  return {name: product.name, stock: stock};
}

function readRequest(body, res) {
  if (!body.products) {
    res.status(400)
    res.json({error: "Invalid request"});
  }
  body.products.forEach(article => {
    insertProduct(article)
  });
  res.json({message: "Products saved"});
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
    const availableProducts = Math.floor(article.stock / contain_article.amount_of);
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

module.exports = {importProducts: importProducts, getProducts: getProducts};
