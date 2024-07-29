import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Userlogin.css';


const CustomerLogin = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken=localStorage.getItem('accessToken');
    const storedEmail=localStorage.getItem('customerEmail');
    const storedPassword=localStorage.getItem('customerPassword')

    if(accessToken){
      console.log('Access token found, redirecting to home...');
      navigate('/home');
    }else if (storedEmail && storedPassword) {
      console.log('Email and password found, redirecting to home...');
      setEmail(storedEmail);
      setPassword(storedPassword) // Pre-fill email if stored
    }
  }, [navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/customerlogin/', {
        email: email,
        password: password,
      
      });
      console.log(response);
     
      if (response.status === 200){
            console.log('Login successful:', response.data);
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('customerEmail',email)
            localStorage.setItem('loggedInUsername',response.data.username);
            setIsLoggedIn(true);
            navigate('/home')
           
        } else {
              setError('Login failed.Please check your email and password.');
          }
      

    } catch (error) {
      setError('Invalid email or password.'); // Handle error responses
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
    <div className="login-form">
      <h2 className="text-center mb-4">Customer Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
};

export default CustomerLogin;
