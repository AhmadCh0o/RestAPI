import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import PasswordForm from './pages/main/passwordForm';
import PasswordList from './pages/main/passwordList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} /> {/* Add route for SignUpForm */}
          <Route path="/login" element={<Login />} /> {/* Add route for LoginForm */}
          <Route path="/passwordForm" element={<PasswordForm />} /> {/* Add route for PasswordForm */}
          <Route path="/passwordList" element={<PasswordList />} /> {/* Add route for PasswordList */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
