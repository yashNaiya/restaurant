import { Box, Typography, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../Api'

const AdminHistoryCard = (props) => {
    const [username, setusername] = useState()
    useEffect(() => {
        if(props){
            api.post('/getusername',{userId:props.order.userId})
            .then(res=>{setusername(res.data)})
            .catch(err=>{})
        }
    }, [])
    const handleClick = () => {
        api.post('/changestate', props.order)
            .then(res => {
                alert(res.data.message)
                props.setflag(!props.flag)
            })
            .catch(err => { })
    }
    if (props && username) {
        
        return (
            <Box paddingY={'1rem'} borderRadius={5} bgcolor={'#d3d3d3'} paddingX={'2rem'} marginY={'2rem'} minHeight={'8rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
                <Box  bgcolor={'#f2f2f2'} borderRadius={5} p={'1rem'}>
                {props.order.order.map(item => {
                    return (
                        <Typography>{item.count} {item.name}</Typography>
                    )
                })}
                </Box>
                <Typography paddingTop={'1rem'} variant='body1'>Total : {props.order.total}</Typography>
                <Typography paddingTop={'1rem'} variant='body1'>Customer : {username}</Typography>
                <Typography paddingTop={'1rem'} variant='body1'>Instruction : {props.order.Instructions}</Typography>
                <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box width={'40%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography paddingTop={'1rem'} variant='body2'>{props.order.dateTime}</Typography>
                    </Box>

                    {!(props.delivered) &&
                        <Button onClick={handleClick} variant='contained'>
                            completed
                        </Button>}
                </Box>
            </Box>
        )
    }
}

export default AdminHistoryCard
