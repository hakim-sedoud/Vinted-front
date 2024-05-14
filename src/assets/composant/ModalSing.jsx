import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Cookies from 'js-cookie';

function ModalSing({ setIsModalSing, setIsModalLogin, setIsLoggedIn }) {
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  // Handle checkbox state change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Submit form data to server
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', name);
    formData.append('password', password);
    formData.append('newsletter', isChecked);
    if (avatar) {
      formData.append('picture', avatar);
    }

    try {
      const response = await axios.post(
        'https://site--backend-vinded--8bd4m7bpgzgn.code.run/user/signup',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const token = response.data.token;
      Cookies.set('token', token);
      setIsLoggedIn(true);
      setFormSubmit(true);
    } catch (error) {
      console.error('Signup error:', error.response);
      setError(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  // Redirect after successful signup
  useEffect(() => {
    if (formSubmit) {
      setTimeout(() => {
        handleCloseAndNavigate();
      }, 3000);
    }
  }, [formSubmit, navigate]);

  // Close modal and navigate to home page
  const handleCloseAndNavigate = () => {
    setIsModalSing(false);
    navigate('/');
  };

  return (
    <Modal
      open
      onClose={handleCloseAndNavigate}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.603)'
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          p: 4,
          borderRadius: '10px',
          minWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          outline: 0
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {!formSubmit ? (
          <>
            <Typography id="modal-modal-title" variant="h6">Inscris-toi avec ton email</Typography>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField fullWidth margin="normal" label="Nom d'utilisateur" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField fullWidth margin="normal" label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField fullWidth margin="normal" label="Mot de passe" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <FormControlLabel control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />} label="S'inscrire à notre newsletter" />
              <Dropzone onDrop={acceptedFiles => setAvatar(acceptedFiles[0])}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()} className={`dropzone ${avatar ? 'image-loaded' : ''}`}>
                      <input {...getInputProps()} />
                      {avatar ? <p>Image chargée</p> : <p>Déposez votre photo ici, ou cliquez pour la choisir</p>}
                    </div>
                  </section>
                )}
              </Dropzone>
              <Typography sx={{ mt: 2, textAlign: 'center', fontSize: '0.75rem' }}>
                En m'inscrivant je confirme avoir lu et accepté les termes et conditions.
              </Typography>
              <Button type="submit" fullWidth sx={{ mt: 2, bgcolor: '#09b1ba', color: 'white', '&:hover': { bgcolor: '#078e97' } }}>S'inscrire</Button>
            </Box>
            <Typography onClick={() => { setIsModalSing(false); setIsModalLogin(true); }} sx={{ cursor: 'pointer', mt: 2, color: '#09b1ba', '&:hover': { textDecoration: 'underline' }}}>
              Tu as déjà un compte? <strong>Connecte-toi</strong>
            </Typography>
            <Link to="/"><Typography sx={{ cursor: 'pointer', mt: 2, color: '#09b1ba', '&:hover': { textDecoration: 'underline' }}}>Ou clic <strong>ici</strong> pour retourner à l'accueil</Typography></Link>
          </>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6">Votre compte a été créé</Typography>
            <img src="https://usagif.com/wp-content/uploads/gif/confetti-4.gif" alt="Confetti" />
            <Button onClick={handleCloseAndNavigate} sx={{ mt: 2, bgcolor: '#09b1ba', color: 'white', '&:hover': { bgcolor: '#078e97' } }}>
              Retour à la page d'accueil
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default ModalSing;
