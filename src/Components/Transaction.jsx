import React, { useState } from 'react';
import axios from 'axios';
import './Transaction.css';

const Transaction = () => {
    // const [accountID, setAccountID] = useState('');
    const [transactionType, setTransactionType] = useState('deposit');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [accountId,setAccountId]=useState('');
    const [error, setError] = useState('');
  



    const handleSubmit = async (event) => {
        event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await axios.post('http://127.0.0.1:8000/transaction/', {
                // account_id: accountID,
                amount,
                transaction_type: transactionType,
                account_id: accountId || null
                // amount: parseFloat(amount)

            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            setMessage(`Transaction successful: ${response.data.success}`);
            setAccountId('');
            setTransactionType('');
            setAmount('');
            setError('');
            
            showAlert('Transaction done successfully')

        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred.');  
            setMessage('');
            
        }
    };
    const showAlert = (message) => {
        alert(message);
      };

    return (
        <div className="transaction-form">
            <h2>Perform transaction</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Transaction Type:</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>
        <div>
          <label>Account ID (Leave empty if not applicable):</label>
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
                  
    );
};

export default Transaction;
