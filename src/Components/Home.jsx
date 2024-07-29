import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [loggedInUsername, setLoggedInUsername] = useState('');
    
    
  useEffect(() => { 
    const username = localStorage.getItem('loggedInUsername');
    console.log('Fetched username from local storage:', username); 
    if (username) {
       setLoggedInUsername(username);
      }else {
        navigate('/user');
      }
    }, [navigate]);
    

  

  
  


  return (
    <div className="container mt-5 d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
    <div>
      <h1 className="text-center mb-4">Welcome, {loggedInUsername}!</h1>
      <div className="quote-container text-center mb-4">
        <p className="quote">"Banking made simple, banking made for you."</p>
        <p className="quote">"Your money, your future, your bank."</p>
        <p className="quote">"Managing your finances, just a click away."</p>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">View Account</h5>
              <p className="card-text">Check your account details and balance.</p>
              <button className="btn btn-primary" onClick={() => navigate('/account')}>View Account</button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Transfer Funds</h5>
              <p className="card-text">Transfer money to other accounts easily.</p>
              <button className="btn btn-primary" onClick={() => navigate('/transfer')}>Transfer Funds</button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Perform Transaction</h5>
              <p className="card-text">Perform a transaction quickly and easily.</p>
              <button className="btn btn-primary" onClick={() => navigate('/transaction')}>Do Transaction</button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Apply for Loan</h5>
              <p className="card-text">Apply for a loan with quick admin approval.</p>
              <button className="btn btn-primary" onClick={() => navigate('/loan')}>Apply for Loan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomePage;
