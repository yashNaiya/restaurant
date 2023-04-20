import { Box, Button, Dialog, DialogTitle, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';
import api from '../../Api';
import gift from '../../Assets/gift-box.png'
import ContactPage from '../ContactPage';
const Offers = () => {
    const [offers, setoffers] = useState([])
    const [contactBox, setcontactBox] = useState(false)
    const navigation = useNavigate()
    useEffect(() => {
        api.get('/offers')
            .then(res => setoffers(res.data))
    }, [])

    if (offers) {
        return (
            <Box display={'flex'} flexDirection={'column'}>
                <Dialog fullWidth disableEscapeKeyDown open={contactBox} onClose={() => { setcontactBox(false) }}>
                    <DialogTitle>Help Request</DialogTitle>
                    <ContactPage />
                </Dialog>
                <Navbar />
                <Box minHeight={'100vh'} marginX={'10%'} marginY={'2rem'}>
                    <Box borderBottom={'2px solid #a9927d'} display={'flex'} flexDirection={'row'}>
                        <Button onClick={() => {
                            navigation('/home')
                        }}>
                            <ArrowBackIosNewRoundedIcon fontSize='15px' />
                            Home
                        </Button>
                        <Typography m={'auto'} textAlign={'center'} variant={'h5'}>Offers</Typography>
                    </Box>
                    <Box m='3rem' display={'flex'} flexDirection='column'>
                        {
                            offers.map((offer, index) =>
                                <Box justifyContent={'space-between'} display={'flex'} flexDirection='column' borderRadius={5} paddingX='1rem' paddingY={'2rem'} key={index} alignSelf={index % 2 == 0 ? 'flex-start' : 'flex-end'} bgcolor={index % 2 == 0 ? '#815854' : '#F9EBDE'} m='1rem' width={'30rem'} height='15rem' sx={{ boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 12px , rgba(0, 0, 0, 0.3) 0px 3px 12px" }}>
                                    <Box>
                                        <Typography color={index % 2 == 0 ? '#F9EBDE' : '#815854'} fontWeight='bold' fontSize='48px'>{offer.name}</Typography>
                                        {offer.name === 'Flat off' &&
                                            <Typography fontSize='24px'>Flat {offer.percentage}% Off On Order Above {offer.price}</Typography>
                                            ||
                                            offer.name === 'First order' &&
                                            <Typography fontSize='24px'>Get {offer.percentage}% Off On Your Fist Order</Typography>
                                        }
                                    </Box>
                                    <Box display={'flex'} justifyContent='space-between' flexDirection={'row'}>
                                        <Box>
                                            <Typography fontSize={'18px'}>Coupon :</Typography>
                                            {index % 2 == 0 &&
                                                <Typography fontSize={'18px'} p='.5rem' width={'5rem'} borderRadius='.5rem' sx={{ backgroundColor: "#F9EBDE" }}>{offer.coupon}</Typography>

                                                ||
                                                <Typography fontSize={'18px'} p='.5rem' width={'5rem'} borderRadius='.5rem' sx={{ backgroundColor: "#815854" }}>{offer.coupon}</Typography>
                                            }
                                        </Box>
                                        <img src={gift} width='72px' height={'72px'}></img>
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                </Box>

                <Footer setcontactBox={setcontactBox} />
            </Box>
        )
    }
}

export default Offers
