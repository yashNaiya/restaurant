import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import api from '../../Api';

const HistoryCard = (props) => {
  console.log(props.order.order)
  return (
    <Box borderRadius={'1rem'} p={'1rem'} marginY={'1rem'} bgcolor='#fff' minHeight={'8rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
      <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'space-between'}>
        <Box display={'flex'} justifyContent={'flex-start'} flexDirection='column'>
          {props.order.order.map(item => {
            return (
              <Typography>{item.count} x <b>{item.name}</b></Typography>
            )
          })}
        </Box>
        {/* {props.delivered &&
          <Button onClick={() => {
            console.log(props.order.order)
            props.order.order.forEach(item => {
              let total = parseFloat(item.total).toFixed(2)
              let counter = Number(item.count)
              api.post('/addtocart', { count:counter, userId: props.rootUserId, productId: item.productId, price:total, name: item.name })
                .then(res => {
                })
                .catch(err => {
                  console.log(err)
                })
            });
          }}>
            <AddIcon />
            Add to cart
          </Button>} */}
      </Box>
      <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography paddingTop={'1rem'} variant='body2'>{props.order.dateTime}</Typography>
          <Typography fontSize={'18px'} fontWeight={'bold'}>Total Value : {props.order.total}</Typography>
        </Box>


      </Box>
    </Box>
  )
}

export default HistoryCard
