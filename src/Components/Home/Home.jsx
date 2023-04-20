import { Box } from '@mui/system'
import React from 'react'
import Navbar from '../Navbar'
import Menu from './Menu'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../Api'
import Footer from '../Footer'
import { Dialog, DialogTitle } from '@mui/material'
import ContactPage from '../ContactPage'

const Home = () => {

  const [rootUser, setrootUser] = useState()
  const [restaurant, setrestaurant] = useState('restaurant')
  const [contactBox, setcontactBox] = useState(false)
  const navigate = useNavigate()
  const callHomePage = () => {

    api.get("/home", { withCredentials: true })
      .then(res => {
        setrootUser(res.data.rootUser)
      }).catch((err) => {
        navigate('/login')
      })

  }
  useEffect(() => {
    callHomePage();
  }, [])
  if (rootUser) {
    return (
      <Box display={'flex'} flexDirection={'column'}>
        <Dialog fullWidth disableEscapeKeyDown open={contactBox} onClose={() => { setcontactBox(false) }}>
          <DialogTitle>Help Request</DialogTitle>
          <ContactPage/>
        </Dialog>
        <Navbar setrestaurant={setrestaurant} />
        <Menu restaurant={restaurant} rootUserId={rootUser._id} />
        <Footer setcontactBox={setcontactBox} />
      </Box>
    )
  }

}

export default Home