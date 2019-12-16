var express = require('express');
const bodyParser =require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var router = express.Router();
// var authenticate = require('../authenticate');
var authenticate = require('../autenticate');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

// //creating login feature, we use post request on the /users/login
// //we use the same code to allow to login we used before

router.post('/login', passport.authenticate('local'),(req, res, next) => {
  var token = authenticate.getToken({_id:req.user._id})
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({success:true,status:'Registration Success', token:token});

});

router.get('/logout', (req, res) => {
  //   //if session object exists in the header then only user is logged in
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});


module.exports = router;
