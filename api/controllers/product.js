const Product = require("../model/product.model");
const importProducts = (req, res) => {
  readRequest(req.body, res);
};

const getProducts = (req, res) => {
  const pageSize = req.query.pageSize || process.env.DEAFULT_PAGE_SIZE;
  const offset = req.query.offset || 0;
  Product.find({}, null, {skip: offset, limit: pageSize})
  .then(products => {
    const response = products.map(product => {
      const json = product.toJSON();
      return {
        name: json.name,
        contain_articles: json.contain_articles
      }
    });
    res.json(response);
  });
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

module.exports = {importProducts: importProducts, getProducts: getProducts};
