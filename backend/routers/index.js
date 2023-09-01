const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const questionRouter = require("./Question.js");
const answerRouter = require("./Answer");
const commentRouter = require('./Comments')
const questionvote = require("./QuestionVote");
const answervote = require("./AnswerVote");
const Tag = require("./Tag");

router.get("/", (req, res) => {
  res.send("Welcome to stack overflow clone");
});

router.use("/question", questionRouter);
router.use("/answer", answerRouter);
router.use('/comment', commentRouter)
router.use('/questionvote', questionvote);
router.use('/answervote', answervote);
router.use('/tag', Tag);

module.exports = router;
