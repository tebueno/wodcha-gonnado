const mongoose = require("mongoose");

const wodSchema = mongoose.Schema({
    link: String,
    status: String,
    workout: String
  });
  
  const model = mongoose.model("wodmodel", wodSchema);

  module.exports = model;