const router = require("express").Router();
const Answer = require('../models/Answer.model')
const User = require('../models/User.model')

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

module.exports = router