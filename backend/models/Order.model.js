var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var OrderSchema = new Schema({
  companyName:{
    type: String,
    required: true
  },
  productName:{
    type: String,
    required: true
  },
  orderNo: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
 
});

// Create model from the schema
var Order = mongoose.model("Order", OrderSchema);

// Export model
module.exports = Order;