function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p>Tags: {note.tags.join(", ")}</p>

      <button onClick={() => onEdit(note)}>Edit</button>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </div>
  );
}
export default NoteCard;
