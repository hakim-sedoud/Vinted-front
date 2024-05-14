import { Box, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function HomePage({ filteredData, ascending }) {
    const comparePrices = (a, b) => {
        return ascending ? a.product_price - b.product_price : b.product_price - a.product_price;
    };

    filteredData.sort(comparePrices);

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{
                backgroundImage: 'url("https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: { xs: '300px', sm: '400px', md: '500px', lg: '628px' },
                display: 'flex',
                alignItems: 'center',
            }}>
                <Box sx={{
                    maxWidth: '1200px',
                    margin: 'auto',
                    padding: { xs: '50px 20px', sm: '100px 20px', md: '150px 20px' },
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    alignItems: 'center',
                    textAlign: { xs: 'center', md: 'left' }
                }}>
                    <Box sx={{
                        width: { xs: '90%', sm: '70%', md: '90%', lg: '332px' },
                        height: { xs: '50%', sm: '70%', md: '90%', lg: '250px' },
                        backgroundColor: 'white',
                        borderRadius: 5,
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                    }}>
                        <Typography variant="h5" component="p">
                            Prêts à faire du tri dans vos placards ?
                        </Typography>
                        <Button component={RouterLink} to="/Publish" sx={{
                            backgroundColor: '#09b1ba',
                            borderColor: '#09b1ba',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px' },
                            height: { xs: '36px', sm: '40px', md: '48px', lg: '48px' },
                            lineHeight: { xs: '36px', sm: '40px', md: '48px', lg: '48px' },
                            marginTop: '16px',
                            padding: { xs: '0 16px', sm: '0 24px', md: '0 32px', lg: '0 32px' },
                            '&:hover': {
                                backgroundColor: '#07a0a9'
                            }
                        }}>Commencez à vendre</Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                maxWidth: 1200,
                margin: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                padding: { xs: '20px 10px', sm: '30px 20px', md: '40px 30px' },
                justifyContent: 'center',
            }}>
                {filteredData.map((item) => (
                    <Link component={RouterLink} to={`/offer/${item._id}`} key={item._id} underline="none" sx={{ width: '100%', maxWidth: '230px', textDecoration: 'none', m:2 }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s, boxShadow 0.3s',
                            '&:hover': {
                                transform: 'translateY(-10px)',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            },
                            width: '100%', 
                            height: 380, 
                            padding: '20px'
                        }}>
                            <Typography variant="subtitle1" sx={{
                                height: 30,
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%',
                                textAlign: 'center',
                                marginBottom: 1,
                                color: '#09b1ba'
                            }}>
                               Vendeur : {item.owner.account.username}
                            </Typography>
                            <Box
                                component="img"
                                src={item.product_image.url}
                                alt={item.nom}
                                sx={{
                                    width: '100%',
                                    height: '200px', 
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s, filter 0.3s',
                                    '&:hover': {
                                        filter: 'brightness(85%)',
                                        transform: 'scale(1.05)',
                                    }
                                }}
                            />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 1,
                                flexGrow: 1
                            }}>
                              <Typography variant="body1" sx={{
                                    fontWeight: 'medium',
                                    fontSize: '1rem',
                                    marginBottom: 1,
                                    color: '#09b1ba',
                                    fontWeight: 'bold'
                                }}>
                                    {item.product_name}
                                    </Typography>
                                <Typography variant="body1" sx={{
                                    fontWeight: 'medium',
                                    fontSize: '1rem',
                                    marginBottom: 1,
                                    color: '#09b1ba',
                                    fontWeight: 'bold'
                                }}>
                                    {item.product_price.toFixed(2)} €
                                </Typography>
                                {item.product_details[3] && (
                                    <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 0.5 }}>
                                        Taille: {item.product_details[3].Size}
                                    </Typography>
                                )}
                                {item.product_details[2] && (
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Marque: {item.product_details[2].Brand}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Link>
                ))}
            </Box>
        </Box>
    );
}

export default HomePage;
