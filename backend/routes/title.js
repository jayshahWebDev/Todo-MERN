const express = require("express");
const {
  createTitle,
  getAllTitle,
  updateTitle,
  removeTitle,
  searchTitle,
} = require("../controllers/title");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/createTitle", auth, createTitle);
router.get("/getAlltitle", auth, getAllTitle);
router.put("/updatetitle/:_id", auth, updateTitle);
router.delete("/removeTitle/:_id", auth, removeTitle);
router.get("/searchTitle", auth, searchTitle);

module.exports = router;
