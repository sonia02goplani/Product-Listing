var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var ProductSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

// Create model from the schema
var Product = mongoose.model("Product", ProductSchema);

// Export model
module.exports = Product;