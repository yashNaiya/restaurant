import { Box, Typography, Button, Dialog, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import UserInfo from './UserInfo';
import { useEffect, useState } from 'react';
import OrderHistory from './OrderHistory';
import api from '../../Api';
import Footer from '../Footer';
import ContactPage from '../ContactPage';
import { CloseCircle } from 'iconsax-react';
const Account = () => {
    const [contactBox, setcontactBox] = useState(false)
    const [rootUser, setrootUser] = useState()
    const navigation = useNavigate()
    const callAccountPage = () => {
        api.get("/account", { withCredentials: true })
            .then(res => {
                setrootUser(res.data.rootUser)
            }).catch((err) => {
                navigation('/login')
            })
    }
    useEffect(() => {
        callAccountPage();
    }, [])
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Dialog fullWidth disableEscapeKeyDown open={contactBox} onClose={() => { setcontactBox(false) }}>
            <DialogTitle><Box display={'flex'} flexDirection={'row'} justifyContent='space-between'><Typography>Help Request</Typography><IconButton onClick={() => { setcontactBox(false) }}><CloseCircle /></IconButton></Box></DialogTitle>

                <ContactPage />
            </Dialog>
            <Navbar />
            <Box marginX={'10%'} marginY={'2rem'}>
                <Box borderBottom={'2px solid #a9927d'} display={'flex'} flexDirection={'row'}>
                    <Button onClick={() => {
                        navigation('/home')
                    }}>
                        <ArrowBackIosNewRoundedIcon fontSize='15px' />
                        Home
                    </Button>
                    <Typography m={'auto'} textAlign={'center'} variant={'h5'}>Account</Typography>
                </Box>
                <Box marginTop={'2rem'} width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
                    <UserInfo rootUser={rootUser} setrootUser={setrootUser} />
                    <OrderHistory rootUser={rootUser} />
                </Box>
            </Box>
            <Footer setcontactBox={setcontactBox} />
        </Box>
    )
}

export default Account
