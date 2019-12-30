var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [Number],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
}, {timestamps: true});

SessionSchema.methods.toJSON = function(){
    return {
      id: this._id,
      title: this.title,
      description: this.description,
      tags: this.tags,
      questions: this.questions
    };
  };

mongoose.model('Session', SessionSchema);
