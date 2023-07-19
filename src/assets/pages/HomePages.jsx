import { Link } from "react-router-dom";
import ModalSing from "../composant/ModalSing";

function HomePage({data, isModalSing, setIsModalSing }) {

    return (
<main>
<div className="BcgImg">
    <div className="inBcgImg">
        <div className="itemBloc">
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button> Commencez à vendre</button>
        <a href="">Découvrir coment ca marche</a>
        </div>
    </div>
</div>
<div className="offres" >
{data.map((item) => (
    <Link to={`/offer/${item._id}`} key={item._id} className="offer-link">
              <div key={item._id} className="offer">
            <p className="offerName">{item.owner.account.username}</p>
            <img src={item.product_image.url} alt={item.nom} />
            <p>{item.product_price.toFixed(2)} €</p>
            {item.product_details.TAILLE && <p>{item.product_details.TAILLE}</p>}
            {item.product_details.MARQUE && <p>{item.product_details.MARQUE}</p>}
          </div>
    </Link>

        ))}
</div>


</main>
    )
  }
  
  export default HomePage