const Property = require("../models/property")
const User = require("../models/user")
const mongoose = require("mongoose")
const {validationResult} = require('express-validator')

// Creates a New Property - WORKING
exports.addProperty = (req, res) => {
    const errors = validationResult(req)
  
    if(!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
    }
  
    const property = new Property({
      ownerId: res.app.locals.user.id,
      dateOfPurchase: req.body.dateOfPurchase,
      price: req.body.price,
      address: req.body.address,
      zipCode: req.body.zipCode
    })
    property.save((err, property) => {
      if(err) {
        console.log(err);
        console.log("Unable to add property")
        console.log(property)
      } else {
        console.log("Added Property Successfully")
        console.log(property)
        res.redirect('/dashboard')
      }
    })
  }

  // Edit a Property - WORKING
exports.editProperty = (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
    }

    Property.findOneAndUpdate({ _id: req.params.propertyId }, {
      dateOfPurchase: req.body.dateOfPurchase,
      price: req.body.price,
      address: req.body.address,
      zipCode: req.body.zipCode
    }, (err, property) => {
      if(err) {
        console.log(err);
      } else {
        console.log(property);
        res.redirect('/dashboard')
      }
    })
}

// Edit a Property - WORKING
exports.editAdminProperty = (req, res) => {
  const errors = validationResult(req)

  Property.findOneAndUpdate({ _id: req.params.propertyId }, {
    dateOfPurchase: req.body.dateOfPurchase,
    price: req.body.price,
    address: req.body.address,
    zipCode: req.body.zipCode
  }, (err, property) => {
    if(err) {
      console.log(err);
    } else {
      console.log("Updated property successfully");
      console.log(property);
      res.redirect('/admin')
    }
  })
}

// Deletes a Property - WORKING
exports.deleteProperty = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
  }

  Property.findOneAndDelete({ _id: req.params.propertyId }, (err, property) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted property successfully");
      console.log(property);
      res.redirect('/dashboard')
    }
  })
}

// Deletes a Property - WORKING
exports.deleteAdminProperty = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
  }

  Property.findOneAndDelete({ _id: req.params.propertyId }, (err, property) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted property successfully");
      console.log(property);
      res.redirect('/admin')
    }
  })
}
  