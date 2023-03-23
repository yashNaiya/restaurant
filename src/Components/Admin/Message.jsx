import { Box, IconButton, Typography } from '@mui/material'
import { CloseCircle } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import api from '../../Api'

const Message = () => {
    const [data, setdata] = useState()
    const [flag, setflag] = useState(false)
    useEffect(() => {
        console.log("render")
        api.get('/readmessages')
            .then(res => { setdata(res.data) })
    }, [])
 


    const handleDelete = (messageId) => {
        api.post('/deletemessage', { _id: messageId })
            .then(res => {
                console.log("re-render")
                api.get('/readmessages')
                    .then(res => { 
                        setdata(res.data)
                        this.forceUpdate();
                     })
            })
    }
    if (data) {
        // console.log(data)
        return (
            <Box marginY={'2rem'}>
                <Typography fontSize={'24px'} fontWeight='bold' marginY={'2rem'} textAlign={'center'}>Messages From the Website</Typography>
                <Box marginX={'2rem'} display='flex' flexDirection={'column'} width={'70%'} justifyContent='space-evenly' >
                    {
                        data.map((message, index) => (
                            <Box key={index} width={'80%'}>
                                <Box display={'flex'} justifyContent='flex-end' flexDirection={'row'}>
                                    <IconButton onClick={() => handleDelete(message._id)}><CloseCircle /></IconButton>
                                </Box>
                                <Box bgcolor={'third.main'} color='#fff' display={'flex'} justifyContent='space-evenly' flexDirection={'column'} p='1rem' minHeight={'10rem'} borderRadius='1rem' border='1.5px solid #5e503f'>
                                    <Typography><b>Name :</b> {message.name}</Typography>
                                    <Typography><b>Email :</b> {message.email}</Typography>
                                    <Typography><b>Subject :</b> {message.subject}</Typography>
                                    <Typography marginTop={'1rem'}><b>Message :</b> {message.message}</Typography>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        )
    } else {
        <Typography>Loading...</Typography>
    }
}

export default Message
