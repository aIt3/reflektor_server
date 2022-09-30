const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const questionSchema = new Schema(
  {
    question: String,
    date:  Date,
    questionType: {
        type: String,
        enum: ['text', 'link', 'image']
    }, 
    answersByUsers: {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }
  })


const Question = model("Question", questionSchema);

module.exports = Question;
