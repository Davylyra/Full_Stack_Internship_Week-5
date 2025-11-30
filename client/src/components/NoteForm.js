import React from 'react';
import axios from 'axios';

function NoteForm({ note, onClose, onSave }) {
  const [title, setTitle] = React.useState(note?.title || '');
  const [content, setContent] = React.useState(note?.content || '');
  const [tags, setTags] = React.useState(note?.tags?.join(', ') || '');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    try {
      if (note) {
        await axios.put(
          `http://localhost:5000/api/notes/${note._id}`,
          { title, content, tags: tagsArray },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/notes',
          { title, content, tags: tagsArray },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      onSave();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save note');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Tags (comma separated, e.g., work, important)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {note ? 'Update' : 'Save'} Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;