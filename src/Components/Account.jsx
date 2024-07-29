import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Account.css';

const CustomerDetails = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch customer details when the component mounts
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/account/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Include the access token
          }
        });
        setCustomerData(response.data);
      } catch (error) {
        setError('Failed to fetch customer details.');
        console.error('Error fetching customer details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="customer-details-container">
   
      {customerData && (
        <div className="customer-details">
          <h2>Customer Details</h2>
          <p><strong>Username:</strong> {customerData.username}</p>
          <p><strong>Email:</strong> {customerData.email}</p>
          <p><strong>Phone:</strong> {customerData.phone}</p>
          <p><strong>ID Proof:</strong> {customerData.id_proof}</p>
          <p><strong>Account Number:</strong> {customerData.account_no}</p>
          <p><strong>Balance:</strong> ₹{customerData.balance}</p>
          <h3>Transactions:</h3>
          <div className="transaction-table-container">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {customerData.transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.transaction_type}</td>
                    <td>₹{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default CustomerDetails;
