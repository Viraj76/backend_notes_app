const express = require('express');
const router = express.Router();
const Note = require('../models/note');  // Ensure the path is correct

// Route to create a new note
router.post('/save-notes', async (req, res) => {
  console.log("Received request to save a note:", req.body);

  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    console.error("Error saving the note:", error);
    res.status(400).send(error);
  }
});

module.exports = router;
