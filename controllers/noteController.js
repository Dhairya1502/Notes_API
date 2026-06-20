const Note = require("../models/Note");

// GET all notes (ONLY logged-in user's notes)
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// CREATE note (attach userId)
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const note = new Note({
            title,
            content,
            userId: req.user.userId   // 🔥 IMPORTANT
        });

        await note.save();

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE note (only own note)
const updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            {
                title: req.body.title,
                content: req.body.content
            },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found or not authorized"
            });
        }

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE note (only own note)
const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found or not authorized"
            });
        }

        res.json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
};