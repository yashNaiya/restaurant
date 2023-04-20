import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../Api'

const ContactPage = () => {
    const [data, setdata] = useState({
        name:"",
        subject:"",
        message:""
    })
    const handleChange = (e)=>{
        setdata((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const [rootUser, setrootUser] = useState()
    const navigation = useNavigate()
    const callAccountPage = () => {
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
    if (rootUser) {

        return (
            <Box bgcolor={'#37474F'} width={'100%'} display={'flex'} flexDirection='column' alignItems='center' >
                <Box marginTop={'2rem'}  display={'flex'}
                    borderRadius='2rem'
                    flexDirection='column'
                    justifyContent={'space-evenly'}
                    alignItems='center'
                    marginX='auto' width='50%' minHeight='40vh'>
                    <Box flexDirection={'column'}  display={'flex'} justifyContent='space-evenly' height={'70vh'}>
                        <Box width='20rem'>
                            <TextField size='small' value={data.name} margin='auto' fullWidth name='name' onChange={(e)=>{handleChange(e)}} placeholder='name' sx={{ backgroundColor: '#fff' }}></TextField>
                        </Box>
                        <Box width='20rem'>
                            <TextField  size='small' value={data.subject} margin='auto' fullWidth name='subject' onChange={(e)=>{handleChange(e)}} placeholder='subject' sx={{ backgroundColor: '#fff' }}></TextField>
                        </Box>
                        <Box width='30rem'>
                            <TextField margin='auto' fullWidth value={data.message} name='message' onChange={(e)=>{handleChange(e)}} minRows={5} maxRows={5} multiline placeholder='message' sx={{ backgroundColor: '#fff' }}></TextField>
                        </Box>
                        <Box>
                            <Button variant='contained'
                                onClick={() => {
                                    // console.log(data)
                                    const from = rootUser.email
                                    api.post('/submitform', { from: from, data: data })
                                        .then(res => { 
                                            alert(res.data.message);
                                            setdata({
                                                name:"",
                                                subject:"",
                                                message:""
                                            }) })
                                        .catch()
                                }}
                            >send</Button>
                            <Button onClick={() => { setdata({
                                name:"",
                                subject:"",
                                message:""
                            }) }}>clear</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
    else {
        return (
            <Box></Box>
        )
    }
}

export default ContactPage
