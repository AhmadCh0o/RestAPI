// src/pages/login/Login.jsx
import React, { useEffect, useState } from 'react';
import './SignUp.css';
import useFetch from 'use-http';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { post, response, loading, error } = useFetch('http://localhost:3000');

  async function signup() {
    console.log("i am calling this function");
    const newUser = await post('users/create', {
      name: name,
      username: username,
      email: email,
      password: password,
    });
    console.log(newUser);

  }

  const handleLogin = (event) => {
    event.preventDefault();
    // Add your login logic here (e.g., authentication)
  };

  useEffect(() => {
    console.dir(error, loading, response);
  }, [error, loading, response]);

  return (
    <div className="container">
      <div className="login-form">
        <h2>Signup</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={signup}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
