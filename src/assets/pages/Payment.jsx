import { useParams, Navigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import {  useState } from "react";


function Payment () {
    const { price, name } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const [completed, setCompleted] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
  
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "blabla",
      });
      console.log("stripreponse ==>",stripeResponse);
      try {
        const stripeToken = stripeResponse.token.id;
        const response = await axios.post("https://site--backend-vinded--8bd4m7bpgzgn.code.run/payment", { 
        token: stripeToken,
        title: name,
        amount: price
        });
        console.log("response.data ==>", response.data); 
        if (response.data.success === true) {
          setCompleted(true);
          setTimeout(() => {
              setRedirectToHome(true);  
          }, 5000);
      }
      } catch (error) {
        console.error("erreur pendant le payement :", error);
      }
    }; 
    if (redirectToHome) {
      return <Navigate to="/" replace />; // replace empeche de revenir vers la page de payment 
  }
    return completed ?( 
    <div className="paymentSucces">
    <p>Paiement effectué ! </p>
    <img className='confetis' src="https://usagif.com/wp-content/uploads/gif/confetti-4.gif"></img> 
    </div>
    ) :
   (
        <div className="paymentPage">
            <div className="paymentBloc">
                <h3>resumé de la commande</h3>
                <div className="order">
                    <p><span>article</span><span>{price}</span></p>
                    <p><span>frais de protection acheteurs</span><span>0.40</span></p>
                    <p><span>frais de port</span><span>0.80</span></p>
                </div>
                <div className="totalOrder">
                <p><span>Total</span><span>{(parseFloat(price) + 0.40 + 0.80).toFixed(2)} €</span></p> 
                {/* price n'est pas un Number?? */}
                <p className="recapOrder">plus qu'une étape pour acheter<strong>{name}</strong> vous allez payer <strong>{(parseFloat(price) + 0.40 + 0.80).toFixed(2)}</strong> frais de protection et frais de port inclus</p>
                </div>
                <div className="payment">
                <form onSubmit={handleSubmit}>
                    <CardElement />
                     <button>Pay</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Payment
