var mongoose = require('mongoose');

var TrainingSchema = new mongoose.Schema({
  title: String,
  color: String,
  description: String,
  tags: [{ label: String, color: String }],
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }]
}, {timestamps: true, usePushEach: true});

TrainingSchema.methods.addCandidate = function(id){
  if (this.candidates.indexOf(id) === -1){
    this.candidates = this.candidates.concat([id]);
  }
  return this.save();
}

TrainingSchema.methods.removeCandidate = function(id){
  this.candidates.remove(id);
  return this.save();
}

TrainingSchema.methods.toJSON = function(){
    return {
      id: this._id,
      title: this.title,
      color: this.color,
      description: this.description,
      tags: this.tags,
      organization: this.organization,
      sessions: this.sessions,
      candidates: this.candidates
    };
  };

mongoose.model('Training', TrainingSchema);
