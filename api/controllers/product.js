const importProducts = (req, res, next) => {
  res.json({message: req.body}); // dummy function for now
};

module.exports = {importProducts: importProducts};
