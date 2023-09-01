const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const AnswerVoteView = require("../models/AnswerVoteView");

router.post("/", async (req, res) => {

    console.log(req);
    res.status(200).send("Data successfully processed and Mayur.");
  });
  router.post("/:id", async (req, res) => {

    console.log(req);
    res.status(200).send("Data successfully processed and Mayur." + req.params.id);
  });

module.exports= router;