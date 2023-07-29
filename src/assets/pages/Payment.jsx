import { useParams } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import {  useState } from "react";

    




function Payment () {
    const { price, name } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
  
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "blabla",
      });
      console.log("stripreponse ==>",stripeResponse);
      try {
        const stripeToken = stripeResponse.token.id;
        const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/payment", {
          stripeToken,
        });
        console.log("response.data ==>", response.data); // n'arrive pas jusqu'ici
        if (response.data.status === "succeeded") {
          setCompleted(true);
        }
      } catch (error) {
        console.error("erreur pendant le payement :", error);
      }
    };
    return completed ?( <span>Paiement effectué ! </span> ) :
   (
        <div className="paymentPage">
            <div className="paymentBloc">
                <h3>resumé de la commande</h3>
                <div className="order">
                    <p><span>commande</span><span>{price}</span></p>
                    <p><span>frais de protection acheteurs</span><span>0.40</span></p>
                    <p><span>frais de port</span><span>0.80</span></p>
                </div>
                <div className="totalOrder">
                <p><span>Total</span><span>{(parseFloat(price) + 0.40 + 0.80).toFixed(2)} €</span></p>
                <p>plus qu'une étape pour acheter {name} vous allez payer {(parseFloat(price) + 0.40 + 0.80).toFixed(2)} frais de protection et frais de port inclus</p>
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
