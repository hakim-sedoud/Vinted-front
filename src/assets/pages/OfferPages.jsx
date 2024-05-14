import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Typography, Button, CircularProgress, Avatar, Grid, Paper, Divider } from "@mui/material";

function Offerpage() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [offer, setOffer] = useState({});

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
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ backgroundColor: '#ebedee', minHeight: 'calc(100vh - 60px)', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-around">
          <Grid item xs={12} md={6}>
            <img src={offer.product_image.url} alt="" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h5" component="p" sx={{ pb: 2 }}>
                  {offer.product_price.toFixed(2)} €
                </Typography>
                <Box>
                  {offer.product_details.map((detail) => {
                    const key = Object.keys(detail)[0];
                    const value = detail[key];
                    return (
                      <Typography key={key} sx={{ py: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <span style={{ textAlign: 'left', fontWeight: 300, color: '#999' }}>{`${key}`}:</span>
                        <span style={{ textAlign: 'left', fontWeight: 300 }}>{`${value}`}</span>
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">{offer.product_name}</Typography>
                <Typography color="textSecondary">{offer.product_description}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {offer.owner.account.avatar && (
                    <Avatar src={offer.owner.account.avatar.url} alt="" sx={{ width: 50, height: 50, mr: 2 }} />
                  )}
                  <Typography>{offer.owner.account.username}</Typography>
                </Box>
              </Box>
              <Link to={`/Payment/${offer._id}/${offer.product_price.toFixed(2)}/${offer.product_name}`} style={{ textDecoration: 'none', marginTop: '32px' }}>
                <Button variant="contained" sx={{ backgroundColor: '#09b1ba', borderRadius: 1, color: '#fff', fontSize: 16, height: 36, mt: 4 }}>
                  Achetez
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Offerpage;
