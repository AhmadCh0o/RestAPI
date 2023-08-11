import React, { useState, useEffect } from 'react';
import useFetch from 'use-http';

function PasswordList() {
  const [passwords, setPasswords] = useState([]);
  const { get, response } = useFetch('http://localhost:3000'); // Adjust API endpoint

  useEffect(() => {
    async function fetchPasswords() {
      const data = await get('/passwords/get'); // Make sure the API endpoint is correct
      if (response.ok) {
        setPasswords(data); // Assuming data is an array of passwords
      }
    }
    fetchPasswords();
  }, [response, get]); // Add 'get' to the dependency array

  return (
    <div>
      <h2>Passwords</h2>
      <ul>
        {passwords.map((password) => (
          <li key={password.id}>
            <div>
              <strong>Website:</strong> {password.website}
            </div>
            <div>
              <strong>Username:</strong> {password.username}
            </div>
            <div>
              <strong>Password:</strong> {password.password}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 

export default PasswordList;
