import React,{ useEffect} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function BankNavbar({isLoggedIn,setIsLoggedIn}) {
  
  const navigate=useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  const handleLogout = async  () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No access token found.');
        return;
      }

      console.log('Access Token:', accessToken); 
  

      const response=await axios.post('http://127.0.0.1:8000/customerlogout/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      console.log('Logout successful:', response.data);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('customerEmail');
      localStorage.removeItem('customerPassword');
      localStorage.removeItem('loggedInUsername');
      setIsLoggedIn(false);
      navigate('/user');
    } catch (error) {
      if (error.response) {
        console.error('Logout error:', error.response.data);
        console.error('Status code:',error.response.status);
        if (error.response.status === 401) {
          console.error('Unauthorized: The token may be invalid or expired.');
        }
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
      }
      
    }
  };

  return (
    <Navbar bg="orange" expand="lg">
      <Navbar.Brand href="#home">Bank</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/login'>Admin Login</Nav.Link>
          
        </Nav>

        <Nav>
        {isLoggedIn ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <Nav.Link href="/user">Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BankNavbar;



