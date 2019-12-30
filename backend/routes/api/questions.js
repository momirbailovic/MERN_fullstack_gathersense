var mongoose = require('mongoose');
var router = require('express').Router();
var multer = require('multer');
var fs = require('fs');
var dotenv = require('dotenv');
dotenv.config();
var Question = mongoose.model('Question');
var auth = require('../auth');
var functions = require('../function');
var controllers = require('../controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './public/images/quiz/');
    },
    filename: function(req, file, cb){
      cb(null, functions.generateFileName("question") + ".png")
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
    Question.findById(req.body.id).then(function(question){
        if(!question){ return res.sendStatus(401); }
        
        return res.json({question: question.toJSON()});
    }).catch(next);
});

router.post('/create', auth.required, upload.single('image'), function(req, res, next){
    var question = new Question();
    question.category = req.body.category;
    switch (question.category){
        case 0:case 1:case 2:
            question.question = req.body.question;
            question.options = functions.getOptionArray(req.body.options);
            question.correct_answer = functions.getArray(req.body.correct_answer);
            question.feedback = req.body.feedback;
            question.tags = functions.getArray(req.body.tags);
            break;
        case 3:
            question.title = req.body.title;
            question.text = req.body.text;
            if (typeof req.file !== 'undefined') {
                question.image = "http://" + process.env.IP + ":" + process.env.PORT + "/images/quiz/" + req.file.filename;
            }
            question.video = req.body.video;
            break;
    }

    question.save().then(function(){
        return res.json({question: question.toJSON()});
    }).catch(next);
});

router.put('/update', auth.required, upload.single('image'), function(req, res, next){
    Question.findById(req.body.id).then(function(question){
        if(!question){ return res.sendStatus(401); }

        // only update fields that were actually passed...
        if(typeof req.body.category !== 'undefined'){  
            question.category = req.body.category;
        }
        if(typeof req.body.question !== 'undefined'){  
            question.question = req.body.question;
        }
        if(typeof req.body.options !== 'undefined'){  
            question.options = functions.getOptionArray(req.body.options);
        }
        if(typeof req.body.correct_answer !== 'undefined'){  
            question.correct_answer = functions.getArray(req.body.correct_answer);
        }
        if(typeof req.body.feedback !== 'undefined'){  
            question.feedback = req.body.feedback;
        }
        if(typeof req.body.tags !== 'undefined'){  
            question.tags = functions.getArray(req.body.tags);
        }
        if(typeof req.body.title !== 'undefined'){  
            question.title = req.body.title;
        }
        if(typeof req.body.text !== 'undefined'){  
            question.text = req.body.text;
        }
        if(typeof req.file !== 'undefined'){
            if(fs.existsSync(functions.getImagePath(question.image)))
                fs.unlinkSync(functions.getImagePath(question.image));
            question.image = "http://" + process.env.IP + ":" + process.env.PORT + "/images/quiz/" + req.file.filename;
        }
        if(typeof req.body.video !== 'undefined'){  
            question.video = req.body.video;
        }

        return question.save().then(function(){
            return res.json({question: question.toJSON()});
        });
    }).catch(next);
});

router.delete('/delete', auth.required, function(req, res, next){
    Question.findById(req.body.id).then(function(question){
        if (!question) { return res.sendStatus(401); }

        controllers.deleteQuestion(question.id);
        return res.json({id: req.body.id});
    }).catch(next);
});

module.exports = router;
