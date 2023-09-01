const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const TagsObject = require("../models/AllTag");


router.get("/", async (req, res) => {
    try {
        res.status(200).json("hello This is From Tags Api"); // Send the JSON array as response
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


module.exports = router;