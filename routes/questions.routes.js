const router = require("express").Router();
const Answer = require('../models/Answer.model');
const Question = require("../models/Question.model");
const User = require('../models/User.model')

//--------QUESTION ROUTES
// POST /api/questions - Create a new Question 
router.post('/questions', (req, res, next) => {
    const {question, date, questionType} = req.body

    Question.create({question, date, questionType})
        .then(response => res.json(response))
        .catch (err => res.json (err))

})

// GET /api/questions - Get the Question with the current Date 
router.get('/questionsForDay', (req, res, next) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const {question, date, questionType} = req.body

    Question.find({date: {$gte: today}, question, date })
    .then(response => res.json(response))
    .catch (err => res.json (err))

})


module.exports = router