import { Box, Typography } from '@mui/material'
import React from 'react'
import ReviewCard from './ReviewCard'
import { useEffect, useState } from 'react'
import api from '../../Api'
const Review = (props) => {
  const [cartArray, setcartArray] = useState()
  useEffect(() => {
    if (props.rootUser) {
      // console.log("fetch data called")
      api.post('/incart', { rootUserId: props.rootUser._id })
        .then(res => {
          setcartArray(res.data)
        }).catch(err => { console.log(err) })
    }
  }, [props.rootUser])

  useEffect(() => {
    setcartArray([])
  }, [props.hasOrdered])
  


  if (cartArray && props) {
    return (
      <Box width={'50%'}>
        <Typography color="primary.main">Review Order</Typography>
        {cartArray.map(card => {
          return (
            <ReviewCard 
            setGst={props.setGst}
            setTotal={props.setTotal} 
            key={card._id} 
            item={card} 
            rootUserId={props.rootUser._id} />
          )
        })}
      </Box>
    )
  }

  if(props.hasOrdered){
    <></>
  }
  else {
    return (
      <Typography color={'primary'}>Getting cart data...</Typography>
    )
  }
}

export default Review





