const express = require("express");
const {
  getAllTask,
  addUpdateTask,
  removeTask,
} = require("../controllers/task");
const router = express.Router();

router.get("/getAllTask/:_id", getAllTask);
router.put("/addUpdateTask/:_id", addUpdateTask);
router.delete("/removeTask/:_id", removeTask);

module.exports = router;
