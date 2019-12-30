var mongoose = require('mongoose');
var router = require('express').Router();
var waitUntil = require('wait-until');
var SessionResult = mongoose.model('SessionResult');
var QuestionResult = mongoose.model('QuestionResult');
var auth = require('../auth');
var functions = require('../function');
var controllers = require('../controller');

router.post('/get-by-id', auth.required, function(req, res, next){
    SessionResult.findById(req.body.id).then(function(session_result){
        if(!session_result){ return res.sendStatus(401); }
        
        return res.json({session_result: session_result.toJSON()});
    }).catch(next);
});

router.post('/get-question-results', auth.required, function(req, res, next){
    SessionResult.findById(req.body.id).then(function(session_result){
        var total_count = session_result.question_results.length;
        var count = 0;
        var question_results = new Array(total_count);
    
        /* get question results */
        session_result.question_results.forEach((question_result_id, index) => {
            QuestionResult.findById(question_result_id).then(function(question_result){
                question_results[index] = question_result;
                count ++;
            })
        })
    
        /* wait and response */
        waitUntil(30, 300, function(){
            return count == total_count;
        }, function(b){
            question_results = question_results.filter(function(e){return e != null;});
            if(b){
                return res.json({question_results: question_results});
            }else{
                return res.json({question_results: []});
            }
        });
    }).catch(next);
});

router.post('/create', auth.required, function(req, res, next){
    var session_result = new SessionResult();
    
    session_result.title = req.body.title;
    session_result.description = req.body.description;
    session_result.tags = req.body.tags;
    session_result.scores = req.body.scores;
    session_result.question_results = req.body.question_results;

    session_result.save().then(function(){
        return res.json({session_result: session_result.toJSON()});
    }).catch(next);
});

router.put('/update', auth.required, function(req, res, next){
    console.log(req.body);
    SessionResult.findById(req.body.id).then(function(session_result){
        if(!session_result){ return res.sendStatus(401); }

        // only update fields that were actually passed...
        if(typeof req.body.title !== 'undefined'){  
            session_result.title = req.body.title;
        }
        if(typeof req.body.description !== 'undefined'){  
            session_result.description = req.body.description;
        }
        if(typeof req.body.tags !== 'undefined'){  
            session_result.tags = req.body.tags;
        }
        if(typeof req.body.scores !== 'undefined'){  
            session_result.scores = req.body.scores;
        }
        if(typeof req.body.question_results !== 'undefined'){
            session_result.question_results = req.body.question_results;
        }

        return session_result.save().then(function(){
            return res.json({session_result: session_result.toJSON()});
        });
    }).catch(next);
});

router.delete('/delete', auth.required, function(req, res, next){
    SessionResult.findById(req.body.id).then(function(session_result){
        if (!session_result) { return res.sendStatus(401); }

        /* delete session result*/
        controllers.deleteSessionResult(session_result.id);
        return res.json({id: req.body.id});
    }).catch(next);
});

module.exports = router;
