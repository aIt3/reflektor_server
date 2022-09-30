const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const answerSchema = new Schema(
  {

    answer: String,
    explanation: String, 
    postedAt: {type: Date, default: Date.now},
    question: {
        type: String,
        enum: ['text', 'link', 'image']
    }, 
    postedByUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  })


const Answer = model("Answer", answerSchema);

module.exports = Answer;