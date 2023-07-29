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
import Publish from './assets/pages/Publish';
import Payment from './assets/pages/Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP");


function App() {
  const [data, setData] = useState([]);
  const [isModalSing , setIsModalSing] = useState(false)
  const [isModalLogin, setIsModalLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredData, setFilteredData] = useState([]); 
  const [ascending, setAscending] = useState(true);
  const [userToken, setUserToken] = useState("")



  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.product_details.MARQUE
          ? item.product_details.MARQUE.toLowerCase().includes(searchTerm.toLowerCase())
          : item.product_details.TAILLE
          ? item.product_details.TAILLE.toLowerCase().includes(searchTerm.toLowerCase())
          : item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);


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
  useEffect(() => {
  }, [userToken]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://lereacteur-vinted-api.herokuapp.com/offers/`);
        const jsonData = await response.json();
        setData(jsonData.offers);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
<div >
{/* <Elements stripe={stripePromise}>
      <Payment />
    </Elements> */}
  
  <Router>
  <Header isModalSing = {isModalSing} 
  setIsModalSing = {setIsModalSing} 
  isLoggedIn={isLoggedIn}
  handleLogout={handleLogout}
  setIsModalLogin={setIsModalLogin}
  setSearchTerm={setSearchTerm}
  setAscending={setAscending}
  ascending={ascending}

  />
    <Routes>
      <Route path='/' element={<HomePage 
      data={data} 
      setData= {setData}
      isModalSing = {isModalSing} 
      setIsModalSing= {setIsModalSing}
      filteredData= {filteredData}
      ascending={ascending}
      />}
      />
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
        <Route path="/Publish"
          element={
            isLoggedIn ? (
              <Publish userToken={userToken} setUserToken = {setUserToken}/>
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
          <Route path="/Payment/:id/:price/:name" element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          } />


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

</div>
  )
}

export default App
