import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, TextField, Button, FormControlLabel, Switch, Box, IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const SearchField = styled(TextField)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#f5f6f7',
  borderRadius: 5,
  '& .MuiOutlinedInput-root': {
    borderRadius: 5,
    fontFamily: 'Maison Neue',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  [theme.breakpoints.up('md')]: {
    width: 590,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  height: 48,
  borderRadius: 5,
  fontFamily: 'Maison Neue',
  fontSize: '16px',
  color: '#fff',
  backgroundColor: '#2cb1ba',
  '&:hover': {
    backgroundColor: '#09b1ba',
  },
  margin: '0 5px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    height: 40,
    margin: '0 2px',
  },
  [theme.breakpoints.up('sm')]: {
    width: 150,
    margin: '0 10px',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const WideButton = styled(CustomButton)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 200,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

function Header({ setIsModalSing, isLoggedIn, handleLogout, setIsModalLogin, setSearchTerm, setAscending, ascending }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = () => {
    setAscending(!ascending);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const renderDrawerContent = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <SearchField
            variant="outlined"
            type="text"
            placeholder="Recherche des articles"
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={ascending}
                onChange={handleCheckboxChange}
                sx={{ '& .MuiSwitch-switchBase': { color: '#09b1ba' }, '& .MuiSwitch-track': { backgroundColor: '#f5f6f7' } }}
              />
            }
            label="Trier par prix"
            sx={{ '& .MuiTypography-root': { fontSize: 16, color: '#333' } }}
          />
        </ListItem>
        {isLoggedIn ? (
          <>
            <ListItem>
              <WideButton onClick={handleLogout}>Se déconnecter</WideButton>
            </ListItem>
            <ListItem>
              <Link to="/publish" style={{ textDecoration: 'none', width: '100%' }}>
                <WideButton>Vends tes articles</WideButton>
              </Link>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <CustomButton onClick={() => setIsModalSing(true)}>S'inscrire</CustomButton>
            </ListItem>
            <ListItem>
              <CustomButton onClick={() => setIsModalLogin(true)}>Se connecter</CustomButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', py: 2 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Vinted_Logo_2018.svg" alt="logo" sx={{ height: 40, mr:5 }} />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'center' }}>
            <SearchField
              variant="outlined"
              type="text"
              placeholder="Recherche des articles"
              onChange={handleSearchChange}
              sx={{ mr: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={ascending}
                  onChange={handleCheckboxChange}
                  sx={{ '& .MuiSwitch-switchBase': { color: '#09b1ba' }, '& .MuiSwitch-track': { backgroundColor: '#f5f6f7' } }}
                />
              }
              label="Trier par prix"
              sx={{ ml: 2, '& .MuiTypography-root': { fontSize: 16, color: '#333' } }}
            />
            {isLoggedIn ? (
              <>
                <WideButton onClick={handleLogout}>Se déconnecter</WideButton>
                <Link to="/publish" style={{ textDecoration: 'none' }}>
                  <WideButton>Vends tes articles</WideButton>
                </Link>
              </>
            ) : (
              <>
                <CustomButton onClick={() => setIsModalSing(true)}>S'inscrire</CustomButton>
                <CustomButton onClick={() => setIsModalLogin(true)}>Se connecter</CustomButton>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center' }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ color: '#09b1ba',mr:5 }}
              
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            {renderDrawerContent()}
          </Drawer>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Header;
