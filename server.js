const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notesApp');

// Define a schema and model for notes
const noteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true
  },
  noteDescription: {
    type: String,
    required: true
  },
  notePriority: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  pinned : {
    type : Boolean,
    default : false
  }
});

const Note = mongoose.model('Notes', noteSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route to create a new note
app.post('/save-notes', async (req, res) => {
  // Log the incoming request body
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

// Route to fetch all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
})

// Route to fetch notes by priority
app.get('/filter-notes', async (req, res) => {
  const { priority } = req.query;
  console.log(priority)

  let filter = {};
  if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
    filter.notePriority = priority;
  }

  try {
    const notes = await Note.find(filter);
    console.log(notes)
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});


// routes
app.put('/notes/:id/update-pin', async (req, res) => {
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



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
