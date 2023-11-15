import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from 'use-http';
import './passwordList.css';

function PasswordList() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { get, patch, del } = useFetch('http://localhost:4000', options);
  const [passwords, setPasswords] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [websiteInput, setWebsiteInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showLabels, setShowLabels] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchPasswords() {
      if (!token) {
        navigate('/login');
        return;
      }

      const userTokenPayload = token.split('.')[1];
      const userTokenDecoded = atob(userTokenPayload);
      const user = JSON.parse(userTokenDecoded);
      console.log('Decoded User:', user);

      const url = '/passwords/get';
      const data = await get(url);

      console.log('API Data:', data);

      if (data) {
        console.log('API Data:', data); // Log the fetched data
        const userPasswords = data.filter(password => password.userId === user.id);
        console.log('User Passwords:', userPasswords);
        setPasswords(userPasswords);
      }
      
    }

    fetchPasswords();
  }, [get, navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePasswordClick = (password) => {
    setSelectedPassword(password);
    setWebsiteInput(password.website);
    setUsernameInput(password.username);
    setPasswordInput(password.password);
    setShowLabels(true);
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedPassword) {
      return;
    }
    const updatedPassword = {
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    };
    await patch(`/passwords/update/${selectedPassword.id}`, updatedPassword);
    setSelectedPassword(updatedPassword);
    setEditMode(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSaveEdit();
    }
  };

  const handleDelete = async (passwordId) => {
    if (!passwordId) {
      return;
    }
    const confirmDelete = window.confirm('Are you sure you want to delete this password?');
    if (!confirmDelete) {
      return;
    }
    const deleteResponse = await del(`/passwords/delete/${passwordId}`);
    if (deleteResponse.ok) {
      const updatedPasswords = passwords.filter((password) => password.id !== passwordId);
      setPasswords(updatedPasswords);
      setSelectedPassword(null);
      setShowLabels(false);
      setEditMode(false);
    } else {
      console.error('Failed to delete password');
    }
  };
  return (
    <div className="password-list-container">
      <nav className="password-navbar">
        <div className="password-navbar-brand">VaultGuard</div>
        <div className="password-navbar-links">
          <Link to="/userProfile" className="password-navbar-link password-nav-view">Profile</Link>
          <Link to="/passwordForm" className="password-navbar-link password-nav-view">Create Password</Link>
          <button className="password-navbar-link password-nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="content-container">
        <aside className="password-list-sidebar">
          <div className="sidebar-header">My Password Manager</div>
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <button to="/vault" className="sidebar-link my-vault">
                <i className="sidebar-icon fas fa-lock"></i>My Vault
              </button>
            </li>
            <li className="sidebar-item">
              <button to="/favorites" className="sidebar-link">
                <i className="sidebar-icon fas fa-star"></i>Favorites
              </button>
            </li>
            <li className="sidebar-item">
              <button to="/login" className="sidebar-link">
                <i className="sidebar-icon fas fa-sign-in-alt"></i>Login
              </button>
            </li>
            <li className="sidebar-item">
              <button to="/card" className="sidebar-link">
                <i className="sidebar-icon fas fa-credit-card"></i>Card
              </button>
            </li>
            <li className="sidebar-item">
              <button to="/identity" className="sidebar-link">
                <i className="sidebar-icon fas fa-id-card"></i>Identity
              </button>
            </li>
            <li className="sidebar-item">
              <button to="/secureNote" className="sidebar-link">
                <i className="sidebar-icon fas fa-file"></i>Secure Note
              </button>
            </li>
            <li className="sidebar-item">
              <button to="/tech" className="sidebar-link">
                <i className="sidebar-icon fas fa-cogs"></i>Tech
              </button>
            </li>
            </ul>
        </aside>
        <div className="password-list-main">
        <div className="passwords-list">
  {passwords.map((password) => {
    console.log('Mapped Password:', password); // Add this line
    return (
      <div
        key={password.id}
        className={`password-entry ${selectedPassword === password ? 'selected' : ''}`}
        onClick={() => handlePasswordClick(password)}
      > 
        <div>
          <strong>Website:</strong> {password.website}
        </div>
        <div>
          <strong>Username:</strong> {password.username}
        </div>
      </div>
    );
  })}
</div>

                       </div>
          <div className="item-information">
            <h3 className="item-title">ITEM INFORMATION</h3>
            {showLabels && (
              <div>
                <div className="item-info-row">
                  <div className="info-label">Website:</div>
                  <div className="info-input-container">
                    <input
                      type="text"
                      value={websiteInput}
                      readOnly={!editMode}
                      onChange={(e) => setWebsiteInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
                <div className="item-info-row">
                  <div className="info-label">Username:</div>
                  <div className="info-input-container">
                    <input
                      type="text"
                      value={usernameInput}
                      readOnly={!editMode}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
                <div className="item-info-row">
                  <div className="info-label">Password:</div>
                  <div className="info-input-container">
                    <input
                      type={editMode ? 'text' : 'password'} /* Change the input type based on editMode*/
                      value={passwordInput}
                      readOnly={!editMode}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
                <div className="edit-button-container">
                  {!editMode ? (
                    <button className="edit-button" onClick={handleEditClick}>
                      Edit
                    </button>
                  ) : (
                    <button className="edit-button" onClick={handleSaveEdit}>
                      Save
                    </button>
                  )}
                   <button className="delete-button" onClick={() => handleDelete(selectedPassword.id)}>
                      Delete
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}

export default PasswordList;