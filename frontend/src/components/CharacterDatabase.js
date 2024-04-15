import React, { useState, useEffect } from 'react';
import './FormElements.css';

const CharacterDatabase = ({ characters, onCharacterAdd }) => {
  const [characterName, setCharacterName] = useState('');
  const [personality, setPersonality] = useState('');
  const [localCharacters, setLocalCharacters] = useState(characters);

  useEffect(() => {
    setLocalCharacters(characters);  // Reset local characters when the parent state changes
  }, [characters]);  // Depend on the characters prop

  const addCharacter = (e) => {
    e.preventDefault();
    if (!characterName.trim() || !personality.trim()) return; // Ensure both fields are filled
    const characterDescription = `Character Name: ${characterName.trim()}, Personality: ${personality.trim()}`;
    const newCharacters = [...localCharacters, characterDescription];
    setLocalCharacters(newCharacters);
    setCharacterName('');  // Clear the character name field
    setPersonality('');    // Clear the personality field
    onCharacterAdd(newCharacters);
  };

  return (
    <div>
      <form onSubmit={addCharacter} className="form-container">
        <input
          type="text"
          className="input-field"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          placeholder="Character Name"
        />
        <input
          type="text"
          className="input-field"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          placeholder="Personality"
        />
        <button type="submit" className="button">Add Character</button>
      </form>
      <div>
        <h2>Characters List</h2>
        <ul className="list-container">
          {localCharacters.map((character, index) => (
            <li key={index} className="list-item">{character}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDatabase;
