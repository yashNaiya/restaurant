import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const HistoryCard = (props) => {
  console.log(props.order.order)
  return (
    <Box borderRadius={'1rem'} p={'1rem'} marginY={'1rem'} bgcolor='#fff'  minHeight={'8rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
      <Box display={'flex'} justifyContent={'flex-start'} flexDirection='column'>
      {props.order.order.map(item => {
        return (
          <Typography>{item.count} x {item.name}</Typography>
        )
      })}
      </Box>
      <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography paddingTop={'1rem'} variant='body2'>{props.order.dateTime}</Typography>
          <Typography fontWeight={'bold'}>Total Value : {props.order.total}</Typography>
        </Box>

        {/* {props.delivered &&
          <Button>
            <AddIcon />
            Add to cart
          </Button>} */}
      </Box>
    </Box>
  )
}

export default HistoryCard
