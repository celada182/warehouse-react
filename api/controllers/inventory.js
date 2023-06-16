const Article = require('../model/article.model');
const importInventory = (req, res, next) => {
  readRequest(req.body, res); // dummy function for now
};

function readRequest(body, res) {
  if (!body.inventory) {
    res.status(400)
    res.json({error: "Invalid request"});
  }
  body.inventory.forEach(article => {
    upsertArticle(article)
  });
  res.json({message: "Inventory saved"});
}

function upsertArticle(article) {
  if (article.art_id) {
    console.log("Updating article:", article.art_id);
    const dto = new Article({
      art_id: article.art_id,
      name: article.name,
      stock: article.stock
    });
    dto.save()
    .then(() => console.log("Updated article:", article.art_id))
    .catch(error => console.error("Error updating article:", article.art_id, error))
  }
}

module.exports = {importInventory: importInventory};
