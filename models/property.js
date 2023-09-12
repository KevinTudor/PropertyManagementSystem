const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.ObjectId
  },
  dateOfPurchase: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    maxlength: 10
  },
  address: {
    type: String,
    required: true,
    maxlength: 50
  },
  zipCode: {
    type: String,
    required: true,
    maxlength: 8
  },
}, {timestamps: true})

module.exports = mongoose.model("Property", propertySchema)