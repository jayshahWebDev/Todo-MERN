const Title = require("../models/title");

exports.createTitle = async (req, res) => {
  try {
    let { title, task } = req.body;

    if (!title || !task) {
      throw new Error("Title and Task is required");
    }

    let newTitle = new Title({
      title,
      task,
    });

    let saveTitle = await newTitle.save();

    res.status(201).json({
      success: true,
      message: "Title Created SuccessFully",
    });
  } catch (error) {
    console.log("createTitle Error::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTitle = async (req, res) => {
  try {
    let findTitles = await Title.find({}, { title: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      title: findTitles,
    });
  } catch (error) {
    console.log("getAllTitle Error::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTitle = async (req, res) => {
  try {
    let { _id } = req.params,
      { title } = req.body;

    if (!_id) throw new Error("Please Pass Valid Id");
    if (!title) throw new Error("Title Is Required");

    let titleExists = await Title.findOne({ _id });
    if (!titleExists) throw new Error("Title Not Exists");

    let updateTitle = await Title.findOneAndUpdate({ _id }, { title });

    res.status(200).json({
      success: true,
      message: "Title Updated SuccessFully",
    });
  } catch (error) {
    console.log("updateTitle Error::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeTitle = async (req, res) => {
  try {
    let { _id } = req.params;

    if (!_id) throw new Error("Please Pass Valid Id");

    let titleExists = await Title.findOne({ _id });
    if (!titleExists) throw new Error("Title Not Exists");

    let removeTitle = await Title.findOneAndRemove({ _id });

    res.status(200).json({
      success: true,
      message: "Title Removed SuccessFully",
    });
  } catch (error) {
    console.log("removeTitle Error::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
