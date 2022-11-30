const Title = require("../models/title");

exports.getAllTask = async (req, res) => {
  try {
    let { _id } = req.params;

    if (!_id) throw new Error("Please pass valid id");

    let getAllTask = await Title.find({}, { task: 1 });

    res.status(200).json({
      success: true,
      task: getAllTask,
    });
  } catch (error) {
    console.log("getAllTask Error::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addUpdateTask = async (req, res) => {
  try {
    let { index, task } = req.body,
      { _id } = req.params,
      message = "Task Updated SuccessFully";

    if (!task) throw new Error("Task is required");

    let titleExists = await Title.findOne({ _id });
    if (!titleExists) throw new Error("Title is not exists");

    if (index) {
      titleExists.task[index] = task;
    } else {
      titleExists.task.push(task);
      message = "Task Added SuccessFully";
    }
    await titleExists.save();

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.log("addUpdateTask Error::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeTask = async (req, res) => {
  try {
    let { _id } = req.params,
      { index } = req.body;

    if (!_id || !index) throw new Error("Pass required fields");

    let titleExists = await Title.findOne({ _id });
    if (!titleExists) throw new Error("Title is not exists");

    titleExists.task.splice(index, 1);
    await titleExists.save();

    res.status(200).json({
      success: true,
      message: "Task Removed SuccessFully",
    });
  } catch (error) {
    console.log("removeTask Error::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
