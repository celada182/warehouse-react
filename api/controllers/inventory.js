const Article = require('../model/article.model');
const importInventory = (req, res) => {
  if (!req.body.inventory) {
    res.status(400)
    res.json({error: "Invalid request"});
  }
  req.body.inventory.forEach(article => {
    upsertArticle(article)
  });
  res.status(201);
  res.json({message: "Inventory saved"});
};

function upsertArticle(article) {
  if (article.art_id) {
    let stock = article.stock;
    Article.findOne({_id: article.art_id})
    .then(existingArticle => {
      if (existingArticle) {
        stock = +stock + +existingArticle.stock;
      }
      Article.updateOne({_id: article.art_id},
          {stock: stock, name: article.name}, {upsert: true})
      .catch(error => console.error("Error updating article:", article.art_id,
          error));
    });
  }
}

module.exports = {importInventory: importInventory};
