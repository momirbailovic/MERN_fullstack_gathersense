var mongoose = require('mongoose');

var TrainingResultSchema = new mongoose.Schema({
    title: String,
    color: String,
    description: String,
    tags: [{ label: String, color: String }],
    scores: [Number],
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    training: { type: mongoose.Schema.Types.ObjectId, ref: 'Training' },
    session_results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SessionResult' }]
}, {timestamps: true});

TrainingResultSchema.methods.addSessionResult = function(id){
    console.log("\naddSessionResult " + id);
    if (this.session_results.indexOf(id) === -1){
        this.session_results = this.session_results.concat([id]);
    }
    return this.save();
}

TrainingResultSchema.methods.removeSessionResult = function(id){
    this.session_results.remove(id);
    return this.save();
}

TrainingResultSchema.methods.toJSON = function(){
    return {
        id: this._id,
        title: this.title,
        color: this.color,
        description: this.description,
        tags: this.tags,
        scores: this.scores,
        training: this.training,
        organization: this.organization,
        session_results: this.session_results
    };
};

mongoose.model('TrainingResult', TrainingResultSchema);
