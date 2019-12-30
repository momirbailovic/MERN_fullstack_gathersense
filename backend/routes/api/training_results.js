var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Training = mongoose.model('Training');
var TrainingResult = mongoose.model('TrainingResult');
var SessionResult = mongoose.model('SessionResult');
var auth = require('../auth');
var functions = require('../function');
var controllers = require('../controller');

router.post('/get-by-id', auth.required, function(req, res, next){
    TrainingResult.findById(req.body.id).then(function(training_result){
        if(!training_result){return res.sendStatus(401);}
        return res.json({training_result: training_result.toJSON()});
    }).catch(next);
});

router.post('/get-session-results', auth.required, function(req, res, next){
    TrainingResult.findById(req.body.id).then(function(training_result){
        var total_count = training_result.session_results.length;
        var count = 0;
        var session_results = new Array(total_count);
    
        /* get session results */
        training_result.session_results.forEach((session_result_id, index) => {
            SessionResult.findById(session_result_id).then(function(session_result){
                session_results[index] = session_result;
                count ++;
            })
        })
    
        /* wait and response */
        waitUntil(30, 300, function(){
          return count == total_count;
        }, function(b){
            session_results = session_results.filter(function(e){return e != null;});
            if(b){
                return res.json({session_results: session_results});
            }else{
                return res.json({session_results: []});
            }
        });
    }).catch(next);
});

router.post('/create', auth.required, function(req, res, next){
    var training_result = new TrainingResult();

    training_result.title = req.body.title;
    training_result.description = req.body.description;
    training_result.color = req.body.color;
    training_result.tags = req.body.tags;
    training_result.scores = req.body.scores;
    training_result.training = req.body.training;
    training_result.organization = req.body.organization;
    training_result.session_results = req.body.session_results;

    training_result.save().then(function(){
        return res.json({training_result: training_result.toJSON()});
    }).catch(next);
});

router.put('/update', auth.required, function(req, res, next){
    TrainingResult.findById(req.body.id).then(function(training_result){
        if(!training_result){ return res.sendStatus(401); }

        // only update fields that were actually passed...
        if(typeof req.body.title !== 'undefined'){  
            training_result.title = req.body.title;
        }
        if(typeof req.body.description !== 'undefined'){
            training_result.description = req.body.description;
        }
        if(typeof req.body.color !== 'undefined'){
            training_result.color = req.body.color;
        }
        if(typeof req.body.tags !== 'undefined'){
            training_result.tags = req.body.tags;
        }
        if(typeof req.body.scores !== 'undefined'){  
            training_result.scores = req.body.scores;
        }
        if(typeof req.body.training !== 'undefined'){  
            training_result.training = req.body.training;
        }
        if(typeof req.body.organization !== 'undefined'){  
            training_result.organization = req.body.organization;
        }
        if(typeof req.body.session_results !== 'undefined'){
            training_result.session_results = req.body.session_results;
        }

        return training_result.save().then(function(){
            return res.json({training_result: training_result.toJSON()});
        });
    }).catch(next);
});

router.delete('/delete', auth.required, function(req, res, next){
    TrainingResult.findById(req.body.id).then(function(training_result){
        if (!training_result) { return res.sendStatus(401); }

        controllers.deleteTrainingResult(training_result.id);
        return res.json({id: req.body.id});
    }).catch(next);
});

module.exports = router;
