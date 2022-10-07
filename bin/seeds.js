
const mongoose = require("mongoose");
const Question = require("../models/Question.model");

const DB_NAME = "reflektor";

mongoose.connect(`mongodb+srv://malte:0MQ5iFt2mFH5OVoS@cluster0.i3jgj4r.mongodb.net/node ${DB_NAME}` 
// {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
);

const questions = [
  {
    question: 'Who is the most interesting person you have ever met?',
    date:  '2022-10-05',
    questionType:'text'
  },
  {
    question: 'What was the most interesting movie you saw the most recently? Send us a link to a trailer',
    date:  '2022-10-06',
    questionType:'link'
  },
  {
    question: "What is the song that marked your childhood?",
    date:  '2022-10-06',
    questionType:'link'
  },
  {
    question: "What book should everyone have read??",
    date:  '2022-10-07',
    questionType:'text'
  },
];

Question.create(questions)
  .then((questionsFromDB) => {
    console.log(`Created ${questionsFromDB.length} questions`);
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while getting books from the DB: ${err}`)
  );