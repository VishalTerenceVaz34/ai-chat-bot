import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [theme, setTheme] = useState(user?.theme || 'light');
  const [language, setLanguage] = useState(user?.language || 'en');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      await updateProfile({ username, theme, language });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1>Profile Settings</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label>Email</label>
          <input type="email" value={user?.email || ''} disabled />
        </div>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="input-group">
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            Back to Chat
          </button>
        </div>

        <div className="logout-section">
          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
