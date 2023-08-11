import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from 'use-http';
import './passwordList.css'; // Import your CSS for styling

function PasswordList() {
  const navigate = useNavigate();
  const { get, response } = useFetch('http://localhost:3000');
  const [passwords, setPasswords] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [websiteInput, setWebsiteInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showLabels, setShowLabels] = useState(false); // State to control label visibility

  useEffect(() => {
    async function fetchPasswords() {
      const data = await get('/passwords/get');
      if (response.ok) {
        setPasswords(data);
      }
    }
    fetchPasswords();
  }, [response, get]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePasswordClick = (password) => {
    setSelectedPassword(password);
    setWebsiteInput(password.website);
    setUsernameInput(password.username);
    setPasswordInput(password.password);
    setShowLabels(true); // Show labels when an entry is clicked
  };

  return (
    <div className="password-list-container">
      <nav className="password-navbar">
        <div className="password-navbar-brand">VaultGuard</div>
        <div className="password-navbar-links">
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
              <Link to="/vault" className="sidebar-link my-vault">
                <i className="sidebar-icon fas fa-lock"></i>My Vault
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/favorites" className="sidebar-link">
                <i className="sidebar-icon fas fa-star"></i>Favorites
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/trash" className="sidebar-link">
                <i className="sidebar-icon fas fa-trash"></i>Trash
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/login" className="sidebar-link">
                <i className="sidebar-icon fas fa-sign-in-alt"></i>Login
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/card" className="sidebar-link">
                <i className="sidebar-icon fas fa-credit-card"></i>Card
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/identity" className="sidebar-link">
                <i className="sidebar-icon fas fa-id-card"></i>Identity
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/secureNote" className="sidebar-link">
                <i className="sidebar-icon fas fa-file"></i>Secure Note
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/tech" className="sidebar-link">
                <i className="sidebar-icon fas fa-cogs"></i>Tech
              </Link>
            </li>
            </ul>
        </aside>
        <div className="password-list-main">
          <div className="passwords-list">
            {passwords.map((password) => (
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
                       ))}
                       </div>
                     </div>
             
                     <div className="item-information">
                       <h3 className='item-title'>ITEM INFORMATION</h3>
                       {showLabels && (
                         <div>
                           <div className='item-info-row'>
                             <div className='info-label'>Website:</div>
                             <div className='info-input-container'>
                               <input
                                 type="text"
                                 value={selectedPassword ? selectedPassword.website : ''}
                                 readOnly
                               />
                             </div>
                           </div>
                           <div className='item-info-row'>
                             <div className='info-label'>Username:</div>
                             <div className='info-input-container'>
                               <input
                                 type="text"
                                 value={selectedPassword ? selectedPassword.username : ''}
                                 readOnly
                               />
                             </div>
                           </div>
                           <div className='item-info-row'>
                             <div className='info-label'>Password:</div>
                             <div className='info-input-container'>
                               <input
                                 type="text"
                                 value={selectedPassword ? selectedPassword.password : ''}
                                 readOnly
                               />
                             </div>
                           </div>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
               );
             }
             
             export default PasswordList;