import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

function ModalLogin({ setIsModalSing, setIsModalLogin, handleLoginSubmit, loginError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginSubmit(event, email, password);
  };

  const closeModal = () => {
    setIsModalLogin(false);
    navigate("/");
  };

  return (
    <Modal
      open
      onClose={closeModal}
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
          width: 500,
          borderRadius: '10px',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Connexion
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            type="text"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={{
              input: {
                border: 'none',
                borderBottom: '1px solid #000',
                bgcolor: '#f7f7f7'
              }
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Mot de passe"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{
              input: {
                border: 'none',
                borderBottom: '1px solid #000',
                bgcolor: '#f7f7f7'
              }
            }}
          />
          {loginError && <Typography color="error" sx={{ mt: 2 }}>{loginError}</Typography>}
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2, bgcolor: '#09b1ba', color: 'white', '&:hover': { bgcolor: '#f1f1f1' } }}>
            Se connecter
          </Button>
          <Typography sx={{ cursor: 'pointer', color: '#09b1ba', '&:hover': { textDecoration: 'underline' } }} onClick={() => { setIsModalSing(true); setIsModalLogin(false); }}>
            Tu n'as pas de compte ? inscris toi
          </Typography>
          <Link to="/"><Typography sx={{ cursor: 'pointer', color: '#09b1ba', '&:hover': { textDecoration: 'underline' } }} onClick={() => setIsModalLogin(false)}>Ou retourner à l'accueil</Typography></Link>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalLogin;
