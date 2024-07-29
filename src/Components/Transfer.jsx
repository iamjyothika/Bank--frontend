import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Transfer.css';

function TransferFunds() {
  const [senderAccount, setSenderAccount] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();
  



  const handleTransfer = async (e) => {
    e.preventDefault();

  const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post('http://127.0.0.1:8000/transfer/', {
        sender_account: senderAccount,
        receiver_account: receiverAccount,
        amount: amount
      },
      {
        headers: {
            'Authorization': `Bearer ${accessToken}`
      }
    }
    
    

    );

      // Handle successful transfer
      setSuccessMessage(response.data.success);
      setErrorMessage('');

      // Clear form fields after successful transfer (optional)
      setSenderAccount('');
      setReceiverAccount('');
      setAmount('');
      showAlert('Funds transferred successfully')

    } catch (error) {
      // Handle errors
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Something went wrong.');
        setSuccessMessage('');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
        console.error('Transfer error:', error.message);
      }
    }
  };
  const handleChangePasswordClick = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate('/password'); // Redirect to the change password component
  };
  const showAlert = (message) => {
    alert(message);
  };

  return (
    <div className="transfer-form-container">
    <h2>Transfer funds</h2>
    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    <form onSubmit={handleTransfer}>
      <div className="mb-3">
        <label htmlFor="senderAccount" className="form-label">Sender Account ID:</label>
        <input
          type="text"
          id="senderAccount"
          className="form-control"
          value={senderAccount}
          onChange={(e) => setSenderAccount(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="receiverAccount" className="form-label">Receiver Account ID:</label>
        <input
          type="text"
          id="receiverAccount"
          className="form-control"
          value={receiverAccount}
          onChange={(e) => setReceiverAccount(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount:</label>
        <input
          type="number"
          id="amount"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <div className='button-group'>
      <button className="btn btn-primary" type="submit">
        Transfer Funds
      </button>
      <button className="btn btn-secondary" onClick={handleChangePasswordClick}>Change password</button>
      </div>
    </form>
  </div>
  
  );
}

export default TransferFunds;
