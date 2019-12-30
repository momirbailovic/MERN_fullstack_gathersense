var mongoose = require('mongoose');
var waitUntil = require('wait-until');
var fs = require('fs');
var Administrator = mongoose.model('Administrator');
var Organization = mongoose.model('Organization');
var Candidate = mongoose.model('Candidate');
var Training = mongoose.model('Training');
var Session = mongoose.model('Session');
var Question = mongoose.model('Question');
var TrainingResult = mongoose.model('TrainingResult');
var SessionResult = mongoose.model('SessionResult');
var QuestionResult = mongoose.model('QuestionResult');
var functions = require('./function');

function deleteTraining(training_id){
    Training.findById(training_id).then(function(training){
        if(!training) { return false; }

        /* delete all sessions of training */
        training.sessions.forEach((session_id) => {
            deleteSession(session_id);
        })
        
        /* delete training */
        training.remove();
        return true;
    })
}

function deleteSession(session_id){
    Session.findById(session_id).then(function(session){
        if (!session){ return false; }

        /* delete all questions of training */
        session.questions.forEach((question_id) => {
            deleteQuestion(question_id);
        })
        
        /* delete session */
        session.remove();
        return true;
    })
}

function deleteQuestion(question_id){
    Question.findById(question_id).then(function(question){
        if (!question) { return false; }

        /* remove image if exist */
        if(fs.existsSync(functions.getImagePath(question.image)))
            fs.unlinkSync(functions.getImagePath(question.image));

        /* delete question */
        question.remove();
        return true;
    })
}

function createTrainingResult(training_id){
    console.log("\ncreateTrainingResult " + training_id);
    var flag = false;
    var result = null;

    Training.findById(training_id).then(function(training){
        if(!training){ 
            flag = true;
            return;
        }

        /* Add training_results to candidate from trainings */
        var training_result = new TrainingResult();
        training_result.training = training.id;
        training_result.title = training.title;
        training_result.description = training.description;
        training_result.color = training.color;
        training_result.tags = training.tags;
        training_result.organization = training.organization;
        training_result.scores = [];
        
        var count = 0;
        var total_count = training.sessions.length;
        training_result.session_results = new Array(total_count);

        training.sessions.forEach((session_id, index) => {
            createSessionResult(session_id).then(function(session_result_id){
                training_result.session_results[index] = session_result_id;
                count ++;
            });
        })

        waitUntil(30, 300, function(){
            return count == total_count;
        }, function(b){
            if(b){
                console.log(training_result.session_results);
                training_result.session_results = training_result.session_results.filter(function(e){return e != null;});
                console.log("---------------------------------");
                console.log(training_result.session_results);
                training_result.save().then(function(){
                    result = training_result.id;
                    flag = true;
                })
            }else{
                result = null;
                flag = true;
            }
        })
    })

    return new Promise(function(resolve, reject){
        waitUntil(30, 300, function(){
            return flag;
        }, function(b){
            resolve(result);
        })
    });
}

function createSessionResult(session_id){
    console.log("\nnewSessionResult " + session_id);
    var flag = false;
    var result = null;

    Session.findById(session_id).then(function(session){
        if (!session){
            flag = true;
            return;
        }

        var session_result = new SessionResult();
        session_result.title = session.title;
        session_result.description = session.description;
        session_result.tags = session.tags;
        session_result.scores = [];

        var count = 0;
        var total_count = session.questions.length;
        session_result.question_results = new Array(total_count);

        session.questions.forEach((question_id, index) => {
            createQuestionResult(question_id).then(function(question_result_id){
                session_result.question_results[index] = question_result_id;
                count++;
            });
        })

        waitUntil(30, 300, function(){
            return count == total_count;
        }, function(b){
            if(b){
                session_result.question_results = session_result.question_results.filter(function(e){return e != null;});
                session_result.save().then(function(){
                    result = session_result.id;
                    flag = true;
                })
            }else{
                flag = true;
            }
        })
    })

    return new Promise(function(resolve, reject){
        waitUntil(30, 300, function(){
            return flag;
        }, function(b){
            resolve(result);
        })
    });
}

function createQuestionResult(question_id){
    console.log("\nnewQuestionResult " + question_id);
    var flag = false;
    var result = null;

    Question.findById(question_id).then(function(question){
        if(!question){
            flag = true; 
            return; 
        }

        var question_result = new QuestionResult();
        question_result.category = question.category;
        question_result.question = question.question;
        question_result.options = question.options;
        question_result.correct_answer = question.correct_answer;
        question_result.feedback = question.feedback;
        question_result.tags = question.tags;
        question_result.title = question.title;
        question_result.text = question.text;
        question_result.image = question.image;
        question_result.video = question.video;
        question_result.my_answer = [];
        
        question_result.save().then(function(){
            result = question_result.id;
            flag = true;
            return;
        });
    });

    return new Promise(function(resolve, reject){
        waitUntil(30, 300, function(){
            return flag;
        }, function(b){
            resolve(result);
        })
    });
}

function deleteTrainingResult(training_result_id){
    TrainingResult.findById(training_result_id).then(function(training_result){
        if(!training_result) { return false; }

        /* delete all session results of training result */
        training_result.session_results.forEach((session_result_id) => {
            deleteSessionResult(session_result_id);
        })

        /* delete training result */
        training_result.remove();
        return true;
    })
}

