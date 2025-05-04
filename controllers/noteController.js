const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.getAll(req.userId);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, userId: req.userId });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.update({ ...req.body, userId: req.userId });
    res.status(200).json(note);
  } catch (error) {
    if (error.message === 'Note not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const result = await Note.delete(req.body.id, req.userId);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Note not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const searchNotes = async (req, res) => {
    try {
      const notes = await Note.search(req.query.q, req.userId);
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { 
    getNotes, 
    createNote, 
    updateNote, 
    deleteNote, 
    searchNotes 
  };
  