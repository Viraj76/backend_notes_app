const express = require('express');
const router = express.Router();
const Note = require('../models/note');  // Ensure the path is correct

// Route to fetch all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
