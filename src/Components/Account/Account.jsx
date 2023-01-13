import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import UserInfo from './UserInfo';
import { useEffect, useState } from 'react';
import OrderHistory from './OrderHistory';
import api from '../../Api';
const Account = () => {
    const [rootUser, setrootUser] = useState()
    const navigation = useNavigate()
    const callAccountPage =  () => {
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
            <Navbar />
            <Box marginX={'10%'} marginTop={'2rem'}>
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
                    <OrderHistory />
                </Box>
            </Box>
        </Box>
    )
}

export default Account
