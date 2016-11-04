'use strict';

var User = require('../auth/models/user.js');

function eventManager () {
    
    this.query = function (req, res, next){
        User.find({ 'pollsCount': { $gte:1 } }, function(err, data) {
          if (err) { throw err;
          } else {
        req.formData = data;
        next();
        }
      });
    };

    this.getUserInfo = function (req, res, next){
      User.find({'username': req.user.username}, function(err, user){
        if(err){ throw err;
        } else {
          res.locals.user = user;
          req.UserInfo = user;
          next();
        }
      });
    };
    
  this.getPollOptions = function (req, res, next){
    User.find({ '_id': req.params.id},
    { polls: {
        $elemMatch: 
        { 'title': req.params.title } }}, function(err, data) {
      if (err) { throw err;
      } else {
    console.log(data);
    req.OptionsData = data;
    next();
    }
  });
};

  this.addNewPoll = function(req, res, next){
    var x = req.body.option.length;
    var votes = Array(x).fill(0);
      User.update ({'username': req.user.username},
        {$push: {'polls': {
          'title': req.body.title,
          'question': req.body.question,
          'options': req.body.option,
          'optionVotes': votes,
          'pollVotes': 0 } }}, function(err, doc){
  					if (err) {
  						throw err;
  					}	else {
  				next();
  			}
  		});
    };

  this.addPollCount = function(req, res, next){
	User.update ({'username': req.user.username, 'polls.title': req.body.title},
        {$inc: { 'pollsCount' : 1 }}, function(err, doc){
					if (err) {
						throw err;
					}	else {
				next();
		       }
		  });
    };
 
 this.addPollVote = function(req, res, next){
    User.findOneAndUpdate ({'polls.title': req.params.title},
      {$inc: { 'polls.$.pollVotes' : 1 }},
      {select: { 
        polls: {
        $elemMatch: 
        { 'title': req.params.title } }}}, function(err, doc){
          if (err) {
            throw err;
          } else {
          null;
            }
        });
      };
      
   this.decreasePollCount = function(req, res, next){
	User.update ({'username': req.user.username},
        {$inc: { 'pollsCount': -1 }}, function(err, doc){
					if (err) {
						throw err;
					}	else {
				next();
		       }
		  });
    };
    
  this.removePoll = function(req, res, next){
    User.findOneAndUpdate ({'username': req.user.username, 
    'polls.title': req.body.titlePoll},
    { $pull: { 'polls': {'title': req.body.titlePoll} }}, {new: true},
                      function(err, doc){
          if (err) {
            throw err;
          } else {
            next();
            }
        });
      };
      
  this.addMoreOptions = function(req, res, next){
    User.update({'polls.title': req.body.title},
      {$push: { 'polls.$.options': req.body.addOption,
        'polls.$.optionVotes' : 1
        } }, function(err, doc){
          if (err) {
            throw err;
          } else {
          next();
            }
        });
      };
      
  this.addOptionVote = function(req, res, next){
    var update = {};
    update['polls.$.optionVotes.' + req.body.optionIndex] = 1;
    User.findOneAndUpdate ({
      '_id': req.body.id,
      'polls.title': req.body.title,
      'polls.question': req.body.question},
      {$inc: update },{select: { 
            polls: {
               $elemMatch: 
               { 'title': req.body.title } }}}, function(err, results){
          if (err) {
            throw err;
          } else {
          req.PollResults = results;
            next();
          }
        });
      };
  

}
module.exports = eventManager;