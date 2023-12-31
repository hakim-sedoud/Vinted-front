import { Link, useParams } from "react-router-dom";
import {  useState, useEffect } from "react";
import axios from "axios";


function Offerpage() {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [offer ,setOffer] = useState({})
    // const offerId = (data.find((item) => item._id === id));
    // setOffer(offerId)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(
              `https://site--backend-vinded--8bd4m7bpgzgn.code.run/offer/${id}`
            );
    
            setOffer(data);
            setIsLoading(false);
          } catch (error) {
            console.log("catch Offer>>>", error);
          }
        };
    
        fetchData();
      }, [id]);

    return isLoading ? (
        <div>Loading...</div>
      ) :(
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
          const key = Object.keys(detail)[0]; 
          const value = detail[key]; 
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
            {offer.owner.account.avatar && 
            <img src={offer.owner.account.avatar.url} alt="" /> 
            }
                 <span>{offer.owner.account.username}</span>
                

            </div>
        </div>
        <Link to={`/Payment/${offer._id}/${offer.product_price.toFixed(2)}/${offer.product_name}`}>
           <button className="achetez">Achetez</button>
        </Link>
    </div>
    </div>
    
</div>
    )
  }
  
  export default Offerpage