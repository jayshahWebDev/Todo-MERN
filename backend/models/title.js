const mongoose = require("mongoose");

const titleSchema = new mongoose.Schema(
  {
    title: String,
    task: [String],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false, timestamps: true }
);

const TitleModel = mongoose.model("Title", titleSchema);

module.exports = TitleModel;
