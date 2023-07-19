import './App.css'
import { BrowserRouter as Router, Routes, Route, Link , useParams} from "react-router-dom";
import Header from './assets/composant/Header';
import HomePage from './assets/pages/HomePages';
import { useState, useEffect } from 'react';
import Offerpage from './assets/pages/OfferPages';
import Cookies from 'js-cookie';
import ModalLogin from './assets/composant/ModalLogin';
import ModalSing from './assets/composant/ModalSing';
import axios from 'axios';


function App() {
  const [data, setData] = useState([]);
  const [isModalSing , setIsModalSing] = useState(false)
  const [isModalLogin, setIsModalLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lereacteur-vinted-api.herokuapp.com/offers');
        const jsonData = await response.json();
        setData(jsonData.offers);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  const handleLoginSubmit = async (event, email, password) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://lereacteur-vinted-api.herokuapp.com/user/login',
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.token;
      Cookies.set('token', token);
      setIsLoggedIn(true);
      setIsModalLogin(false);
      setLoginError('');
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };
 
  return (
<div >
  
  <Router>
  <Header isModalSing = {isModalSing} 
  setIsModalSing = {setIsModalSing} 
  isLoggedIn={isLoggedIn}
  handleLogout={handleLogout}
  setIsModalLogin={setIsModalLogin}
  />
    <Routes>
      <Route path='/' element={<HomePage data={data} 
      isModalSing = {isModalSing} 
      setIsModalSing= {setIsModalSing}
      />}
      />
      {/* <Route path='/offer/:id' element={<Offerpage data={data}/>}/> */}
      <Route
          path="/offer/:id"
          element={
            isLoggedIn ? (
              <Offerpage data={data} />
            ) : (
              <ModalLogin
                isModalLogin={isModalLogin}
                setIsModalLogin={setIsModalLogin}
                handleLoginSubmit={handleLoginSubmit}
                setIsModalSing = {setIsModalSing}
                loginError={loginError}
              />
            )
          }
        />
    </Routes>
    {isModalSing && <ModalSing 
    isModalSing ={isModalSing} 
    setIsModalSing = {setIsModalSing} 
    setIsModalLogin = {setIsModalLogin}
/>}
  {isModalLogin && (
        <ModalLogin
          isModalLogin={isModalLogin}
          setIsModalLogin={setIsModalLogin}
          setIsModalSing = {setIsModalSing}
          handleLoginSubmit={handleLoginSubmit}
          loginError={loginError}
        />
      )}
  </Router>
  {/* {isModalSing && <ModalSing 
    isModalSing ={isModalSing} 
    setIsModalSing = {setIsModalSing} 
    setIsModalLogin = {setIsModalLogin}
/>}
  {isModalLogin && (
        <ModalLogin
          isModalLogin={isModalLogin}
          setIsModalLogin={setIsModalLogin}
          setIsModalSing = {setIsModalSing}
          handleLoginSubmit={handleLoginSubmit}
          loginError={loginError}
        />
      )} */}
</div>
  )
}

export default App
