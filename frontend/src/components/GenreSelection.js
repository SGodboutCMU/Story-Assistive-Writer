import React, { useState, useEffect } from 'react';
import './FormElements.css';

const GenreSelection = ({ genres, onGenreAdd }) => {
  const [genre, setGenre] = useState('');
  const [localGenres, setLocalGenres] = useState(genres);

  // Effect to reset local state when the genres prop changes
  useEffect(() => {
    setLocalGenres(genres);
  }, [genres]);

  const addGenre = (e) => {
    e.preventDefault();
    if (!genre.trim()) return; // Prevent adding empty strings
    const newGenres = [...localGenres, genre.trim()];
    setLocalGenres(newGenres);
    setGenre(''); // Reset input field after adding
    onGenreAdd(newGenres); // Update parent component with the new list of genres
  };

  return (
    <div>
      <form onSubmit={addGenre} className="form-container">
        <input
          type="text"
          className="input-field"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter a genre"
        />
        <button type="submit" className="button">Add Genre</button>
      </form>
      <div>
        <h2>Selected Genres</h2>
        <ul className="list-container">
          {localGenres.map((genre, index) => (
            <li key={index} className="list-item">{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenreSelection;
