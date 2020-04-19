var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a CompanySchema
var CompanySchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  gst: {
    type: String,
    required: true,
  }
});

// Create model from the schema
var Company = mongoose.model("Company", CompanySchema);

// Export model
module.exports = Company;