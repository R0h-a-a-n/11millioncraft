const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: { type: String, required: true },
  image: { type: String, required: false },  
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
