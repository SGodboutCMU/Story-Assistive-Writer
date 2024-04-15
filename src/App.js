import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GenreSelection from './components/GenreSelection';
import CharacterDatabase from './components/CharacterDatabase';
import AddSetting from './components/AddSetting';
import QuestionInput from './components/QuestionInput';
import StoryPage from './components/StoryPage';
import './App.css';

function App() {
  const [genres, setGenres] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [settings, setSettings] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [stories, setStories] = useState([]);

  const handleGenreAdd = (newGenres) => {
    setGenres(newGenres);
  };

  const handleCharacterAdd = (newCharacters) => {
    setCharacters(newCharacters);
  };

  const handleSettingAdd = (newSettings) => {
    setSettings(newSettings);
  };

  const handleQuestionAdd = (newQuestions) => {
    setQuestions(newQuestions);
  };

  const sendStoryData = async (storyData) => {
    try {
      const response = await fetch('http://localhost:5000/submit-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData)
      });
      const data = await response.json();
      console.log(data);
      return data.storyId;
    } catch (error) {
      console.error('Error submitting story data:', error);
    }
  };

  const fetchFullStory = async (storyId) => {
    try {
      const response = await fetch(`http://localhost:5000/full-story/${storyId}`);
      const data = await response.json();
      if (data.fullStory) {
        const updatedStories = stories.map(story =>
          story.id === storyId ? {...story, fullStory: data.fullStory} : story
        );
        setStories(updatedStories);
      } else {
        setTimeout(() => fetchFullStory(storyId), 5000);
      }
    } catch (error) {
      console.error('Error fetching full story:', error);
    }
  };

  const generateStory = async () => {
    const newStory = {
      genres,
      characters,
      settings,
      questions,
      fullStory: "Waiting for Story Assist to think...",
      id: stories.length + 1
    };
    // Reset the inputs
    setGenres([]);
    setCharacters([]);
    setSettings([]);
    setQuestions([]);
    const updatedStories = [newStory, ...stories].slice(0, 10);
    setStories(updatedStories);
    const storyId = await sendStoryData({ genres, characters, settings, questions });
    if (storyId) {
      fetchFullStory(storyId);
    }

  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <>
              <div className="App">
                <header>
                  <h1>Welcome to Story Writer Assist</h1>
                </header>
                <div className="main-content">
                  <div className="section">
                    <CharacterDatabase characters={characters} onCharacterAdd={handleCharacterAdd} />
                  </div>
                  <div className="section">
                    <GenreSelection genres={genres} onGenreAdd={handleGenreAdd} />
                  </div>
                  <div className="section">
                    <AddSetting settings={settings} onSettingAdd={handleSettingAdd} />
                  </div>
                  <div className="section">
                    <QuestionInput questions={questions} onQuestionAdd={handleQuestionAdd} />
                  </div>
                </div>
                <div className="generate-story-section">
                  <button onClick={generateStory} className="generate-story-button">Start Assist</button>
                </div>
                <div className="story-history">
                    <h2>Recent Stories</h2>
                    <div className="stories-grid">
                        {stories.slice().reverse().map(story => (
                            <Link to={`/story/${story.id}`} key={story.id} className="story-link">
                                <div className="story-card">
                                    <h3>Story {story.id}</h3>
                                    <p>Characters: {story.characters.join(', ')}</p>
                                    <p>Genres: {story.genres.join(', ')}</p>
                                    <p>Settings: {story.settings.join(',')}</p>
                                    <p>Questions: {story.questions}</p>
                                    <p>Assistant Suggestions: {story.fullStory}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
              </div>
            </>
          }/>
          <Route path="/story/:id" element={<StoryPage stories={stories} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
