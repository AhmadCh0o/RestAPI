import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Remove the token from localStorage if it's expired
      const decodedToken = parseJwt(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
      } else {
        // Token exists and is valid, navigate to PasswordForm
        navigate('/PasswordForm');
      }
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          master_password: password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('User logged in successfully.');
        setError('');

        // Store the JWT token in localStorage
        localStorage.setItem('token', data.accessToken);

        // Navigate to PasswordForm
        navigate('/PasswordForm');

        console.log('JWT Token:', data.accessToken);
      } else {
        setMessage('');
        setError('* Invalid username or password');
        console.log(response);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('');
      setError('An error occurred. Please try again later.');
    }
  };

  // Helper function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return {};
    }
  };

  return (
    <div className="login-page">
      <nav className="login-navbar">
        <div className="login-navbar-brand">VaultGuard</div>
        <div className="login-navbar-links">
          <Link to="/signup" className="login-navbar-link login-nav-other-page">Signup</Link>
          <Link to="/login" className="login-navbar-link login-nav-current-page">Login</Link>
        </div>
      </nav>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          {error && <div className="login-alert login-error">{error}</div>}
          {message && <div className="login-alert login-success">{message}</div>}
          <form onSubmit={handleLogin}>
            <div>
              <label className="login-label">Username:</label>
              <input
                className="login-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="login-label">Master Password:</label>
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-button" type="submit">Login</button>
          </form>
          <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
