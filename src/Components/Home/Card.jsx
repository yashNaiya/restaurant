import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
const Card = (props) => {
    return (
        <Box width={'220px'} height={'250px'} borderRadius={'12px'} sx={{ boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" }} >
            <Box
                height={'50%'}
                sx={{
                    backgroundImage: `url(${props.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: 'center'
                }}
            >
            </Box>
            <Box p={1} >
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}
                >
                    <Typography fontSize={'20px'} color={'primary.main'}>Product name</Typography>
                    <Typography color={'secondary.main'}>13.99$</Typography>
                </Box>
                <Typography variant='caption'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
                </Typography>
            </Box>

            <Box justifyContent={'flex-end'} display={'flex'} flexDirection={'row'}>
                <Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                    <AddBoxIcon sx={{transform: 'scale(1.2)'}}/>
                </Button>
            </Box>
        </Box>
    )
}

export default Card
