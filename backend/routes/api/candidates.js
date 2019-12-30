var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var multer = require('multer');
var multiparty = require('multiparty');
var fs = require('fs');
var dotenv = require('dotenv');
dotenv.config();
var waitUntil = require('wait-until');
var nodemailer = require('nodemailer');
var Organization = mongoose.model('Organization');
var Candidate = mongoose.model('Candidate');
var Training = mongoose.model('Training')
var Session = mongoose.model('Session')
var Question = mongoose.model('Question')
var TrainingResult = mongoose.model('TrainingResult');
var SessionResult = mongoose.model('SessionResult');
var QuestionResult = mongoose.model('QuestionResult');
var auth = require('../auth');
var functions = require('../function');
var controllers = require('../controller');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images/candi/');
  },
  filename: function(req, file, cb){
    cb(null, functions.generateFileName("candidate") + ".png")
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});


router.get('/get-all', auth.required, function(req, res, next) {
    Candidate.find().then(function(candidates){
      return res.json({candidates: candidates});
    }).catch(next);
});

router.post('/get-by-id', auth.required, function(req, res, next){
  Candidate.findById(req.body.id).then(function(candidate){
      if(!candidate){ return res.sendStatus(401);}
  
      return res.json({candidate: candidate.toJSON()});
  }).catch(next);
});

router.post('/get-training-results-with-content', auth.required, function(req, res, next){
  Candidate.findById(req.body.id).then(function(candidate){
    if(!candidate){ return res.sendStatus(401);}
    
    var count = 0;
    var total_count = candidate.training_results.length;
    var training_results = new Array(total_count);

    /* get all training results with content */
    candidate.training_results.forEach((training_result_id, index) => {
      controllers.getTrainingResultWithContent(training_result_id).then(function(training_result){
        training_results[index] = training_result;
        count ++;
      })
    })
    
    /* wait and response */
    waitUntil(30, 300, function(){
      return count == total_count;
    }, function(b){
      training_results = training_results.filter(function(e){return e != null;});
      if(b)
        return res.json({training_results: training_results});
      else
        return res.json({training_results: []});
    })
  }).catch(next);
});

router.post('/get-training-results', auth.required, function(req, res, next){
  Candidate.findById(req.body.id).then(function(candidate){
    if(!candidate){ return res.sendStatus(401);}
    
    var count = 0;
    var total_count = candidate.training_results.length;
    var training_results = new Array(total_count);

    /* get all training results */
    candidate.training_results.forEach((training_result_id, index) => {
      TrainingResult.findById(training_result_id).then(function(training_result){
        training_results[index] = training_result;
        count ++;
      })
    })
    
    /* wait and response */
    waitUntil(30, 300, function(){
      return count == total_count;
    }, function(b){
      training_results = training_results.filter(function(e){return e != null;});
      if(b)
        return res.json({training_results: training_results});
      else
        return res.json({training_results: []});
    })
  }).catch(next);
});

router.post('/get-training-result', auth.required, function(req, res, next){
  Candidate.findById(req.body.id).then(function(candidate){
    if(!candidate){return res.sendStatus(401);}
    
    controllers.getTrainingResultFromCandidate(candidate.id, req.body.training).then(function(training_result){
      if(!training_result){return res.sendStatus(401);}
      
      return res.json({training_result: training_result});
    });
  }).catch(next);
});

