const Note = require("../models/Note");

// GET all notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// CREATE note
const createNote = async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            content: req.body.content
        });

        await note.save();

        res.json({
            message: "Note saved to MongoDB",
            note
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE note
const updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content
            },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE note
const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
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