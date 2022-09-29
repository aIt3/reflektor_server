const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    answersByUsers: {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
  },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  })


const User = model("User", userSchema);

module.exports = User;
