const router = require("express").Router();
const Answer = require('../models/Answer.model');
const Question = require("../models/Question.model");
const { default: mongoose } = require("mongoose");
const User = require('../models/User.model')
const moment = require('moment');


router.get('/profile/:profileId', (req, res) => {
    const { profileId } = req.params

    if (!mongoose.Types.ObjectId.isValid(profileId)){
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }
      User.findById(profileId)
      .populate('answersByUsers')
      .then(user => res.json(user))
      .catch(err => console.log(err))

})
module.exports = router;