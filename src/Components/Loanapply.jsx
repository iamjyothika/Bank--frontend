
import React, { useState } from 'react';
import axios from 'axios';
import './Loanapply.css';

const LoanApplication = () => {
  const [loanType, setLoanType] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  const accessToken=localStorage.getItem('accessToken');
    try {
        const response = await axios.post('http://127.0.0.1:8000/loans/apply/', {
            loan_type: loanType,
            amountt: amount,
       
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
        }
      });
      console.log(response.data)
      setSuccess('Loan application submitted successfully');
      setError('');
    } catch (error) {
      setError('Failed to submit loan application');
      setSuccess('');
    }
  };

  return (
    <div className="loan-application-container">
    <h2>Apply for a Loan</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="loanType">Loan Type</label>
        <select
          id="loanType"
          value={loanType}
          onChange={(e) => setLoanType(e.target.value)}
          required
        >
          <option value="">Select Loan Type</option>
          <option value="Personal">Personal</option>
          <option value="Home">Home</option>
          <option value="Student">Student</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  </div>
  );
};

export default LoanApplication;