function deleteSessionResult(session_result_id){
    SessionResult.findById(session_result_id).then(function(session_result){
        if(!session_result) { return false; }

        /* delete all question results of session result */
        session_result.question_results.forEach((question_result_id) => {
            deleteQuestionResult(question_result_id);
        })
        
        /* delete session result */
        session_result.remove();
        return true;
    })
}

function deleteQuestionResult(question_result_id){
    QuestionResult.findById(question_result_id).then(function(question_result){
        if (!question_result) { return false; }

        /* remove image if exist */
        if(fs.existsSync(functions.getImagePath(question_result.image)))
            fs.unlinkSync(functions.getImagePath(question_result.image));
        
        /* delete question result */
        question_result.remove();
        return true;
    })
}

function getTrainingResultWithContent(training_result_id){
    console.log("\ngetTrainingResultWithContent " + training_result_id);
    var flag = false;
    var result = null;

    TrainingResult.findById(training_result_id).then(function(training_result){
        if(!training_result){
            flag = true;
            return;
        }

        var count = 0;
        var total_count = training_result.session_results.length;
        var session_results = new Array(total_count);

        if(total_count == 0){
            result = training_result.toJSON();
            flag = true;
            return;
        }

        training_result.session_results.forEach((session_result_id, index) => {
            controllers.getSessionResultWithContent(session_result_id).then(function(session_result){
                session_results[index] = session_result;
                count ++;

                if (count == total_count){
                    session_results = session_results.filter(function(e){return e != null;});
                    result = training_result.toJSON();
                    result.session_results = session_results;
                    flag = true;
                    return;
                }
            })
        })
    })

    return new Promise(function(resolve, reject){
        waitUntil(30, 300, function(){
            return flag;
        }, function(b){
            resolve(result);
        })
    });
}

function getSessionResultWithContent(session_result_id){
    console.log("\ngetSessionResultWithContent " + session_result_id);
    var flag = false;
    var result = null;

    SessionResult.findById(session_result_id).then(function(session_result){
        if(!session_result){
            flag = true; 
            return;
        }

        var count = 0;
        var total_count = session_result.question_results.length;
        var question_results = new Array(total_count);

        if(total_count == 0){
            result = session_result.toJSON();
            flag = true;
            return;
        }

        session_result.question_results.forEach((question_result_id, index) => {
            controllers.getQuestionResultWithContent(question_result_id).then(function(question_result){
                question_results[index] = question_result;
                count ++;

                if (total_count == count){
                    question_results = question_results.filter(function(e){return e != null;});
                    result = session_result.toJSON();
                    result.question_results = question_results;
                    flag = true;
                    return;
                }
            })
        })
    })

    return new Promise(function(resolve, reject){
        waitUntil(30, 300, function(){
            return flag;
        }, function(b){
            resolve(result);
        })
    });
}

function getQuestionResultWithContent(question_result_id){
    console.log("\ngetQuestionResultWithContent " + question_result_id);
    var flag = false;
    var result = null;

    QuestionResult.findById(question_result_id).then(function(question_result){
        if(question_result){
            result = question_result.toJSON();
        }
        flag = true;
    })

    return new Promise(function(resolve, reject){
        waitUntil(30, 300, function(){
            return flag;
        }, function(b){
            resolve(result);
        })
    });
}

function getTrainingResultFromCandidate(candidate_id, training_id){
    var flag = false;
    var result = null;

    Candidate.findById(candidate_id).then(function(candidate){
        if(!candidate){
            flag = true;
            return;
        }

        if(candidate.training_results.length == 0){
            flag = true;
            return;
        }
    
        candidate.training_results.forEach((training_result_id) => 
            TrainingResult.findById(training_result_id).then(function(training_result){
                if(training_result.training == training_id){
                    result = training_result;
                    flag = true;
                }
            })
        )
    });

    return new Promise(function(resolve, reject){
        waitUntil(30, 300, function(){
            return flag;
        }, function(b){
            resolve(result);
        })
    });
}

function getTrainingsFromCandidate(candidate){
    var count = 0;
    var total_count = candidate.training_results.length;
    var trainings = new Array(total_count);

    candidate.training_results.forEach((training_result_id, index) => 
        TrainingResult.findById(training_result_id).then(function(training_result){
            trainings[index] = String(training_result.training);
            count ++;
        })
    )

    return new Promise(function(resolve, reject){
        waitUntil(30, 300, function(){
            return count == total_count;
        }, function(b){
            resolve(trainings);
        })
    });
}

controllers = {
    deleteTraining: deleteTraining,
    deleteSession: deleteSession,
    deleteQuestion: deleteQuestion,
    createTrainingResult: createTrainingResult,
    createSessionResult: createSessionResult,
    createQuestionResult: createQuestionResult,
    deleteTrainingResult: deleteTrainingResult,
    deleteSessionResult: deleteSessionResult,
    deleteQuestionResult: deleteQuestionResult,
    getTrainingResultWithContent: getTrainingResultWithContent,
    getSessionResultWithContent: getSessionResultWithContent,
    getQuestionResultWithContent: getQuestionResultWithContent,
    getTrainingResultFromCandidate: getTrainingResultFromCandidate,
    getTrainingsFromCandidate: getTrainingsFromCandidate
}

module.exports = controllers;