import React from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search notes by title, content, or tags..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;