import { useParams } from "react-router-dom";

function Offerpage({data}) {
    const { id } = useParams();
    const offer = data.find((item) => item._id === id);

    return (
<div className="pageOffer">
    <div className="offerContainer"> 
    <div className="imgOffer">
    <img src={offer.product_image.url}  alt="" />
    </div>
    <div className="offerInfo">
        <div className="offerTop">
        <p>{offer.product_price.toFixed(2)} €</p>
        <div className="offerDescription">
        {offer.product_details.map((detail) => {
          const key = Object.keys(detail)[0]; // Récupérer la clé (ex: "MARQUE")
          const value = detail[key]; // Récupérer la valeur (ex: "STRADIVARIUS")
          return <p key={key}><span className="key">{`${key}`}:</span><span className="value">{`${value}`}</span></p>
          ;
        })}
        </div>
        </div>
        <p>------------------------------------------------------------</p>
        <div className="offerBottom">
            <p>{offer.product_name}</p>
            <p>{offer.product_description}</p>
            <div className="owner">
                <img src={offer.owner.account.avatar.url} alt="" /> <span>{offer.owner.account.username}</span>
            </div>
        </div>
        <button className="achetez">Achetez</button>
    </div>
    </div>
    
</div>
    )
  }
  
  export default Offerpage