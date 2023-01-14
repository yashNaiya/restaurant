import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useForceUpdate from 'use-force-update';

const Card = (props) => {
    const forceUpdate = useForceUpdate();
    const [counter, setCounter] = useState(0)
    const [add, setAdd] = useState(0)
    useEffect(() => {
        console.log('mounted')
    }, [add])
    const clicked = ()=>{
    }
    if (props.item) {
        return (
            <Box  display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}
            >
                <Box width={'250px'} marginBottom={'1rem'} minHeight={'280px'} borderRadius={'12px'}
                    display={'flex'} flexDirection={'column'} justifyContent={'space-between'}
                    paddingY={'1rem'}
                    sx={{ boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" }} >
                    <Box
                        onClick={clicked}
                        minHeight={'50%'}
                        sx={{
                            ":hover":{cursor:'pointer',opacity:'.7'},
                            backgroundImage: `url(${props.image})`,
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
                    <Box marginTop={'.5rem'} width={'100%'} display={'flex'} justifyContent={'space-around'}>
                        {add === 0 &&
                            <Button
                                variant='contained'
                                sx={{ paddingX: '1.2rem' }} onClick={() => { setAdd(1); setCounter(1); }}
                            >
                                Add
                            </Button>}
                        {add === 1 &&
                            <Box p={'.3rem'} borderRadius={'.2rem'} border={'1px solid #a9927d'} display={'flex'} flexDirection={'row'}>
                                <Button onClick={() => {
                                    if (counter === 1) {
                                        setAdd(0)
                                        forceUpdate()
                                    }
                                    else {
                                        setCounter(counter - 1)
                                    }
                                }} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                                    <RemoveIcon />
                                </Button>
                                <Typography>{counter}</Typography>
                                <Button onClick={() => { setCounter(counter + 1) }} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                                    <AddIcon />
                                </Button>
                            </Box>}
                    </Box>
                </Box>
            </Box>

        )

    }
    else {
        return (
            <Typography>product</Typography>
        )
    }

}

export default Card
