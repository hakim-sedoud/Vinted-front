import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link ,Navigate } from "react-router-dom";
import Dropzone from 'react-dropzone'



function ModalSing({ setIsModalSing , setIsModalLogin , setIsLoggedIn}) {
  
    const [avatar, setAvatar] = useState(null)     
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

        const defaultAvatarURL = "my-react-app/src/img/547789-200.png";

        const formData = new FormData();
  formData.append('email', email);
  formData.append('username', name);
  formData.append('password', password);
  formData.append('newsletter', isChecked);
  if (avatar) {
    formData.append('picture', avatar);
} else {
    formData.append('defaultAvatar', defaultAvatarURL);
}        try {
         const response = await axios.post(
      'https://site--backend-vinded--8bd4m7bpgzgn.code.run/user/signup',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
          console.log(response.data);
          const token = response.data.token;
          Cookies.set('token', token);
          setformSubmit(true);
          setIsLoggedIn(true)
        } catch (error) {
          setError( error.response.data.message);
        }
      };

      const [redirectToHome, setRedirectToHome] = useState(false);

      useEffect(() => {
          if (formSubmit) {
              const timer = setTimeout(() => {
                  setRedirectToHome(true);
                  
              }, 2000);
  
              return () => clearTimeout(timer);
          }
      }, [formSubmit]);
  
      if (redirectToHome) {
          return <Navigate to="/" />;
      }

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
      
      <Dropzone onDrop={acceptedFiles => setAvatar(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className={`dropzone ${avatar ? 'image-loaded' : ''}`}>
              <input {...getInputProps()} />
              {avatar ? (
                <p>image chargée</p>
              ) : (
                <p>Déposez votre photo ici, ou cliquez pour la choisir</p>
              )}
            </div>
          </section>
        )}
      </Dropzone>


      <p className='condition'>En m'inscrivant je confirme avoir lu et accepté les termes blablablabla</p>

    <button className='singButton'>S'inscrir</button>
  </form>
  <p className='goToConnexion' onClick={()=>{setIsModalSing(false); setIsModalLogin(true) } }>Tu as deja un compte? <strong>Connecte-toi</strong></p>
  <Link to="/"><p className='goToHome' onClick={()=>{setIsModalSing(false)}}>Ou clic <strong>ici</strong> pour retourner à l'accueil</p></Link>        
  </div> )
  :(
  <div className='resultBloc' onClick={(event) => {
    event.stopPropagation()}}> 
        <p className='closeModal'onClick={() => {
    setIsModalSing(false)}} >X</p>
    <h1>Votre compte a été créé</h1>
    <div className='result'>
      <img className='confetis' src="https://usagif.com/wp-content/uploads/gif/confetti-4.gif"></img>
    </div>
    <Link to="/">
    <button className='goToAccueil'>retour à la page d'accueil dans quelque secondes</button>
      </Link> 
    </div>
  )}
</div>
    )
  }
  
  export default ModalSing