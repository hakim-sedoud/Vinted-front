import { Link } from "react-router-dom";

function Header({ setIsModalSing ,isLoggedIn , handleLogout , setIsModalLogin , setSearchTerm , setAscending , ascending} ) {
  
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
      const handleCheckboxChange = () => {
        setAscending(!ascending);
      };

    return (
<header className="container" >
<Link to="/">
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Vinted_Logo_2018.svg" alt="logo" />
</Link> 
<div className="tri" >
<input className="recherche"
    type="text" 
    placeholder="Recherche des articles"
    onChange={handleSearchChange}
    />
<div className="switch-container">
        <span className="sort-text">Trier par prix</span>
        <label className="switch">
          <input type="checkbox" checked={ascending} onChange={handleCheckboxChange} />
          <span className="slider round"></span>
        </label>
      </div>
   
</div>

    {isLoggedIn ? (
          <button className="deconexion" onClick={handleLogout}>Se déconnecter</button>
        ) : (
    <div className="identification">
        <button onClick={() => setIsModalSing(true) }>S'inscrir</button>
        <button onClick={() => setIsModalLogin(true)}>Se connecter</button>
        </div>) }
        <Link to="/publish" >
    <button>Vends tes articles</button>
</Link></header>
    )
  }
  
  export default Header