router.post('/login', function(req, res, next){
  if(!req.body.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('candidate', {session: false}, function(err, candidate, info){
    if(err){ return next(err); }
    
    if(candidate){
        candidate.token = candidate.generateJWT();
      return res.json({candidate: candidate.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/forgot', function(req, res, next){
  Candidate.findOne({email: req.body.email}).then(function(candidate){
    if(!candidate){ return res.sendStatus(401); }

    candidate.pin = functions.getPin();
    console.log(candidate.pin);
    candidate.save().then(function(){
      /* remove pin after */
      setTimeout(() => {
        candidate.pin = "";
        candidate.save();
      }, 60000 * 5)

      /* set email format */
      var fs = require('fs');
      var emailHtml = fs.readFileSync(__dirname + '/../../public/emails/reset-password-email.html', {encoding:'utf-8'});
      emailHtml = emailHtml.replace("385098", candidate.pin);

      /*var sendgrid   = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
      var email      = new sendgrid.Email();
      
      email.setFrom(process.env.SENDGRID_FROM);
      email.addTo(req.body.email);
      email.addHeader('X-Sent-Using', 'SendGrid-API');
      email.addHeader('X-Transport', 'web');
      email.setSubject('GatherSense: Reset Password');
      email.setText('');
      email.setHtml(stringTemplate);
      
      sendgrid.send(email, function(err, json) {
        if (err) {
          console.log(err);
          return res.json({"result":"failed"});
        }
        return res.json({"result":"success"});
      });
      
      var send = require('gmail-send')({
        user: 'andrewterex0987654321@gmail.com',
        pass: 'thisis@my@id',
        subject: 'GatherSense: Reset Password',
        to: req.body.email
      })

      var result = null;
      send({
        html: stringTemplate
      }, function(err, res, full){
        if (err) {
          console.log(err);
          result = {"result":"failed"};
          return;
        }
        result = {"result":"success"};
      })

      waitUntil(30, 300, function(){
        return result != null
      }, function(b){
        if(b){
          return res.json(result);
        }else{
          return res.json({"result":"failed"});
        }
      })*/

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        socketTimeout: 5000,
        logger: true,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: req.body.email,
        subject: 'Gathersense: Reset Password',
        html: emailHtml
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.json({"result":"failed"});
        } else {
          console.log('Email sent: ' + info.response);
          return res.json({"result":"success"});
        }
      });
    });
  }).catch(next);
});

router.post('/reset', function(req, res, next){
  Candidate.findOne({"pin":req.body.pin}).then(function(candidate){
    if(!candidate){ return res.sendStatus(401); }

    candidate.setPassword(req.body.password);
    candidate.save().then(function(){
      return res.json({candidate:candidate.toJSON()});
    });
  }).catch(next);
});

router.post('/logout', auth.required, function(req, res, next){
  Candidate.findById(req.body.id).then(function(candidate){
    if (!candidate) { return res.sendStatus(401); }

    candidate.token = "";
    candidate.save().then(function(){
      return res.json({id: req.body.id});
    });
  }).catch(next);
});

router.post('/create', auth.required, upload.single("image"), function(req, res, next){
  var candidate = new Candidate();

  candidate.name = req.body.name;
  candidate.email = req.body.email;
  candidate.department = req.body.department;
  candidate.setPassword(req.body.password);
  if(typeof req.body.occupation !== 'undefined'){
    candidate.occupation = req.body.occupation;
  }else{
    candidate.occupation = '';
  }
  if (typeof req.file !== 'undefined'){
    candidate.photo = "http://" + process.env.IP + ":" + process.env.PORT + "/images/candi/" + req.file.filename;
  }else{
    candidate.photo = '';
  }

  var trainings = functions.getArray(req.body.trainings);
  var count = 0;
  var total_count = trainings.length;
  candidate.training_results = new Array(total_count);

  trainings.forEach((training_id, index) => 
    Training.findById(training_id).then(function(training){
      if(!training){
        count ++;
        return;
      }
      /* add training results to candidate from trainings */
      controllers.createTrainingResult(training.id).then(function(training_result_id){
        if(!training_result_id)
        { 
          count++;
          return;
        }

        candidate.addTrainingResult(training_result_id);
        count ++;
      });
    })
  )
    
  waitUntil(30, 300, function(){  
    return count == total_count;
  }, function(b){
    if(!b){console.log("error: all training results are not created");return;}
  
    candidate.training_results = candidate.training_results.filter(function(e){return e != null;});
    candidate.save().then(function(){

      trainings.forEach((training_id) => 
        Training.findById(training_id).then(function(training){
          if(!training){return;}
          training.addCandidate(candidate.id);
        })
      );
  
      Organization.findById(req.body.organization).then(function(organization){
        if(!organization){return;}
        organization.addCandidate(candidate.id);
      })
  
      return res.json({candidate: candidate.toJSON()});
    }).catch(next);
  })
});

router.put('/update', auth.required, upload.single("image"), function(req, res, next){
  Candidate.findById(req.body.id).then(function(candidate){
      if(!candidate){ return res.sendStatus(401); }

      var flag = true;
      // only update fields that were actually passed...
      if(typeof req.body.name !== 'undefined'){  
          candidate.name = req.body.name;
      }
      if(typeof req.body.email !== 'undefined'){
          candidate.email = req.body.email;
      }
      if(typeof req.body.department !== 'undefined'){
          candidate.department = req.body.department;
      }
      if(typeof req.body.occupation !== 'undefined'){
          candidate.occupation = req.body.occupation;
      }
      if(typeof req.body.password !== 'undefined'){
          candidate.setPassword(req.body.password);
      }
      if (typeof req.file !== 'undefined'){
          if(fs.existsSync(functions.getImagePath(candidate.photo)))
            fs.unlinkSync(functions.getImagePath(candidate.photo));
          candidate.photo = "http://" + process.env.IP + ":" + process.env.PORT + "/images/candi/" + req.file.filename;
      }
      if(typeof req.body.trainings !== 'undefined'){
        flag = false;

        controllers.getTrainingsFromCandidate(candidate).then(function(trainings){
          var new_trainings = functions.getArray(req.body.trainings);
          var old_trainings = trainings;

          console.log("*********************");
          console.log(new_trainings);
          console.log(old_trainings);
          var count = 0;
          var total_count = new_trainings.length + old_trainings.length;

          /* remove old training results */
          old_trainings.forEach((old_training_id) => {
            if (new_trainings.indexOf(old_training_id) != -1){
              count ++;
              return;
            }

            /* remove candidate from training */
            Training.findById(old_training_id).then(function(training){
              if(!training){return;}
              training.removeCandidate(candidate.id);
            })

            /* remove training result */
            controllers.getTrainingResultFromCandidate(candidate.id, old_training_id).then(function(training_result){
              if(!training_result){
                count ++;
                return;
              }

              controllers.deleteTrainingResult(training_result.id);
              candidate.removeTrainingResult(training_result.id);
              count ++;
            });
          })
          
          /* add new training results */
          new_trainings.forEach((new_training_id) => {
            if (old_trainings.indexOf(new_training_id) != -1){
              count ++;
              return;
            }

            Training.findById(new_training_id).then(function(training){
              if(!training){return;}
              training.addCandidate(candidate.id);
            })

            controllers.createTrainingResult(new_training_id).then(function(training_result_id){
              if(!training_result_id){
                count ++;
                return;
              }
              candidate.addTrainingResult(training_result_id);
              count ++;
            });
          })

          waitUntil(30, 300, function(){
            return count == total_count;
          }, function(b){
            flag = true;
          })
        })
      }

      waitUntil(30, 300, function(){
        return flag;
      }, function(b){
        return candidate.save().then(function(){
          return res.json({candidate: candidate.toJSON()});
        });
      })
  }).catch(next);
});

router.delete('/delete', auth.required, function(req, res, next){
  Candidate.findById(req.body.id).then(function(candidate){
      if (!candidate) { return res.sendStatus(401); }

      candidate.training_results.forEach((training_result_id) => {
        /* remove candidate from training */
        TrainingResult.findById(training_result_id).then(function(training_result){
          training_id = training_result.training;
          Training.findById(training_id).then(function(training){
            return training.removeCandidate(candidate.id);
          })
        });

        /* remove training result */
        controllers.deleteTrainingResult(training_result_id);
      })

      /* remove candidate from organization */
      Organization.findById(req.body.organization).then(function(organization){
        return organization.removeCandidate(candidate.id);
      })
      
      /* remove image */
      if(fs.existsSync(functions.getImagePath(candidate.photo)))
        fs.unlinkSync(functions.getImagePath(candidate.photo));

      candidate.remove().then(function(){
        return res.json({id: req.body.id});
      });
  }).catch(next);
});

module.exports = router;