const express = require("express");
const router = express.Router();
const controller = require("../controllers/noteController");

router.get("/", controller.getNotes);
router.post("/", controller.addNote);
router.put("/:id", controller.updateNote);
router.delete("/:id", controller.deleteNote);

module.exports = router;
