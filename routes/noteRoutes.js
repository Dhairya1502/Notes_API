const express = require("express");
const router = express.Router();

const {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔐 PROTECT ALL ROUTES
router.use(authMiddleware);

// GET all notes (only logged-in user)
router.get("/", getNotes);

// CREATE note
router.post("/", createNote);

// UPDATE note
router.put("/:id", updateNote);

// DELETE note
router.delete("/:id", deleteNote);

module.exports = router;