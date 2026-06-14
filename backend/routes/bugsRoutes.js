const express = require("express");
const router = express.Router();
const { getBugs, createBug, updateBug, deleteBug } = require("../controllers/bugsController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect); // Protect all routes

router.get("/", getBugs);
router.post("/", createBug);
router.put("/:id", updateBug);
router.delete("/:id", deleteBug);

module.exports = router;