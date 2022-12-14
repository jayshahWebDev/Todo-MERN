const Title = require("../models/title");

exports.getAllTask = async (req, res) => {
  try {
    let { _id } = req.params,
      { id } = req.currentUser;

    if (!_id) throw new Error("Please pass valid id");

    let titleExists = await Title.findOne({ _id, userId: id });
    if (!titleExists) throw new Error("Title is not exists");

    res.status(200).json({
      success: true,
      task: titleExists.task,
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
      message = "Task Updated SuccessFully",
      { id } = req.currentUser;

    if (!task) throw new Error("Task is required");

    let titleExists = await Title.findOne({ _id, userId: id });
    if (!titleExists) throw new Error("Title is not exists");

    if (index >= 0) {
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
      { index } = req.body,
      { id } = req.currentUser;

    if (!_id || !index < 0) throw new Error("Pass required fields");

    let titleExists = await Title.findOne({ _id, userId: id });
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
