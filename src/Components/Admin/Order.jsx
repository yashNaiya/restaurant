import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../Api'
import AdminHistoryCard from './AdminHistoryCard'

const Order = () => {
    const [flag, setflag] = useState(false)
    const [liveOrder, setliveOrder] = useState()
    const [pastOrder, setpastOrder] = useState()
    useEffect(() => {
        api.post('/adminorderhistory')
            .then(res => {
                console.log(res.data)
                setliveOrder(res.data.liveOrders)
                setpastOrder(res.data.pastOrders)
            })
            .catch(err => { console.log(err) })
    }, [flag])

    if(pastOrder){
        return (
            <Box>
                <Typography marginTop={'3rem'} borderBottom={'3px solid #a9927d'} variant={'h5'} color={'secondary.main'}>Live Orders</Typography>
                {liveOrder.map(order => {
                    return (
                        <AdminHistoryCard flag={flag} setflag={setflag} key={order._id} order={order} delivered={false} />
                    )
                })}
                 <Typography marginY={'3rem'} borderBottom={'3px solid #a9927d'} variant={'h5'} color={'secondary.main'}>Past Orders</Typography>
                {pastOrder.map(order => {
                    return (
                        <AdminHistoryCard key={order._id} order={order} delivered={true} />
                    )
                })}
            </Box>
        )
    }
    else{
        return(

            <>Loading...</>
        )
    }
}

export default Order
