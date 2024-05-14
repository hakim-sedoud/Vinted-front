import { useParams, Navigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { Box, Typography, Button, CircularProgress, Container, Paper } from "@mui/material";

function Payment() {
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
    console.log("stripeResponse ==>", stripeResponse);
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
      console.error("erreur pendant le paiement :", error);
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" replace />;
  }

  return completed ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" component="p">Paiement effectué !</Typography>
      <img src="https://usagif.com/wp-content/uploads/gif/confetti-4.gif" alt="Confetti" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
    </Box>
  ) : (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#bcbcbc' }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" component="h3">Résumé de la commande</Typography>
          <Box sx={{ my: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Article</Typography>
              <Typography>{price} €</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Frais de protection acheteurs</Typography>
              <Typography>0.40 €</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Frais de port</Typography>
              <Typography>0.80 €</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 1, pb: 2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">{(parseFloat(price) + 0.40 + 0.80).toFixed(2)} €</Typography>
          </Box>
          <Typography sx={{ my: 2, fontSize: 14, color: '#757575' }}>
            Plus qu'une étape pour acheter <strong>{name}</strong>. Vous allez payer <strong>{(parseFloat(price) + 0.40 + 0.80).toFixed(2)} €</strong> frais de protection et frais de port inclus.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <CardElement />
              </Box>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#09b1ba', width: '100%' }}>Pay</Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Payment;
