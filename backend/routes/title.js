const express = require("express");
const {
  createTitle,
  getAllTitle,
  updateTitle,
  removeTitle,
} = require("../controllers/title");
const router = express.Router();

router.post("/createTitle", createTitle);
router.get("/getAlltitle", getAllTitle);
router.put("/updatetitle/:_id", updateTitle);
router.delete("/removeTitle/:_id", removeTitle);

module.exports = router;
