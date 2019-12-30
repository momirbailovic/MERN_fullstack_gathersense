var mongoose = require('mongoose');
var router = require('express').Router();
var Organization = mongoose.model('Organization');
var Candidate = mongoose.model('Candidate');
var Training = mongoose.model('Training');
var Session = mongoose.model('Session');
var Question = mongoose.model('Question');
var auth = require('../auth');
var waitUntil = require('wait-until');
var controllers = require('../controller');

router.get('/get-all', auth.required, function(req, res, next) {
    Training.find().then(function(trainings){
      return res.json({trainings: trainings});
    }).catch(next);
});

router.post('/get-by-id', auth.required, function(req, res, next){
  Training.findById(req.body.id).then(function(training){
    if(!training){ return res.sendStatus(401); }

    return res.json({training: training.toJSON()});
  }).catch(next);
});

router.post('/get-sessions', auth.required, function(req, res, next){
  Training.findById(req.body.id).then(function(training){
    if(!training){ return res.sendStatus(401); }

    var total_count = training.sessions.length;
    var count = 0;
    var sessions = new Array(total_count);

    /* get sessions */
    training.sessions.forEach((session_id, index) => {
      Session.findById(session_id).then(function(session){
        sessions[index] = session;
        count ++;
      })
    })

    /* wait until all sessions are gotten and response */
    waitUntil(30, 300, function(){
      return count == total_count;
    }, function(b){
      sessions = sessions.filter(function(e){return e != null;});
      if(b){
        return res.json({sessions: sessions});
      }else{
        return res.json({sessions: []});
      }
    });
  }).catch(next);
});

router.post('/get-candidates', auth.required, function(req, res, next){
  Training.findById(req.body.id).then(function(training){
    if(!training){ return res.sendStatus(401); }

    var total_count = training.candidates.length;
    var count = 0;
    var candidates = new Array(total_count);

    /* get candidates */
    training.candidates.forEach((candidate_id, index) => {
      Candidate.findById(candidate_id).then(function(candidate){
        candidates[index] = candidate;
        count ++;
      })
    })

    /* wait until all candidates are gotten and response */
    waitUntil(30, 300, function(){
      return count == total_count;
    }, function(b){
      candidates = candidates.filter(function(e){return e != null;});

      if(b){
        return res.json({candidates: candidates});
      }else{
        return res.json({candidates: []});
      }
    });
  }).catch(next);
});

router.post('/get-training-results', auth.required, function(req, res, next){
  Training.findById(req.body.id).then(function(training){
    if(!training){ return res.sendStatus(401); }

    var total_count = training.candidates.length;
    var count = 0;
    var training_results = new Array(total_count);

    /* get training results */
    training.candidates.forEach((candidate_id, index) => {
      controllers.getTrainingResultFromCandidate(candidate_id, training.id).then(function(training_result){
        training_results[index] = training_result;
        count ++;
      })
    })

    /* wait until and response */
    waitUntil(30, 300, function(){
      return count == total_count;
    }, function(b){
      training_results = training_results.filter(function(e){return e != null;});

      if(b){
        return res.json({training_results: training_results});
      }else{
        return res.json({training_results: []});
      }
    });
  }).catch(next);
});

router.post('/create', auth.required, function(req, res, next){
  /* initialize training */
  var training = new Training();
  training.title = req.body.title;
  training.description = req.body.description;
  training.color = req.body.color;
  training.tags = req.body.tags;
  training.sessions = req.body.sessions;
  training.candidates = req.body.candidates;
  training.organization = req.body.organization;

  training.save().then(function(){
    /* add training to organization */
    Organization.findById(training.organization).then(function(organiztion){
      organiztion.addTraining(training.id);
    })

    /* add training results to candidates */
    training.candidates.forEach((candidate_id) => {
      Candidate.findById(candidate_id).then(function(candidate){
        controllers.createTrainingResult(training.id).then(function(training_result_id){
          candidate.addTrainingResult(training_result_id);
        });
      })
    })

    return res.json({training: training.toJSON()});
  }).catch(next);
});

router.put('/update', auth.required, function(req, res, next){
  Training.findById(req.body.id).then(function(training){
      if(!training){ return res.sendStatus(401); }

      // only update fields that were actually passed...
      if(typeof req.body.title !== 'undefined'){  
        training.title = req.body.title;
      }
      if(typeof req.body.description !== 'undefined'){
        training.description = req.body.description;
      }
      if(typeof req.body.color !== 'undefined'){
        training.color = req.body.color;
      }
      if(typeof req.body.tags !== 'undefined'){
        training.tags = req.body.tags;
      }
      if(typeof req.body.organization !== 'undefined'){
        training.organization = req.body.organization;
      }
      if(typeof req.body.sessions !== 'undefined'){
        training.sessions = req.body.sessions;
      }
      if(typeof req.body.candidates !== 'undefined'){
        new_candidates = req.body.candidates;
        old_candidates = training.candidates;

        /* remove training results from old candidates */
        old_candidates.forEach((old_candidate_id) => {
          /* if candidate is included before but not included newly, it and it's training result has to be removed */
          if (new_candidates.indexOf(String(old_candidate_id)) != -1){ return; }

          console.log("*********************" + old_candidate_id);
          Candidate.findById(old_candidate_id).then(function(candidate){
            if(!candidate){return;}

            controllers.getTrainingResultFromCandidate(candidate.id, training.id).then(function(training_result){
              if(!training_result.id){ return; }

              candidate.removeTrainingResult(training_result.id);
              controllers.deleteTrainingResult(training_result.id);
            });
          })
        })

        /* add training results to new candidates */
        new_candidates.forEach((new_candidate_id) => {
          /* if candidate is included newly but not included before, it and it's training result has to be added */
          if (old_candidates.indexOf(new_candidate_id) != -1){ return; }

          Candidate.findById(new_candidate_id).then(function(candidate){
            if (!candidate) {return;}
            
            controllers.createTrainingResult(training.id).then(function(training_result_id){
              candidate.addTrainingResult(training_result_id);
            });
          })
        })

        training.candidates = req.body.candidates;
      }

      return training.save().then(function(){
          return res.json({training: training.toJSON()});
      });
  }).catch(next);
});

router.delete('/delete', auth.required, function(req, res, next){
  Training.findById(req.body.id).then(function(training){
    if (!training) { return res.sendStatus(401); }

    /* remove training from organization */
    Organization.findById(training.organization).then(function(organization){
      organization.removeTraining(training.id);
    })

    /* remove training results from candidates and itself */
    training.candidates.forEach((candidate_id) => {
      Candidate.findById(candidate_id).then(function(candidate){
        if(!candidate){ return; }

        controllers.getTrainingResultFromCandidate(candidate, training.id).then(function(training_result_id){
          if(!training_result_id){return;}

          candidate.removeTrainingResult(training_result_id);
          controllers.deleteTrainingResult(training_result_id);
        });
      })
    })

    /* delete training */
    controllers.deleteTraining(training.id);
    
    return res.json({id: req.body.id});
  }).catch(next);
});

module.exports = router;