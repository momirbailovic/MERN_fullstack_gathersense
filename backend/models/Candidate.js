var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var CandidateSchema = new mongoose.Schema({
  name: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9 ]+$/, 'is invalid']},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  photo: String,
  department: String,
  occupation: String,
  training_results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingResult' }],
  hash: String,
  salt: String,
  pin: String
}, {timestamps: true, usePushEach: true});

CandidateSchema.plugin(uniqueValidator, {message: 'is already taken.'});

CandidateSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

CandidateSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

CandidateSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    name: this.name,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

CandidateSchema.methods.addTrainingResult = function(id){
  if (id && this.training_results.indexOf(id) == -1){
      this.training_results = this.training_results.concat([id]);
  }
  return this.save();
}

CandidateSchema.methods.removeTrainingResult = function(id){
  this.training_results.remove(id);
  return this.save();
}

CandidateSchema.methods.toAuthJSON = function(){
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    photo: this.photo,
    department: this.department,
    occupation: this.occupation,
    training_results: this.training_results,
    token: this.generateJWT(),
  };
};

CandidateSchema.methods.toJSON = function(){
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      photo: this.photo,
      department: this.department,
      occupation: this.occupation,
      training_results: this.training_results
    };
  };

mongoose.model('Candidate', CandidateSchema);
