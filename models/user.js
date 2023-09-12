const mongoose = require("mongoose")
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  username: {
    type: String,
    required: true,
    maxlength: 32,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 25,
    unique: true
  },
  birthday: {
    type: Date
  },
  organization: {
    type: String,
    maxlength: 25
  },
  location: {
    type: String,
    maxlength: 25
  },
  phoneNumber: {
    type: String,
    maxlength: 10
  },
  profileImg: {
    type: String,
    default: "img/undraw_profile.svg",
    required: true
  },
  sharedIds: {
    type: [mongoose.ObjectId],
    default: [''],
    required: true
  },
  type: {
    type: String,
    default: "User",
    required: true
  },
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
}, {timestamps: true})

userSchema.virtual("password")
  .set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securePassword(password)
  })
  .get(function() {
    return this._password
  })

userSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password
  },

  securePassword: function(plainpassword) {
    if(!plainpassword) return "";

    try {
      return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
    } catch (err) {
      return ""
    }
  }
}

module.exports = mongoose.model("User", userSchema)