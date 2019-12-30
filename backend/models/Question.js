var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    category: Number, /* 0: Multiple Choice, 1: Sequence, 2: Selection, 3: Text, 4: Image, 5: Video */
    question: String,
    options: [String],
    correct_answer: [Number],
    feedback: String,
    tags: [Number],
    title: String,
    text: String,
    image: String,
    video: String
}, {timestamps: true});

QuestionSchema.methods.toJSON = function(){
    switch(this.category){
        case 0:case 1:case 2:
            return {
                id: this._id,
                category: this.category,
                question: this.question,
                options: this.options,
                correct_answer: this.correct_answer,
                feedback: this.feedback,
                tags: this.tags
            };
        case 3:
            return {
                id: this._id,
                category: this.category,
                title: this.title,
                text: this.text,
                image: this.image,
                video: this.video
            };
    }
  };

mongoose.model('Question', QuestionSchema);
