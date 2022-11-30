const mongoose = require("mongoose");

const titleSchema = new mongoose.Schema(
  {
    title: String,
    task: [String],
  },
  { versionKey: false, timestamps: true }
);

const TitleModel = mongoose.model("Title", titleSchema);

module.exports = TitleModel;
