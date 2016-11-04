
var express = require('express');
var router = express.Router();
var passportGithub = require('../auth/github');
var passportFacebook = require('../auth/facebook');
var passportLocal = require('../auth/local');
var localRegister = require('../auth/localRegister');

var path = process.cwd();
var EventManager = require(path + '/app/controllers/eventManager.js');

  function isLoggedIn (req, res, next) {
  		if (req.isAuthenticated()) {
  			return next();
  		} else {
  		  console.log("failed to log in!");
  		  next();
  		}
  	}
  	
  	var eventManager = new EventManager();
 
router.get('/', eventManager.query, function(req, res){
  res.render('index', {posts: req.formData});
});

router.get('/success', isLoggedIn, eventManager.query,
eventManager.getUserInfo, function(req, res){
  res.render('loggedin', {
    userTitle: req.user.username,
    userposts: req.UserInfo,
    posts: req.formData });
});

router.get('/logout', eventManager.query, function(req, res){
      req.logout();
			res.redirect('/');
});

router.get('/auth/github', passportGithub.authenticate('github'));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', {
    successRedirect: '/success',
    failureRedirect: '/'
  }));

router.get('/auth/facebook', passportFacebook.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passportFacebook.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/login'
  }));

router.post('/auth/local/',
  passportLocal.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/'
  }));

router.post('/adduser/',
  localRegister.authenticate('localRegister', {
    successRedirect: '/success',
    failureRedirect: '/'
  }));
  
router.post('/addpoll', isLoggedIn, eventManager.addNewPoll, eventManager.addPollCount,
function(req, res){
    res.redirect('/success');
});

router.get('/addpollvotes/:title(*)', isLoggedIn, eventManager.addPollVote);

router.post('/deletepoll', isLoggedIn, eventManager.decreasePollCount,
eventManager.removePoll, function(req, res){
  res.redirect('/success');
});

router.post('/guestaddoptionvotes', eventManager.addOptionVote,
function(req,res){
  res.render('poll-results', {
    userTitle: undefined,
    results: req.PollResults
  });
}); 

router.post('/addoptionvotes', isLoggedIn, eventManager.addOptionVote,
function(req,res){
  res.render('poll-results', {
    userTitle: req.user.username,
    results: req.PollResults
  });
}); 

router.post('/additionalopt', eventManager.addMoreOptions, eventManager.addOptionVote,
function(req,res){
  res.render('poll-results', {
    userTitle: req.user.username,
    results: req.PollResults
  });
  
});

module.exports = router;