var mongoose = require('mongoose');
var router = require('express').Router();
var multer = require('multer');
var fs = require('fs');
var dotenv = require('dotenv');
dotenv.config();
var QuestionResult = mongoose.model('QuestionResult');
var auth = require('../auth');
var functions = require('../function');
var controllers = require('../controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './public/images/result/');
    },
    filename: function(req, file, cb){
      cb(null, functions.generateFileName("result") + ".png")
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

router.post('/get-by-id', auth.required, function(req, res, next){
    QuestionResult.findById(req.body.id).then(function(question_result){
        if(!question_result){ return res.sendStatus(401); }
        
        return res.json({question_result: question_result.toJSON()});
    }).catch(next);
});

router.post('/create', auth.required, upload.single('image'), function(req, res, next){
    var question_result = new QuestionResult();

    question_result.category = req.body.category;
    switch (question_result.category){
        case 0:case 1:case 2:
            question_result.question = req.body.question;
            question_result.options = functions.getOptionArray(req.body.options);
            question_result.correct_answer = functions.getArray(req.body.correct_answer);
            question_result.feedback = req.body.feedback;
            question_result.tags = functions.getArray(req.body.tags);
            question_result.my_answer = functions.getArray(req.body.my_answer);
            break;
        case 3:
            question_result.title = req.body.title;
            question_result.text = req.body.text;
            question_result.video = req.body.video;            
            if (typeof req.file !== 'undefined') {
                question_result.image = "http://" + process.env.IP + ":" + process.env.PORT + "/images/result/" + req.file.filename;
            }
            break;
    }

    question_result.save().then(function(){
        return res.json({question_result: question_result.toJSON()});
    }).catch(next);
});

router.put('/update', auth.required, upload.single('image'), function(req, res, next){
    QuestionResult.findById(req.body.id).then(function(question_result){
        if(!question_result){ return res.sendStatus(401); }
        
        console.log("**********************************");
        console.log(req.body);
        // only update fields that were actually passed...
        if(typeof req.body.category !== 'undefined'){  
            question_result.category = req.body.category;
        }
        if(typeof req.body.question !== 'undefined'){  
            question_result.question = req.body.question;
        }
        if(typeof req.body.options !== 'undefined'){  
            question.options = functions.getOptionArray(req.body.options);
        }
        if(typeof req.body.correct_answer !== 'undefined'){  
            question_result.correct_answer = functions.getArray(req.body.correct_answer);
        }
        if(typeof req.body.feedback !== 'undefined'){  
            question_result.feedback = req.body.feedback;
        }
        if(typeof req.body.tags !== 'undefined'){  
            question_result.tags = functions.getArray(req.body.tags);
        }
        if(typeof req.body.title !== 'undefined'){  
            question_result.title = req.body.title;
        }
        if(typeof req.body.text !== 'undefined'){  
            question_result.text = req.body.text;
        }
        if(typeof req.body.video !== 'undefined'){  
            question_result.video = req.body.video;
        }
        if(typeof req.body.my_answer !== 'undefined'){
            question_result.my_answer = functions.getArray(req.body.my_answer);
        }
        if(typeof req.file !== 'undefined'){
            if(fs.existsSync(functions.getImagePath(question_result.image)))
                fs.unlinkSync(functions.getImagePath(question_result.image));
            question_result.image = "http://" + process.env.IP + ":" + process.env.PORT + "/images/quiz/" + req.file.filename;
        }

        return question_result.save().then(function(){
            return res.json({question_result: question_result.toJSON()});
        });
    }).catch(next);
});

router.delete('/delete', auth.required, function(req, res, next){
    QuestionResult.findById(req.body.id).then(function(question_result){
        if (!question_result) { return res.sendStatus(401); }

        controllers.deleteQuestionResult(question_result.id);
        return res.json({id: req.body.id});
    }).catch(next);
});

module.exports = router;
