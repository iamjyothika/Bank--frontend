import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import './password.css';

function PasswordChange() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
  const accessToken = localStorage.getItem('accessToken');  

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/updatepassword/',
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Password updated successfully');
        setErrorMessage('');
        // Clear the form fields
        setOldPassword('');
        setNewPassword('');
      }
    } catch (error) {
      setErrorMessage('Password change failed. Please try again.');
      setSuccessMessage('');
      console.error('Password change error:', error);
    }
  };

  return (
    <div className="password-change-container">
      <h2>Change Password</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <form onSubmit={handleChangePassword}>
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password:</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
       Submit
        </button>
      </form>
    </div>
  );
}

export default PasswordChange;
