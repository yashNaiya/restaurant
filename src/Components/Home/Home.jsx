import { Box } from '@mui/system'
import React from 'react'
import Navbar from '../Navbar'
import Menu from './Menu'


const Home = () => {


  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Navbar />
      <Menu />
    </Box>
  )
}

export default Home