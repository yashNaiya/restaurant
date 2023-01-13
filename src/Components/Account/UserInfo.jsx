import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import api from '../../Api'
import { useNavigate } from 'react-router-dom'
const UserInfo = (props) => {
  const navigate = useNavigate()
  const [edit, setedit] = useState(false)
  
  const handleSignout = ()=>{
    api.post('/removeCookie',[],{withCredentials:true})
    .then(res=>{
      alert(res.data)
    })
    navigate('/')
  }
  const handleEdit = ()=>{
    setedit(true)
  }
  const handleSave = ()=>{
    setedit(false)
    api.post('/edit',props.rootUser)
    .then(res=>{
      alert(res.data.message)
    })
  }
  const handleChange = (e)=>{
    props.setrootUser((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value]
  }))
  }
  
  if(props.rootUser){
    return (
      !edit &&
      <Box bgcolor={'#D3D3D3'} borderRadius={'1rem'} width={'30%'} height={'15rem'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'} p={'1rem'}>
          <Box borderBottom={'2px solid #a9927d'} alignItems={'center'} display={'flex'} justifyContent={'space-between'} width={'100%'} flexDirection={'row'}>
              <Typography fontSize={'large'} fontWeight={'bold'}>{props.rootUser.name}</Typography>
              <Button onClick={handleEdit}>edit</Button>
          </Box>
          <Typography>{props.rootUser.email}</Typography>
          <Typography>{props.rootUser.number}</Typography>
          <Button fullWidth variant='contained' onClick={handleSignout}>Sign out</Button>
      </Box> 
      ||
      <Box bgcolor={'#D3D3D3'} borderRadius={'1rem'} width={'30%'} height={'15rem'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'} p={'1rem'}>
          <Box borderBottom={'2px solid #a9927d'} alignItems={'center'} display={'flex'} justifyContent={'space-between'} width={'100%'} flexDirection={'row'}>
          <TextField name='name' value={props.rootUser.name} onChange={handleChange} size='small' label='name'></TextField>
              <Button onClick={handleSave}>save</Button>
          </Box>
          <TextField name='email' value={props.rootUser.email} onChange={handleChange} size='small' label='email'></TextField>
          <TextField name='number' value={props.rootUser.number} onChange={handleChange} size='small' label='number'></TextField>
          <Button fullWidth variant='contained' onClick={handleSignout}>Sign out</Button>
      </Box>
      
    )
  }
  else{
    return(
      <Typography>Loading...</Typography>
    )
  }
 
}

export default UserInfo
