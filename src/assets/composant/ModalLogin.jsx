import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
function ModalLogin({ setIsModalSing, setIsModalLogin, handleLoginSubmit, loginError }) {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    handleLoginSubmit(event, email, password);
  };
  const navigate = useNavigate();
  const closeModal = () => {
    setIsModalLogin(false);
    navigate("/");
  };
  return (
    
    <div className="modalLogin" onClick={closeModal}>
      <div onClick={(event) => event.stopPropagation()}>
      <Link to="/">
      <p className='closeModal'onClick={() => setIsModalLogin(false)}>X</p>
    </Link>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className='inp'>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className='inp'>
            <input
              type="password"
              placeholder='Mot de passe'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {loginError && <p className="error">{loginError}</p>}
          <button className='loginButton'>Se connecter</button>
          <p onClick={()=>{setIsModalSing(true); setIsModalLogin(false) } }>Tu n'as pas de compte ? inscris toi </p>
          <Link to="/"><p onClick={()=> setIsModalLogin(false) }>Ou retourner à l'accueil</p></Link>        
          </form>
      </div>
    </div>
  
  );
}

export default ModalLogin;
