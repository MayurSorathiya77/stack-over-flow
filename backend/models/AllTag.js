
const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  
  Tage : String,

});

module.exports = mongoose.model("TagS", TagSchema);
