import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";



function ModalSing({ setIsModalSing , setIsModalLogin}) {
  
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [formSubmit, setformSubmit] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(
            'https://lereacteur-vinted-api.herokuapp.com/user/signup',
            {
              email: email,
              username: name,
              password: password,
              newsletter: isChecked,
            }
          );
          console.log(response.data);
          const token = response.data.token;
          Cookies.set('token', token);
          setformSubmit(true);
        } catch (error) {
          if (error.response && error.response.status === 409) {
            setError("Cet utilisateur existe déjà dans la base de données.");
          } else {
            console.error('Error submitting form:', error);
          }
        }
      };

    return (
<div className="modalSing" onClick={() => {
    setIsModalSing(false)}}>
{!formSubmit ? (
  <div onClick={(event) => {
    event.stopPropagation()}}>
    <p className='closeModal'onClick={() => {
    setIsModalSing(false)}} >X</p>
    <h1>Inscris-toi avec ton email</h1>
    {error && <p className="error">{error}</p>}

  <form  onSubmit={handleSubmit}>
 
    <div className='inp'>
    <input type="text" placeholder="Nom d'utilisateur" id='name' value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}/>
    </div>
    <div className='inp'>
    <input type="email" placeholder='Email'id='email'  value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}/>
    </div>
    <div className='inp'>
    <input type="Password" placeholder='Mot de passe'id='password'  value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}/>
    </div>
    <label className='singChek'>
        <input 
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        S'inscrir à notre newsletter
      </label>
      <p>En m'inscrivant je confirme avoir lu et accepté les termes blablablabla</p>

    <button className='singButton'>S'inscrir</button>
  </form>
  <p onClick={()=>{setIsModalSing(false); setIsModalLogin(true) } }>Tu as deja un compte? Connecte-toi</p>
  <Link to="/"><p onClick={()=>{setIsModalSing(false)}}>Ou retourner à l'accueil</p></Link>        
  </div> )
  :(
  <div className='resultBloc' onClick={(event) => {
    event.stopPropagation()}}> 
        <p className='closeModal'onClick={() => {
    setIsModalSing(false)}} >X</p>
    <h1>Results</h1>
    <div className='result'>
      <p>Name : {name}</p>
      <p>Email : {email}</p>
      <p>Password : {password}</p>
    </div>
    <button onClick={()=>setformSubmit(false)  }>Edit your information</button>
    </div>
  )}
</div>
    )
  }
  
  export default ModalSing