import { Box } from '@mui/system'
import React from 'react'
import Navbar from '../Navbar'
import Menu from './Menu'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../Api'
import Footer from '../Footer'

const Home = () => {

  const [rootUser, setrootUser] = useState()
  const [restaurant, setrestaurant] = useState('restaurant')
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
  if(rootUser){
    return (
      <Box display={'flex'} flexDirection={'column'}>
        <Navbar setrestaurant={setrestaurant} />
        <Menu restaurant={restaurant} rootUserId = {rootUser._id}/>
        <Footer/>
      </Box>
    )
  }

}

export default Home