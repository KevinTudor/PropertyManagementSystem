const jwt = require('jsonwebtoken');
const User = require("../models/user")

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        //console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/');
  }
};

const requireAdmin = (req, res, next) => {

  if (res.app.locals.user.type == "Admin") {
    next();
  } else {
    res.redirect('/dashboard');
  }
};

const requireShared = (req, res, next) => {
  var isShared = false;

  for (let i = 0; i < res.app.locals.user.sharedIds.length; i++) {
    if (res.app.locals.user.sharedIds[i] == req.params.userId) {
      isShared = true;
    } 
  }

  if(isShared) {
    next();
  } else {
    res.redirect('/dashboard');
  }
}

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.app.locals.user = null;
        console.log(err)
        next();
      } else {
        let user = await User.findById(decodedToken._id);
        res.app.locals.user = user;
        //console.log(user);
        next();
      }
    });
  } else {
    res.app.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, requireAdmin, requireShared, checkUser };