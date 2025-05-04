const { notes } = require('../config/db');

class Note {
  static async getAll(userId) {
    return new Promise((resolve, reject) => {
      notes.find({ userId }, (err, userNotes) => {
        if (err) reject(err);
        resolve(userNotes);
      });
    });
  }
  
  static async create(noteData) {
    const { title, text, userId } = noteData;
    
    if (title.length > 50) {
      throw new Error('Title must be less than 50 characters');
    }
    
    if (text.length > 300) {
      throw new Error('Text must be less than 300 characters');
    }
    
    const note = {
      title,
      text,
      userId,
      createdAt: new Date(),
      modifiedAt: new Date()
    };
    
    return new Promise((resolve, reject) => {
      notes.insert(note, (err, newNote) => {
        if (err) reject(err);
        resolve(newNote);
      });
    });
  }
  
  static async update(noteData) {
    const { id, title, text, userId } = noteData;
    
    if (title && title.length > 50) {
      throw new Error('Title must be less than 50 characters');
    }
    
    if (text && text.length > 300) {
      throw new Error('Text must be less than 300 characters');
    }
    
    // Hitta anteckning
    const note = await new Promise((resolve) => {
      notes.findOne({ _id: id, userId }, (err, note) => {
        resolve(note);
      });
    });
    
    if (!note) {
      throw new Error('Note not found');
    }
    
    // Uppdatera anteckning
    const updatedNote = {
      ...note,
      title: title || note.title,
      text: text || note.text,
      modifiedAt: new Date()
    };
    
    return new Promise((resolve, reject) => {
      notes.update({ _id: id, userId }, updatedNote, {}, (err) => {
        if (err) reject(err);
        resolve(updatedNote);
      });
    });
  }
  
  static async delete(id, userId) {
    // Hitta anteckning
    const note = await new Promise((resolve) => {
      notes.findOne({ _id: id, userId }, (err, note) => {
        resolve(note);
      });
    });
    
    if (!note) {
      throw new Error('Note not found');
    }
    
    // Rader anteckning
    return new Promise((resolve, reject) => {
      notes.remove({ _id: id, userId }, {}, (err, numRemoved) => {
        if (err) reject(err);
        resolve({ message: 'Note deleted successfully' });
      });
    });
  }
  
  static async search(query, userId) {
    const regex = new RegExp(query, 'i');
    
    return new Promise((resolve, reject) => {
      notes.find({ title: { $regex: regex }, userId }, (err, foundNotes) => {
        if (err) reject(err);
        resolve(foundNotes);
      });
    });
  }
}

module.exports = Note;