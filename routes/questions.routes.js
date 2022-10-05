const router = require("express").Router();
const Answer = require('../models/Answer.model');
const Question = require("../models/Question.model");
const { default: mongoose } = require("mongoose");
const User = require('../models/User.model')
const moment = require('moment');

//--------QUESTION ROUTES
// POST /api/answers - Create a new Question 
router.post('/questions', (req, res, next) => {
    const {question, date, questionType} = req.body

    Question.create({question, date, questionType, answersByUsers})
        .then(response => res.json(response))
        .catch (err => res.json (err))
})
//GET /api/answer/today - get the Question with the same date as today
router.get('/questions/today', (req, res, next) => {
    // moment.HTML5_FMT.DATE --> formats the Date to YYYY-MM-DD
    const today = moment().format(moment.HTML5_FMT.DATE)
    console.log(today)
    // $eq - Matches values that are equal to a specified value.
    Question.find({date : {$eq : today}})
    .then(questionToday => res.json(questionToday))
    .catch(err => res.json(err))
})

//GET /api/answer/today - get the Question which are older than today

router.get('/questions/pastdays', (req, res) => {
    const today = moment().format(moment.HTML5_FMT.DATE)
    // $eq - Matches values that are less than or equal to a specified value.
    Question.find({date : {$lte : today}})
    .populate('answersByUsers')
    .then(pastQuestions => res.json(pastQuestions))
    .catch(err => res.json(err))

})
//DELETE / api/question/:answerId

router.delete('/questions/delete/:questionId', (req, res, next) => {
    const {questionId} = req.params
    if(!mongoose.Types.ObjectId.isValid(questionId)) {
        res.status(400).json({message: 'Specific id is not valid'});
        return
    }
    Question.findByIdAndRemove(questionId)
    .then(question => res.json({message: `Project with the id ${question._id} was succesfully deleted}`}))
    .catch(err => console.log(err))
})





module.exports = router