import { Box, Button, IconButton, Typography } from '@mui/material'
import { ArrowRight3, Facebook, Instagram, Map } from 'iconsax-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate()
    return (
        <Box display={'flex'} justifyContent='space-evenly'
            flexDirection={'row'} height={'12rem'} bgcolor={'#37474F'}
            alignItems='center'
            width={'100%'}>
            <Box color={'#fff'}>
                <Typography variant='body1' fontSize={'20px'}>Address:</Typography>
                <Typography>
                    259 Queen St W, Toronto, ON Canada M5V1Z4
                </Typography>
                Tel: 416-519-2550
            </Box>
            <Box display='flex' flexDirection={'column'}>
                <Box>
                    <IconButton sx={{ color: '#fff' }}><Instagram /></IconButton>
                    <IconButton sx={{ color: '#fff' }}><Facebook /></IconButton>
                    <IconButton sx={{ color: '#fff' }}><Map /></IconButton>
                </Box>
                <IconButton onClick={()=>{navigate('/about')}} sx={{ color: '#fff' }}>Know More<ArrowRight3/></IconButton>
            </Box>
            <Box>
                <Button onClick={()=>{window.open('/contact','_blank')}} variant='contained'>Contact us</Button>
            </Box>
        </Box>
    )
}

export default Footer
