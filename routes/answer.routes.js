const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Answer = require('../models/Answer.model');
const Question = require("../models/Question.model");
const User = require('../models/User.model')
const { isAuthenticated } = require('./../middleware/jwt.middleware.js'); // <== IMPORT


//--------ANSWER ROUTES
// POST /api/answers - Create a new Answer 
router.post('/answers', isAuthenticated, (req, res, next) => {
    // do i need to use "question", "postedByUser" from the Model aswell?
    const {answer, explanation, postedAt, questionId } = req.body
    const postedByUser = req.payload._id
console.log(questionId)
    Answer.create({ postedByUser , answer, explanation, postedAt, questionRef: questionId})
        .then(newAnswer => {
            return Question.findByIdAndUpdate(questionId, {$push: {answersByUsers: newAnswer._id} }, {new: true} )
        })
        .then(response => console.log(response))
        .catch (err => res.json (err))
})

// GET /api/allAnswers - Retrieve all of the the answer by User
router.get('/allAnswersByUser', (req, res, next) => {
    Answer.find()
        .then(allAnswers => res.json(allAnswers))
        .catch(err => res.json(err))
})
// PUT /api/answers/:answerId, - Edit an specific Answer
    router.put('/answers/edit/:answerId', (req, res) =>{
    const {answerId} = req.params

    if(!mongoose.Types.ObjectId.isValid(answerId)){
        res.status(400).json({message: 'Specified id is not valid'})
        return
    }
    const {answer, explanation} = req.body

    Answer.findByIdAndUpdate(answerId, {answer, explanation}, {new:true}) 
    .then(answer => res.json(answer))
    .catch(err => console.log(err))
})

//DELETE / api/answers/:answerId

router.delete('/answers/delete/:answerId', (req, res, next) => {
    const { answerId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Answer.findByIdAndRemove(answerId)
      .then(() => res.json({ message: `Project with ${answerId} is removed successfully.` }))
      .catch(error => res.json(error));
  });

module.exports = router