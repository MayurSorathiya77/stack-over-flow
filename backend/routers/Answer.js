const express = require("express");
const router = express.Router();
const answerDB = require("../models/Answer");


router.get('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    
    const response = await answerDB.find({ question_id: questionId });
    
    console.log(response);
    
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post("/", async (req, res) => {
  const answerData = new answerDB({
    question_id: req.body.question_id,
    answer: req.body.answer,
    user: req.body.user,
  });

  await answerData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Answer not added successfully",
      });
    });
});


module.exports = router;
