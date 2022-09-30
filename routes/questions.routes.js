const router = require("express").Router();
const Answer = require('../models/Answer.model');
const Question = require("../models/Question.model");
const User = require('../models/User.model')

//--------QUESTION ROUTES
// POST /api/answers - Create a new Question 
router.post('/questions', (req, res, next) => {
    const {question, date, questionType} = req.body

    Question.create({question, date, questionType})
        .then(response => res.json(response))
        .catch (err => res.json (err))

})


module.exports = router