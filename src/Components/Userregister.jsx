import React, { useState } from 'react';
import axios from 'axios';
import './Userregister.css';
import { useNavigate } from 'react-router-dom';




function CustomerRegistration() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [id_proof, setIdProof] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  
  const handleRegistration = async (e) => {
    e.preventDefault();
    
    const accessToken = localStorage.getItem('accessToken');
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', {
        email,
        username,
        phone,
        id_proof: id_proof,
        password,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 201) {
        setMessage('Registration successful:', response.data);
        alert('Registered successfully');
        navigate('/user');
      } else {
        console.error('Error', response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        setError(`Registration failed: ${error.response.data.message}`);
      } else if (error.request) {
        
        console.error('Error request:', error.request);
        setError('No response from server. Please try again.');
      } else {
      
        console.error('Error', error.message);
        setError(`Error: ${error.message}`);
      }
    }
    
  };
  const handleManageLoans = (e) => {
    e.preventDefault();
    navigate('/permission')


   
  };

  return (
  <div className="register-container">
  <h2 className="text-center mb-4">Customer Registration</h2>
  {error && <p className="text-danger">{error}</p>}
  <form onSubmit={handleRegistration}>
    <div className="form-group">
      <label htmlFor="email" className="form-label">Email:</label>
      <input
        type="email"
        id="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
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
    <div className="form-group">
      <label htmlFor="username" className="form-label">Username:</label>
      <input
        type="text"
        id="username"
        className="form-control"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="phone" className="form-label">Phone:</label>
      <input
        type="text"
        id="phone"
        className="form-control"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="idProof" className="form-label">ID Proof:</label>
      <input
        type="text"
        id="idProof"
        className="form-control"
        value={id_proof}
        onChange={(e) => setIdProof(e.target.value)}
        required
      />
    </div>
    <div className="d-flex justify-content-between">
        <button type="submit" className="btn register-button">Register</button>
        <button type="button" className="btn manage-loans-button" onClick={handleManageLoans}>Manage Loans</button>
    </div>
    {message && <p className="success-message">{message}</p>}
  </form>
</div>

  );
}

export default CustomerRegistration;
