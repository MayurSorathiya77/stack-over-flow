const express = require("express");
const router = express.Router();

const commentDB = require("../models/Comment");
router.get('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    
    const response = await commentDB.find({ question_id: questionId });
    
    console.log(response);
    
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.post("/", async (req, res) => {
  try {
    await commentDB  
      .create({
        
        question_id: req.body.question_id,
        comment: req.body.comment,
        user: req.body.user,
      })
      .then((doc) => {
        res.status(201).send({
          message: "Comment added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "Bad format",
        });
      });
  } catch (err) {
    res.status(500).send({
      message: "Error while adding comments",
    });
  }
});

module.exports = router;
