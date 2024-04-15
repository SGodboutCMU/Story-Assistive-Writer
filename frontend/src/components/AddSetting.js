import React, { useState, useEffect } from 'react';
import './FormElements.css';

const AddSetting = ({ settings, onSettingAdd }) => {
  const [setting, setSetting] = useState('');
  const [localSettings, setLocalSettings] = useState(settings);

  // Effect to reset local state when the settings prop changes
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const addSetting = (e) => {
    e.preventDefault();
    if (!setting.trim()) return; // Prevent adding empty strings
    const newSettings = [...localSettings, setting.trim()];
    setLocalSettings(newSettings);
    setSetting(''); // Reset input field after adding
    onSettingAdd(newSettings); // Update parent component with the new list of settings
  };

  return (
    <div>
      <form onSubmit={addSetting} className="form-container">
        <input
          type="text"
          className="input-field"
          value={setting}
          onChange={(e) => setSetting(e.target.value)}
          placeholder="Enter a setting"
        />
        <button type="submit" className="button">Add Setting</button>
      </form>
      <div>
        <h2>Settings List</h2>
        <ul className="list-container">
          {localSettings.map((settingItem, index) => (
            <li key={index} className="list-item">{settingItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddSetting;
