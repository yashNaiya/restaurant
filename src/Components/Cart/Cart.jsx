import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar'
import Review from './Review'
import Summery from './Summery'
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useEffect, useState } from 'react'
import api from '../../Api'
const Cart = () => {
    const navigation = useNavigate()
    const [total, setTotal] = useState(0)
    const [gst, setGst] = useState(0)
    const [hasOrdered, sethasOrdered] = useState(false)
    const [rootUser, setrootUser] = useState()
    const callCartPage = () => {
        console.log("authentication called")
        api.get("/cart", { withCredentials: true })
            .then(res => {
                setrootUser(res.data.rootUser)
            }).catch((err) => {
                navigation('/login')
            })

    }


    useEffect(() => {
        callCartPage()
    }, [])

    if (rootUser) {
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
                        <Typography m={'auto'} textAlign={'center'} variant={'h5'}>Cart</Typography>
                    </Box>
                    <Box marginTop={'2rem'} width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Review hasOrdered={hasOrdered} setGst={setGst} setTotal={setTotal} rootUser={rootUser} />
                        <Summery 
                        sethasOrdered={sethasOrdered}
                        setGst={setGst} 
                        setTotal={setTotal} 
                        gst={gst} 
                        total={total} 
                        rootUserId={rootUser._id} />
                    </Box>
                </Box>
            </Box>
        )
    }


}

export default Cart
