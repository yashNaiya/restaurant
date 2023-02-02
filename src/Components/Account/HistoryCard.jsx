import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const HistoryCard = (props) => {
  console.log(props.order.order)
  return (
    <Box paddingY={'1rem'} borderBottom={'2px solid #a9927d'} minHeight={'8rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
      {props.order.order.map(item => {
        return (
          <Typography>{item.count} {item.name}</Typography>
        )
      })}
      <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box width={'40%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography paddingTop={'1rem'} variant='body2'>{props.order.dateTime}</Typography>
        </Box>

        {props.delivered &&
          <Button>
            <AddIcon />
            Add to cart
          </Button>}
      </Box>
    </Box>
  )
}

export default HistoryCard
