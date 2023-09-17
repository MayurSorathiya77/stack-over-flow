const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// const mongoose = require('mongoose')
const QuestionDB = require("../models/Question.js");
const QuestionVote = require("../models/QuestionVoteView.js");
const TagsObject = require("../models/AllTa");




router.post("/", async (req, res) => {
  const questionData = new QuestionDB({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tag,

    user: req.body.user,
  });
 
  const flag = 0;
  await questionData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Question not added successfully",
      });
    });

  let resp = await QuestionDB.find({});
  let temp = resp.filter((doc) => { return doc.title == req.body.title });

  if (temp) {
    const newId = temp[0]._id;
    const newVoteEntry = new QuestionVote({ question_id: newId, vote: 0, view: 0 });
    const saveData = newVoteEntry.save();
    console.log(newVoteEntry);
  }

  //const Alltags = req.body.tags;
 
 


});
/*router.get("/:id", async (req, res) => {
  res.status(400); // Set the HTTP status code to 400
  res.send("OK");  // Send "OK" as the response body
});*/

router.get("/:id", async (req, res) => {
  try {
    // const question = await QuestionDB.findOne({ _id: req.params.id });
    // res.status(200).send(question);

    QuestionDB.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                user: 1,
                answer: 1,
                // created_at: 1,
                question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                question_id: 1,
                user: 1,
                comment: 1,
                // created_at: 1,
                // question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      // {
      //   $unwind: {
      //     path: "$answerDetails",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $project: {
          __v: 0,
          // _id: "$_id",
          // answerDetails: { $first: "$answerDetails" },
        },
      },
    ])
      .exec()
      .then((questionDetails) => {
        res.status(200).send(questionDetails);

      })
      .catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(error);
      });
  } catch (err) {
    res.status(400).send({
      message: "Question not found",
    });
  }
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving questions",
    error: "Bad request",
  };

  QuestionDB.aggregate([
    {
      $lookup: {
        from: "comments",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              // user_id: 1,
              comment: 1,
              created_at: 1,
              // question_id: 1,
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "answers",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              // user_id: 1,
              // answer: 1,
              // created_at: 1,
              // question_id: 1,
              // created_at: 1,
            },
          },
        ],
        as: "answerDetails",
      },
    },
    // {
    //   $unwind: {
    //     path: "$answerDetails",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    {
      $project: {
        __v: 0,
        // _id: "$_id",
        // answerDetails: { $first: "$answerDetails" },
      },
    },
  ])
    .exec()
    .then((questionDetails) => {
      res.status(200).send(questionDetails);
    })
    .catch((e) => {
      console.log("Error: ", e);
      res.status(400).send(error);
    });
});

module.exports = router
