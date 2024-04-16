import React, { useState, useEffect } from 'react';
import './FormElements.css';

const StoryPoints = ({ storyPoints, onStoryPointAdd }) => {
  const [storyPoint, setStoryPoint] = useState('');
  const [localStoryPoints, setLocalStoryPoints] = useState(storyPoints);

  // Effect to reset local state when the storyPoints prop changes
  useEffect(() => {
    setLocalStoryPoints(storyPoints);
  }, [storyPoints]);

  const addStoryPoint = (e) => {
    e.preventDefault();
    if (!storyPoint.trim()) return; // Prevent adding empty strings
    const newStoryPoints = [...localStoryPoints, storyPoint.trim()];
    setLocalStoryPoints(newStoryPoints);
    setStoryPoint(''); // Reset input field after adding
    onStoryPointAdd(newStoryPoints); // Update parent component with the new list of story points
  };

  return (
    <div>
      <form onSubmit={addStoryPoint} className="form-container">
        <input
          type="text"
          className="input-field"
          value={storyPoint}
          onChange={(e) => setStoryPoint(e.target.value)}
          placeholder="Enter a story point"
        />
        <button type="submit" className="button">Add Story Point</button>
      </form>
      <div>
        <h2>Story Points List</h2>
        <ul className="list-container">
          {localStoryPoints.map((point, index) => (
            <li key={index} className="list-item">{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoryPoints;
