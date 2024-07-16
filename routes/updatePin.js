const express = require('express');
const router = express.Router();
const Note = require('../models/note');  // Correct path

// Route to update pinned field
router.put('/notes/:id/update-pin', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the note by ID
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Toggle the pinned field
    note.pinned = !note.pinned;

    // Save the updated note
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    console.error('Error updating note pinned field:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
