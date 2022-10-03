const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Answer = require('../models/Answer.model');
const Question = require("../models/Question.model");
const User = require('../models/User.model')


//--------ANSWER ROUTES
// POST /api/answers - Create a new Answer 
router.post('/answers', (req, res, next) => {
    // do i need to use "question", "postedByUser" from the Model aswell?
    const {answer, explanation, postedAt} = req.body

    Answer.create({answer, explanation, postedAt})
        .then(response => res.json(response))
        .catch (err => res.json (err))
})

// GET /api/allAnswers - Retrieve all of the the answer by User
router.get('/allAnswersByUser', (req, res, next) => {
    Answer.find()
        .populate('postedByUser')
        .then(allAnswers => res.json(allAnswers))
        .catch(err => res.json(err))
})
// PUT /api/answers/:answerId, - Edit an specific Answer
    router.put('/answers/:answerId', (req, res) =>{
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

router.delete('/answers/:answerId', (req, res) => {
    const {answerId} = req.params
    if(!mongoose.Types.ObjectId.isValid(answerId)) {
        res.status(400).json({message: 'Specific id is not valid'});
        return
    }
    Answer.findByIdAndRemove(answerId)
    .then(answer => res.json({message: `Project with the id ${answer._id} was succesfully deleted}`}))
    .catch(err => console.log(err))
})

module.exports = router