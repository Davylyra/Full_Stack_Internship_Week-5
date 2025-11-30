import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [notes, setNotes] = React.useState([]);
  const [filteredNotes, setFilteredNotes] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editNote, setEditNote] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
 
const handleLogout = () => {
  // Show confirmation dialog
  const confirmLogout = window.confirm('Are you sure you want to logout?');
  
  if (confirmLogout) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href='/login';
  }
};
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredNotes(filtered);
    }
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditNote(null);
  };

  const handleSaveNote = () => {
    fetchNotes();
    handleCloseForm();
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1>📝 Notes Keeper</h1>
        <div className="nav-right">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="content">
        <div className="header-section">
          <SearchBar onSearch={handleSearch} />
          <button 
            onClick={() => setShowForm(true)} 
            className="btn-primary"
          >
            + New Note
          </button>
        </div>

        {showForm && (
          <NoteForm
            note={editNote}
            onClose={handleCloseForm}
            onSave={handleSaveNote}
          />
        )}

        <div className="notes-grid">
          {filteredNotes.length === 0 ? (
            <p className="no-notes">No notes found. Create your first note!</p>
          ) : (
            filteredNotes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={fetchNotes}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;