import { Link } from "react-router-dom";

function Header({ setIsModalSing ,isLoggedIn , handleLogout , setIsModalLogin} ) {
  
    return (
<header className="container" >
<Link to="/">
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Vinted_Logo_2018.svg" alt="logo" />
</Link> 
    <input type="text" placeholder="Recherche des articles"/>
    {isLoggedIn ? (
          <button className="deconexion" onClick={handleLogout}>Se déconnecter</button>
        ) : (
    <div className="identification">
        <button onClick={() => setIsModalSing(true) }>S'inscrir</button>
        <button onClick={() => setIsModalLogin(true)}>Se connecter</button>
        </div>) }
    <button>Vends tes articles</button>
</header>
    )
  }
  
  export default Header