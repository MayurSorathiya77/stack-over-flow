const mongoose = require("mongoose");

const AnswerVoteViews = new mongoose.Schema({
  answer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  vote : Number,
  view : Number,
});

module.exports = mongoose.model("AnswerVoteView", AnswerVoteViews);
