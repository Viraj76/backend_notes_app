const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notesApp');

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
const indexRouter = require('./routes/index');
const createNoteRouter = require('./routes/createNote');
const fetchNotesRouter = require('./routes/fetchNotes');
const filterNotesRouter = require('./routes/filterNotes');
const updatePinRouter = require('./routes/updatePin');

app.use('/', indexRouter);
app.use('/', createNoteRouter);
app.use('/', fetchNotesRouter);
app.use('/', filterNotesRouter);
app.use('/', updatePinRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
