const express = require('express');
const router = express.Router();
const Note = require('../models/note');  // Correct path

// Route to fetch notes by priority
router.get('/filter-notes', async (req, res) => {
  const { priority } = req.query;
  console.log(priority);

  let filter = {};
  if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
    filter.notePriority = priority;
  }

  try {
    const notes = await Note.find(filter);
    console.log(notes);
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
