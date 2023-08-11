import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import useFetch from 'use-http';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { post, error } = useFetch('http://localhost:3000');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function signup() {
    try {
      const newUser = await post('users/create', {
        name: name,
        username: username,
        email: email,
        master_password: password,
      });

      if (newUser && !error) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const errorMessageText = await error.response.text();
        if (errorMessageText.includes('* Username already exists')) {
          setErrorMessage('* Username already exists');
        } else if (errorMessageText.includes('* Email already exists')) {
          setErrorMessage('* Email already exists');
        } else {
          setErrorMessage('* An error occurred. Please try again later.');
        }
      } else {
        setErrorMessage('* An error occurred. Please try again later.');
      }
    }
  }

  useEffect(() => {
    if (error) {
      console.error('* An error occurred:', error);
      setErrorMessage('* An error occurred. Please try again later.');
    }
  }, [error]);

  const handleSignup = async (event) => {
    event.preventDefault();

    if (username.length < 5) {
      setErrorMessage('* This username can\'t be used, try another one');
    } else if (password.length <= 6) {
      setErrorMessage('* Password is too short');
    } else {
      setErrorMessage('');

      try {
        await signup();
      } catch (error) {
        console.error('An error occurred during signup:', error);
        setErrorMessage('An error occurred during signup. Please try again later.');
      }
    }
  };

  return (
    <div className="signup-page">
      <nav className="signup-navbar">
        <div className="signup-navbar-brand">VaultGuard</div>
        <div className="signup-navbar-links">
          <Link to="/signup" className="signup-navbar-link signup-nav-current-page">Signup</Link>
          <Link to="/login" className="signup-navbar-link signup-nave-other-page">Login</Link>
        </div>
      </nav>

      <div className="signup-container">
        <div className="signup-form">
          <h2>Signup</h2>
          {errorMessage && <div className="signup-alert signup-error">{errorMessage}</div>}
          <form onSubmit={handleSignup}>
            <div>
              <label className="signup-label">Name:</label>
              <input
                className="signup-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="signup-label">Username:</label>
              <input
                className="signup-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="signup-label">Email:</label>
              <input
                className="signup-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="signup-label">Master Password:</label>
              <input
                className="signup-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="signup-button" type="submit">Signup</button>
          </form>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
