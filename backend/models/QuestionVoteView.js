
const mongoose = require("mongoose");

const QuestionVoteViews = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  vote : Number,
  view : Number,
});

module.exports = mongoose.model("QuestionVoteView", QuestionVoteViews);
