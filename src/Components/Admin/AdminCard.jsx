import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../Api';


const AdminCard = (props) => {
    const SERVER_HOST = 'http://localhost:9002/images/'
    if (props.item) {
        return (
            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}
            >
                <Box width={'250px'} marginBottom={'1rem'} minHeight={'280px'} borderRadius={'12px'}
                    display={'flex'} flexDirection={'column'} justifyContent={'space-between'}
                    paddingY={'1rem'}
                    sx={{ boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" }} >
                    <Box
                        minHeight={'50%'}
                        sx={{
                            ":hover": { cursor: 'pointer', opacity: '.7' },
                            backgroundImage: `url(${SERVER_HOST + props.item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: 'center'
                        }}
                    >
                    </Box>
                    <Box p={1} display={'flex'} flexDirection={'column'} maxHeight={'auto'} >
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}
                        >
                            <Typography fontSize={'20px'} maxWidth={'60%'} color={'primary.main'}>{props.item.name}</Typography>
                            <Typography color={'secondary.main'}>{props.item.price}$</Typography>
                        </Box>
                        <Box height={'1.3rem'} overflow={'clip'} >
                            <Typography variant='caption'>
                                {props.item.desc}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

        )

    }
}

export default AdminCard
