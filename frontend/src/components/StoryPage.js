import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './StoryPage.css';

function StoryPage({ stories }) {
  const { id } = useParams();
  const story = stories.find(story => story.id === parseInt(id));

  return (
    <div className="story-page-container">
      <div className="story-content">
        <h1 className="story-header">Story Overview for Story {id}</h1>
        {story ? (
          <>
            <section className="story-section">
              <h2>Assistant Suggestions</h2>
              <p>{story.fullStory}</p>
            </section>
            <section className="story-section">
              <h2>Characters</h2>
              <ul>
                {story.characters.map((char, index) => <li key={index}>{char}</li>)}
              </ul>
            </section>
            <section className="story-section">
              <h2>Genres</h2>
              <ul>
                {story.genres.map((genre, index) => <li key={index}>{genre}</li>)}
              </ul>
            </section>
            <section className="story-section">
              <h2>Settings</h2>
              <ul>
                {story.settings.map((setting, index) => <li key={index}>{setting}</li>)}
              </ul>
            </section>
            <section className="story-section">
              <h2>Questions</h2>
              <ul>
                {story.questions.map((question, index) => <li key={index}>{question}</li>)}
              </ul>
            </section>
            <section className="story-section">
              <h2>Story Points</h2>
              <ul>
                {story.storyPoints.map((point, index) => <li key={index}>{point}</li>)}
              </ul>
            </section>
          </>
        ) : (
          <p>Story not found.</p>
        )}
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    </div>
  );
}

export default StoryPage;
