import React, { useState, useEffect } from 'react';
import useFetch from 'use-http';
import { Link, useNavigate } from 'react-router-dom';
import './passwordForm.css';

function PasswordForm() {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { post, error } = useFetch('http://localhost:3000'); // Adjust API endpoint
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // No token exists, navigate to login page
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!website) {
      setErrorMessage('* Please fill in the website field.');
      return;
    } else if (!username) {
      setErrorMessage('* Please fill in the username field');
      return;
    } else if (!password) {
      setErrorMessage('* Please fill in the password field');
      return;
    }

    try {
      await post('passwords/create', {
        website,
        username,
        password,
      });

      // Clear form after submission
      setWebsite('');
      setUsername('');
      setPassword('');
      setErrorMessage('');
      setSuccessMessage('* Password created successfully.');
    } catch (error) {
      console.error('* Error creating password:', error);

      if (error.message.toLowerCase() === 'failed to fetch') {
        setErrorMessage('* Failed to connect to the server. Please check your internet connection.');
      } else {
        setErrorMessage('* Error creating password. Please try again later.');
      }
    }
  };

  const handleInputChange = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="password-navbar">
        <div className="password-navbar-brand">VaultGuard</div>
        <div className="password-navbar-links">
          <Link to="/passwordList" className="password-navbar-link password-nav-view">View Passwords</Link>
          <button className="password-navbar-link password-nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Password Form */}
      <div className="password-form-container">
        <div className="password-form">
          <h2>Create New Password</h2>
          {errorMessage && <p className="password-error">{errorMessage}</p>}
          {successMessage && <p className="password-success">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label className="password-label">Website:</label>
              <input
                className="password-input"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                onInput={handleInputChange}
              />
            </div>
            <div>
              <label className="password-label">Username:</label>
              <input
                className="password-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onInput={handleInputChange}
              />
            </div>
            <div>
              <label className="password-label">Password:</label>
              <input
                className="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={handleInputChange}
              />
            </div>
            <button className="password-button" type="submit">
              Create Password
            </button>
          </form>
          {error && <p className="password-error">Error creating password: {error.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default PasswordForm;
