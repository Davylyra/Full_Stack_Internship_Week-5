import React from 'react';
import axios from 'axios';

function NoteCard({ note, onEdit, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://penpal-b08z.onrender.com/api/notes/${note._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onDelete();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="icon-btn">✏️</button>
          <button onClick={handleDelete} className="icon-btn">🗑️</button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <div className="tags">
          {note.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
        <span className="note-date">{formatDate(note.createdAt)}</span>
      </div>
    </div>
  );
}

export default NoteCard;
