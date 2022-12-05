const express = require("express");
const {
  getAllTask,
  addUpdateTask,
  removeTask,
} = require("../controllers/task");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/getAllTask/:_id", auth, getAllTask);
router.put("/addUpdateTask/:_id", auth, addUpdateTask);
router.delete("/removeTask/:_id", auth, removeTask);

module.exports = router;
