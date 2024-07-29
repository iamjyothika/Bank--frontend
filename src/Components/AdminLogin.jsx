

import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Adminlogin.css';

function SuperadminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const storedUsername =localStorage.getItem('superadminUsername');
    const storedPassword =localStorage.getItem('superadminPassword');
    if (storedUsername) setUsername(storedUsername);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();


    console.log('name', username);
    console.log('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        username: username,
        password: password
      });
      console.log(response)


      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('superadminUsername', username);
        localStorage.setItem('superadminPassword', password);
        localStorage.setItem('', password);

        
        navigate('/register');
        console.log('Login successful:', response.data);
      } else {
        console.error('error', response.data.message)
      }


    } catch (error) {
      setError('Invalid credentials. Please try again.'); // Handle error responses
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-center mb-4">Superadmin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Email:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className='btn btn-primary'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default SuperadminLogin;


