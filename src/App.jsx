import 'bootstrap/dist/css/bootstrap.min.css';
import BankNavbar from './Components/Navbar';
import React,{useState} from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import SuperadminLogin from './Components/AdminLogin';
import CustomerRegistration from './Components/Userregister';
import CustomerLogin from './Components/Userlogin';
import TransferFunds from './Components/Transfer';
import Transaction from './Components/Transaction';
import LoanApplication from './Components/Loanapply';
import PasswordChange from './Components/password';
import Loanmanage from './Components/Adminmanage';
import HomePage from './Components/Home';
import CustomerDetails from './Components/Account';





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  



  return (
    <>
     <div className="App">
      <BankNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />
      <Routes>
      <Route path='/' element={<SuperadminLogin/>}/>
      <Route path='/login' element={<SuperadminLogin/>}/>
      <Route path='/register' element={<CustomerRegistration/>}/>
      <Route path='/user' element={<CustomerLogin setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='/transfer' element={<TransferFunds/>}/>
      <Route path='/transaction' element={<Transaction/>}/>
      <Route path='/loan' element={<LoanApplication/>}/>
      <Route path='/permission' element={<Loanmanage/>}/>
      <Route path='/password' element={<PasswordChange/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/account' element={<CustomerDetails/>}/>
      </Routes>
      <Footer />
    </div>
     
    </>
  );
}

export default App
