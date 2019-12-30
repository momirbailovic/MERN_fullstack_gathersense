var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Session = mongoose.model('Session');
var Question = mongoose.model('Question');
var auth = require('../auth');
var functions = require('../function');
var controllers = require('../controller');
var waitUntil = require('wait-until');

router.post('/get-by-id', auth.required, function(req, res, next){
    Session.findById(req.body.id).then(function(session){
        if(!session){ return res.sendStatus(401); }

        return res.json({session: session.toJSON()});
    }).catch(next);
});

router.post('/get-questions', auth.required, function(req, res, next){
    Session.findById(req.body.id).then(function(session){
        var total_count = session.questions.length;
        var count = 0;
        var questions = new Array(total_count);
    
        /* get questions */
        session.questions.forEach((question_id, index) => {
            Question.findById(question_id).then(function(question){
                questions[index] = question;
                count ++;
            })
        })
    
        /* wait and response */
        waitUntil(30, 300, function(){
            return count == total_count;
        }, function(b){
            questions = questions.filter(function(e){return e != null;});
            if(b){
                return res.json({questions: questions});
            }else{
                return res.json({questions: []});
            }
        });
    }).catch(next);
});

router.post('/create', auth.required, function(req, res, next){
    var session = new Session();

    session.title = req.body.title;
    session.description = req.body.description;
    session.tags = req.body.tags;
    session.questions = req.body.questions;

    session.save().then(function(){
        return res.json({session: session.toJSON()});
    }).catch(next);
});

router.put('/update', auth.required, function(req, res, next){
    Session.findById(req.body.id).then(function(session){
        if(!session){ return res.sendStatus(401); }

        // only update fields that were actually passed...
        if(typeof req.body.title !== 'undefined'){  
            session.title = req.body.title;
        }
        if(typeof req.body.description !== 'undefined'){  
            session.description = req.body.description;
        }
        if(typeof req.body.tags !== 'undefined'){  
            session.tags = req.body.tags;
        }
        if(typeof req.body.questions !== 'undefined'){
            session.questions = req.body.questions;
        }

        return session.save().then(function(){
            return res.json({session: session.toJSON()});
        });
    }).catch(next);
});

router.delete('/delete', auth.required, function(req, res, next){
    Session.findById(req.body.id).then(function(session){
        if (!session) { return res.sendStatus(401); }

        /* delete session */
        controllers.deleteSession(session.id);
        return res.json({id: req.body.id});
    }).catch(next);
});

module.exports = router;
