const Product = require("../model/product.model");
const importProducts = (req, res, next) => {
  readRequest(req.body, res);
};

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
    .catch(error => console.error("Error updating product:", product.name, error));
  }
}

module.exports = {importProducts: importProducts};
