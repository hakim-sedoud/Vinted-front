import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import React from 'react';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, TextField, Checkbox, FormControlLabel, Paper, Grid } from "@mui/material";

function Publish({ userToken, setUserToken }) {
  useEffect(() => {
    const tokenCookies = Cookies.get("token");
    setUserToken(tokenCookies);
  }, [setUserToken]);

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [etat, setEtat] = useState("");
  const [lieu, setLieu] = useState("");
  const [prix, setPrix] = useState("");
  const token = userToken;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {message ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">{message}</Typography>
        </Box>
      ) : (
        <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', color: '#09b1ba' }}>
            Vends ton article
          </Typography>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const formData = new FormData();
              formData.append("picture", file);
              formData.append("title", title);
              formData.append("description", description);
              formData.append("brand", marque);
              formData.append("size", taille);
              formData.append("color", couleur);
              formData.append("condition", etat);
              formData.append("city", lieu);
              formData.append("price", prix);

              console.log("FormData contents:");
              for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
              }

              try {
                const response = await axios.post(
                  "https://site--backend-vinded--8bd4m7bpgzgn.code.run/offer/publish",
                  formData,
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );

                alert(JSON.stringify(response.data));
                setMessage("L'annonce a bien été ajoutée !");
                setTimeout(() => {
                  navigate(`/offer/${response.data._id}`);
                }, 2000);
              } catch (err) {
                if (err.response.status === 500) {
                  console.error("An error occurred");
                } else {
                  console.error(err.response.data);
                }
              }
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <Box
                      {...getRootProps()}
                      sx={{
                        p: 2,
                        border: '2px dashed #09b1ba',
                        borderRadius: 1,
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: file ? '#e8f5e9' : '#f2f2f2',
                      }}
                    >
                      <input {...getInputProps()} />
                      {file ? (
                        <Typography sx={{ color: '#4CAF50' }}>Image chargée</Typography>
                      ) : (
                        <Typography>Déposez votre photo ici, ou cliquez pour la choisir</Typography>
                      )}
                    </Box>
                  </section>
                )}
              </Dropzone>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Titre"
                  variant="outlined"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Marque"
                  variant="outlined"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Taille"
                  variant="outlined"
                  value={taille}
                  onChange={(event) => setTaille(event.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Couleur"
                  variant="outlined"
                  value={couleur}
                  onChange={(event) => setCouleur(event.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="État"
                  variant="outlined"
                  value={etat}
                  onChange={(event) => setEtat(event.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Lieu"
                  variant="outlined"
                  value={lieu}
                  onChange={(event) => setLieu(event.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Prix"
                  variant="outlined"
                  value={prix}
                  onChange={(event) => setPrix(event.target.value)}
                  sx={{ mb: 2 }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="J'accepte les échanges"
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button variant="contained" type="submit" sx={{ backgroundColor: '#09b1ba', px: 5 }}>
                Ajouter
              </Button>
            </Box>
          </form>
        </Paper>
      )}
    </Container>
  );
}

export default Publish;
