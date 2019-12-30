var mongoose = require('mongoose');

var SessionResultSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [Number],
    scores: [Number],
    question_results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionResult' }]
}, {timestamps: true});

SessionResultSchema.methods.addQuestionResult = function(id){
    console.log("\naddQuestionResult " + id);
    if (this.question_results.indexOf(id) === -1){
        this.question_results = this.question_results.concat([id]);
    }
    return this.save();
}

SessionResultSchema.methods.removeQuestionResult = function(id){
    this.question_results.remove(id);
    return this.save();
}

SessionResultSchema.methods.toJSON = function(){
    return {
        id: this._id,
        title: this.title,
        description: this.description,
        tags: this.tags,
        scores: this.scores,
        question_results: this.question_results
    };
};

mongoose.model('SessionResult', SessionResultSchema);
