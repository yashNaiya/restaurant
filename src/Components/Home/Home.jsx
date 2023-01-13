import { Box } from '@mui/system'
import React from 'react'
import Navbar from '../Navbar'
import Menu from './Menu'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../Api'

const Home = () => {

  const [rootUser, setrootUser] = useState()
  const navigate = useNavigate()
  const callHomePage = ()=>{

      api.get("/home",{withCredentials:true})
      .then(res=>{
        setrootUser(res.data.rootUser)
      }).catch((err)=>{
        navigate('/login')
      })

  }
  useEffect(() => {
    callHomePage();
  }, [])
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Navbar />
      <Menu />
    </Box>
  )
}

export default Home