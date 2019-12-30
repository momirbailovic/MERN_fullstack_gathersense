var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var multer = require('multer');
var multiparty = require('multiparty');
var fs = require('fs');
var dotenv = require('dotenv');
dotenv.config();
var waitUntil = require('wait-until');
var Organization = mongoose.model('Organization');
var Training = mongoose.model('Training');
var Candidate = mongoose.model('Candidate');
var auth = require('../auth');
var functions = require('../function');
var controllers = require('../controller');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images/organ/');
  },
  filename: function(req, file, cb){
    cb(null, functions.generateFileName("organization") + ".png")
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
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: fileFilter
});

router.get('/get-all', auth.required, function(req, res, next) {
  Organization.find().then(function(organizations){
    return res.json({organizations: organizations});
  }).catch(next);
});

router.post('/get-by-id', auth.required, function(req, res, next){
  Organization.findById(req.body.id).then(function(organization){
      if(!organization){ return res.sendStatus(401);}
  
      return res.json({organization: organization.toJSON()});
  }).catch(next);
});


router.post('/get-candidates', auth.required, function(req, res, next){
  Organization.findById(req.body.id).then(function(organization){
    if(!organization){ return res.sendStatus(401); }

    /* get candidates from candidate ids in correct order */
    var count = 0;
    var total_count = organization.candidates.length;
    var candidates = new Array(total_count);

    organization.candidates.forEach((candidate_id, index) => {
      Candidate.findById(candidate_id).then(function(candidate){
        candidates[index] = candidate;
        count ++;
      })
    })

    /* wait until all candidates are gotten and response */
    waitUntil(30, 300, function(){
      return count == total_count;
    }, function(b){
      /* remove null, not found candidates */
      candidates = candidates.filter(function(e){return e != null;});

      if(b){
        return res.json({candidates: candidates});
      }else{
        return res.json({candidates: []});
      }
    });
  }).catch(next);
});

router.post('/get-trainings', auth.required, function(req, res, next){
  Organization.findById(req.body.id).then(function(organization){
    if(!organization){ return res.sendStatus(401); }
    
    /* get trainings from training ids in correct order */
    var count = 0;
    var total_count = organization.trainings.length;
    var trainings = new Array(total_count);
    organization.trainings.forEach((training_id, index) => {
      Training.findById(training_id).then(function(training){
        trainings[index] = training;
        count ++;
      })
    })

    /* wait until all trainings are gotten and response */
    waitUntil(30, 300, function(){
      return count == total_count;
    }, function(b){
      trainings = trainings.filter(function(e){return e != null;});
      if(b){
        return res.json({trainings: trainings});
      }else{
        return res.json({trainings: []});
      }
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

  passport.authenticate('organization', {session: false}, function(err, organization, info){
    if(err){ return next(err); }
    
    if(organization){
      organization.token = organization.generateJWT();
      organization.save().then(function(){
        return res.json({organization: organization.toAuthJSON()});
      })
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/token-verify', function(req, res, next){
  Organization.findOne({token: req.body.token}).then(function(organization){
    if(!organization){
      return res.json({"token": ""});
    }
    return res.json({"token": organization.token});
  }).catch(next);
})

router.post('/forgot', function(req, res, next){
  Organization.findOne({email: req.body.email}).then(function(organization){
    if(!organization){ return res.sendStatus(401); }

    organization.pin = functions.getPin();
    console.log(organization.pin);
    organization.save().then(function(){
      /* remove pin after */
      setTimeout(() => {
        organization.pin = "";
        organization.save();
      }, 60000 * 5)

      /* set email format */
      var fs = require('fs');
      var emailHtml = fs.readFileSync(__dirname + '/../../public/emails/reset-password-email.html', {encoding:'utf-8'});
      emailHtml = emailHtml.replace("385098", organization.pin);

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

router.post('/reset', auth.required, function(req, res, next){
  Organization.findOne({"pin":req.body.pin}).then(function(organization){
    if(!organization){ return res.sendStatus(401); }

    organization.setPassword(req.body.password);
    organization.save().then(function(){
      return res.json({organization:organization.toJSON()});
    });
  }).catch(next);
});

router.post('/logout', auth.required, function(req, res, next){
  Organization.findById(req.body.id).then(function(organization){
    if (!organization) { return res.sendStatus(401); }

    organization.token = "";
    organization.save().then(function(){
      return res.json({id: req.body.id});
    });
  }).catch(next);
});

router.post('/create', auth.required, upload.single('image'), function(req, res, next){
  var organization = new Organization();
  organization.name = req.body.name;
  organization.email = req.body.email;
  organization.description = req.body.description;
  organization.photo = "http://" + process.env.IP + ":" + process.env.PORT + "/images/organ/" + req.file.filename;
  organization.setPassword(req.body.password);
  organization.trainings = functions.getArray(req.body.trainings);
  organization.candidates = functions.getArray(req.body.candidates);

  organization.save().then(function(){
    return res.json({organization: organization.toJSON()});
  }).catch(next);
});

router.put('/update', auth.required, upload.single('image'), function(req, res, next){
  Organization.findById(req.body.id).then(function(organization){
    if(!organization){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.name !== 'undefined'){  
      organization.name = req.body.name;
    }
    if(typeof req.body.email !== 'undefined'){
      organization.email = req.body.email;
    }
    if(typeof req.body.description !== 'undefined'){
      organization.description = req.body.description;
    }
    if(typeof req.body.password !== 'undefined'){
      organization.setPassword(req.body.password);
    }
    if(typeof req.body.trainings !== 'undefined'){
      organization.trainings = functions.getArray(req.body.trainings);
    }
    if(typeof req.body.candidates !== 'undefined'){
      organization.candidates = functions.getArray(req.body.candidates);
    }

    if (typeof req.file !== 'undefined'){
      if(fs.existsSync(functions.getImagePath(organization.photo)))
        fs.unlinkSync(functions.getImagePath(organization.photo));
      organization.photo = "http://" + process.env.IP + ":" + process.env.PORT + "/images/organ/" + req.file.filename;
    }

    return organization.save().then(function(){
      return res.json({organization: organization.toJSON()});
    });
  }).catch(next);
});

router.delete('/delete', auth.required, function(req, res, next){
  Organization.findById(req.body.id).then(function(organization){
    if (!organization) { return res.sendStatus(401); }
    
    if(fs.existsSync(functions.getImagePath(organization.photo)))
      fs.unlinkSync(functions.getImagePath(organization.photo));
    
    organization.trainings.forEach((training_id) => {
      controllers.deleteTraining(training_id);
    })

    organization.candidates.forEach((candidate_id) => {
      Candidate.findById(candidate_id).then(function(candidate){
        candidate.training_results.forEach((training_result_id) => {
          /* remove training result */
          controllers.deleteTrainingResult(training_result_id);
        })
        
        /* remove candidate image */
        if(fs.existsSync(functions.getImagePath(candidate.photo)))
          fs.unlinkSync(functions.getImagePath(candidate.photo));
  
        candidate.remove();
      })
    })

    organization.remove().then(function(){
      return res.json({id: req.body.id});
    });
  }).catch(next);
});

module.exports = router;