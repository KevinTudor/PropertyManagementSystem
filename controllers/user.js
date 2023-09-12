const User = require("../models/user")
const {validationResult} = require('express-validator')
var jwt = require('jsonwebtoken')

// Handles registration of User
exports.signup = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.render('signup', {
      error: errors.array()[0].msg
    })
  }

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.email.substring(0, req.body.email.lastIndexOf("@")),
    password: req.body.password
  })
  user.save((err, user) => {
    if(err) {
      return res.render('signup', {
        error: "Unable to add user"
      });
    }

    return res.render('signup', {
      error: "Successfully created account!"
    })
  })
}

// Handles Signing in of user
exports.signin = (req, res) => {
  let email = req.body.email;
	let password = req.body.password;

  User.findOne({email}, (err, user) => {
    if(err || !user || !user.authenticate(password)) {
      return res.render('signin', {
        error: "Incorrect password or email not found"
      })
    }

    // Create token
    const token = jwt.sign({_id: user._id}, process.env.SECRET)

    // Put token in cookie
    res.cookie('token', token, {expire: new Date() + 1})

    res.redirect('dashboard')

    // Send response
  /*const {_id, firstName, lastName, email} = user
   return res.json({
    token,
   user: {
   _id,
   firstName,
   lastName,
   email
  }
  })*/
    
  })
}

// Handles Signing out of User
exports.signout = (req, res) => {
  res.clearCookie("token")
  res.redirect('/');
  //return res.json({
  //  message: "User signout successful"
  //})
}

// Handles editing of User
exports.editUser = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
  }

  User.findOneAndUpdate({ _id: res.app.locals.user.id }, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    organization: req.body.organization,
    location: req.body.location,
    phoneNumber: req.body.phoneNumber
  }, (err, user) => {
    if(err) {
      console.log(err);
    } else {
      console.log(user);
      res.redirect('/profile')
    }
  })
}

// Shares a User with another User
exports.addShared = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
  }

  User.findOneAndUpdate({ username: req.body.username }, {
    $push: { sharedIds: [res.app.locals.user.id] }
  }, (err, user) => {
    if(err) {
      console.log(err);
    } else {
      console.log(user);
      res.redirect('/profile')
    }
  })
}

// Removes a User from users shared Users
exports.deleteShared = (req, res) => {
  const errors = validationResult(req)
  console.log(req.params.userId)

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
  }

  User.findOneAndUpdate({ _id: res.app.locals.user.id }, { 
     $pull: { sharedIds: req.params.userId }
    }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
        res.redirect('/profile')
      }
  })
}

// Handles editing of User Profile picture
exports.editUserProfileImg = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
  }

  User.findOneAndUpdate({ _id: res.app.locals.user.id }, {
    profileImg: req.file.location
  }, (err, user) => {
    if(err) {
      console.log(err);
    } else {
      console.log(user);
    }
  })
}
