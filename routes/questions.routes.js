const router = require("express").Router();
const Answer = require('../models/Answer.model');
const Question = require("../models/Question.model");
const User = require('../models/User.model')
const moment = require('moment');

//--------QUESTION ROUTES
// POST /api/answers - Create a new Question 
router.post('/questions', (req, res, next) => {
    const {question, date, questionType} = req.body

    Question.create({question, date, questionType})
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

router.get('/questions/pastdays', (req, res, next) => {
    const today = moment().format(moment.HTML5_FMT.DATE)
    // $eq - Matches values that are less than a specified value..
    Question.find({date : {$lt : today}})
    .then(pastQuestions => res.json(pastQuestions))
    .catch(err => res.json(err))


})





module.exports = router