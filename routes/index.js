const express = require("express");
const User = require("../models/index").User;
const router = express.Router();
const bcrypt = require("bcrypt");

const passport = require('passport');

const isAuthenticated = function (req, res, next) {
  console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }

router.get("/", function(req, res) {
  res.render("gabble", {
      messages: res.locals.getMessages()
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true
}));

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res) {
  let username = req.body.username
  let password = req.body.password

  if (!username || !password) {
    req.flash('error', "Please, fill in all the fields.")
    res.redirect('signup')
  }

  let salt = bcrypt.genSaltSync(10)
  let hashedPassword = bcrypt.hashSync(password, salt)

  let newUser = {
    username: username,
    salt: salt,
    password: hashedPassword
  }

  User.create(newUser).then(function() {
    res.redirect('/')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.redirect('/signup')
  });
});

router.get("/user", isAuthenticated, function(req, res) {
  models.Post.findAll ({
    include: [{ model: models.User, as : 'user'},
    {model: models.Like, as: 'Likes'}]
  })
  .then(function(data) {
    res.render ( 'user' , {post:data})
  })
});
router.post('/user', isAuthenticated, function (req, res, next){
  models.Post.create ({
    text: req.body.text,
    userId: req.user.id,
  })
  .then(function(data) {
    res.redirect('/user');

  })
})
router.get('/destroy/:id' , function (req, res) {
  models.Post.destroy ({
    where: {
      id: req.params.id

    }
  })
.then(function(data) {
  res.redirect('/user');
});
});
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
})
// router.post('/user', function (req, res) { }

module.exports = router;
