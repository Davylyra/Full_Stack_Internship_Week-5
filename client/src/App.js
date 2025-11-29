import { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({ title: "", content: "", tags: "" });

  const getNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const addNote = async () => {
    await axios.post("http://localhost:5000/api/notes", {
      ...form,
      tags: form.tags.split(",")
    });
    setForm({ title: "", content: "", tags: "" });
    getNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete("http://localhost:5000/api/notes/" + id);
    getNotes();
  };

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.join(", ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Note Keeper</h1>

      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Create Note</h3>
      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
      ></textarea>
      <input
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={e => setForm({ ...form, tags: e.target.value })}
      />

      <button onClick={addNote}>Add Note</button>

      <div className="note-list">
        {filteredNotes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
