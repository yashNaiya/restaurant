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
      <Box width={'70%'} bgcolor='primary.main' paddingX={'1rem'} paddingY={'1rem'} marginX={'2rem'}>
        <Box borderRadius={'.3rem'} paddingLeft={'2rem'} bgcolor='secondary.main'>
          <Typography variant={'h6'} color={'#434752'}>Live Orders</Typography>
        </Box>
        {liveOrder.map(order => {
          return (
            <HistoryCard key={order._id} order={order} delivered={false} />
          )
        })}
        <Box borderRadius={'.3rem'} paddingLeft={'2rem'} bgcolor={'secondary.main'}>
          <Typography  marginTop={'2rem'} variant={'h6'} color={'#434752'}>Order History</Typography>
        </Box>
        {pastOrder.map(order => {
          return (
            <HistoryCard key={order._id} rootUserId={props.rootUser._id} order={order} delivered={true} />
          )
        })}
      </Box>
    )
  }
}

export default OrderHistory
