import { Box, Typography } from '@mui/material'
import React from 'react'
import HistoryCard from './HistoryCard'
import { useEffect, useState } from 'react'
import api from '../../Api'
const OrderHistory = (props) => {
  const [liveOrder, setliveOrder] = useState()
  const [pastOrder, setpastOrder] = useState()
  useEffect(() => {
    if (props.rootUser) {
      api.post('/orderhistory', { rootUserId: props.rootUser._id })
        .then(res => {
          console.log(res.data)
          setliveOrder(res.data.liveOrders)
          setpastOrder(res.data.pastOrders)
        })
        .catch(err => { console.log(err) })
    }
  }, [props.rootUser])

  if (pastOrder) {
    return (
      <Box width={'70%'} paddingLeft={'2rem'}>
        <Typography borderBottom={'3px solid #a9927d'} variant={'h6'}  color={'secondary.main'}>Live Orders</Typography>
        {liveOrder.map(order => {
          return (
            <HistoryCard key={order._id} order={order} delivered={false} />
          )
        })}

        <Typography marginTop={'3rem'} borderBottom={'3px solid #a9927d'} variant={'h6'}  color={'secondary.main'}>Order History</Typography>
        {pastOrder.map(order => {
          return (
            <HistoryCard key={order._id} order={order} delivered={true} />
          )
        })}
      </Box>
    )
  }
}

export default OrderHistory
