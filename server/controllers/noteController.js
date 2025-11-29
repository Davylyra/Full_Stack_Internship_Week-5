const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
};

exports.addNote = async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.json({ message: "Note added", note: newNote });
};

exports.updateNote = async (req, res) => {
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};
