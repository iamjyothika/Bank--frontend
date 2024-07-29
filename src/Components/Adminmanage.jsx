
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Adminmanage.css';

const Loanmanage = () => {

  const [loans, setLoans] = useState([]);
  const [error, setError] = useState('');
  const [statusMessage,setStatusMessage]=useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken){ 
          setError('No access token found.');
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/loans/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`, 
          }
        });
        
        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
        setLoans(response.data);
      } else {
        setError('Invalid data format from API');
      }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error || 'Something went wrong.');
        } else {
          setError('Something went wrong. Please try again.');
        }
        console.error('Fetching error:', error.message);
      }
    };
    
    fetchLoans();
  }, []);

  const handleApproval = async (loanId, action) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.patch(`http://127.0.0.1:8000/loans/approve_reject/${loanId}/`, { action }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      setLoans(loans.map(loan =>
        loan.id === loanId ? { ...loan, status: action === 'approve' ? 'Approved' : 'Rejected' } : loan
      ));
      setStatusMessage(action === 'approve' ? 'Loan approved successfully' : 'Loan rejected ');
    } catch (error) {
      setError('Failed to update loan status');
    }
  };

  return (
    <div className='table-container'>
      <h2>Loan Management</h2>
      {error && <p>{error}</p>}
       {statusMessage && (
        <div className="status-message">
          {statusMessage}
        </div>
      )}
      <table className="table-bordered">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Customer</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{loan.customer}</td>
              <td>{loan.loan_type}</td>
              <td>{loan.amountt}</td>
              <td>{loan.status}</td>
              <td>
                <button  className="btn-approve" onClick={() => handleApproval(loan.id, 'approve')}>Approve</button>
                <button className="btn-reject" onClick={() => handleApproval(loan.id, 'reject')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Loanmanage;
