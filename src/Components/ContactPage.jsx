import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../Api'

const ContactPage = () => {
   const [message, setmessage] = useState('')
   const [rootUser, setrootUser] = useState()
   const navigation = useNavigate()
   const callAccountPage =  () => {
       api.get("/account", { withCredentials: true })
           .then(res => {
               setrootUser(res.data.rootUser)
           }).catch((err) => {
               navigation('/login')
           })
   }
   useEffect(() => {
       callAccountPage();
   }, [])
   if(rootUser){

       return (
           <Box marginTop={'6rem'} bgcolor='#37474F' display={'flex'}
               borderRadius='2rem'
               flexDirection='column'
               justifyContent={'space-evenly'}
               alignItems='center'
               marginX='auto' width='50%' height='40vh'>
               <Box flexDirection={'column'} bgcolor='#37474F' display={'flex'} justifyContent='space-evenly' height={'70%'}>
               <Box width='30rem'>
                   <TextField margin='auto' fullWidth value={message} name='message' onChange={(e)=>{setmessage(e.target.value)}} minRows={5} maxRows={5} multiline placeholder='message' sx={{ backgroundColor: '#fff' }}></TextField>
               </Box>
               </Box>
               <Box>
                   <Button variant='contained'
                   onClick={()=>{
                       const from = rootUser.email.split('@')[0]
                       api.post('/sendmail',{from:from,message:message})
                       .then(res=>{alert(res.data.message)})
                       .catch()
                   }}
                   >send</Button>
                   <Button onClick={()=>{setmessage("")}}>cancel</Button>
               </Box>
           </Box>
       )
   }
   else{
    return(
        <Box></Box>
    )
   }
}

export default ContactPage
