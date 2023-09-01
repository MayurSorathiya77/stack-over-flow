const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const QuestionVote = require("../models/QuestionVoteView.js");


  

  router.get("/:id", async (req, res) => {
    try { 
      
  
      let resp = await QuestionVote.find({});
  
      resp = resp.filter((question) => question.question_id == req.params.id);
  
      res.status(200).json(resp); // Send the JSON array as response
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  });
  
 // update 
  
  router.put("/upvote/:id", async (req, res) => {
    try {
      let report = await QuestionVote.find({});
      report = report.filter((e) => {return  e.question_id == req.params.id});
      report = report[0];

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        let newVote = report.vote + 1;

        await QuestionVote.findOneAndUpdate(
            { _id: report._id },
            { $set: { vote: newVote } },
            { new: true } // Return the updated document
        );

        res.status(200).json({ message: "Vote updated successfully", newVote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
 ///downvote
 router.put("/downvote/:id", async (req, res) => {
  try {
    let report = await QuestionVote.find({});
    report = report.filter((e) => {return  e.question_id == req.params.id});
    report = report[0];

      if (!report) {
          return res.status(404).json({ message: "Report not found" });
      }

      let newVote = report.vote - 1;

      await QuestionVote.findOneAndUpdate(
          { _id: report._id },
          { $set: { vote: newVote } },
          { new: true } // Return the updated document
      );

      res.status(200).json({ message: "Vote updated successfully", newVote });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});
 //upview

 router.put("/upview/:id", async (req, res) => {
  try {
    let report = await QuestionVote.find({});
    report = report.filter((e) => {return  e.question_id == req.params.id});
    report = report[0];

      if (!report) {
          return res.status(404).json({ message: "Report not found" });
      }

      let newView = report.view + 1;

      await QuestionVote.findOneAndUpdate(
          { _id: report._id },
          { $set: { view: newView } },
          { new: true } // Return the updated document
      );

      res.status(200).json({ message: "Vote updated successfully", newView });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});


 //
  module.exports = router;
  
  

// module.exports= router;