import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import api from '../../Api'
import { useEffect, useState } from 'react'
import dateTime from 'date-time'
const Summery = (props) => {
    const [flag, setFlag] = useState(false)
    const [instruction, setInstruction] = useState('')
    const handleOrder = () => {
        // console.log(props.rootUserId)
        // console.log(dateTime())

        api.post('/placeorder',
            {
                instruct: instruction,
                rootUserId: props.rootUserId,
                total: (props.total + props.gst).toFixed(2),
                dateTime: dateTime()
            })
            .then(res => {
                alert(res.data.message)
                setInstruction('')
                props.setGst(0)
                props.setTotal(0)
                localStorage.clear()
                setFlag(true)
                props.sethasOrdered(true)
            }).catch(err => {
                console.log(err)
            })
    }
    const handleChange = (e) => {
        setInstruction(e.target.value)
    }

    useEffect(() => {
        // getTotalInitial()
        // console.log("hii")
        if (props.rootUserId && !flag) {
            api.post('/gettotal', { userId: props.rootUserId })
                .then(res => {
                    // console.log(res.data)
                    props.setGst(res.data.gst)
                    props.setTotal(res.data.total)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setFlag(false)
        }
    }, [props])
    return (

        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} width={'30%'} height={'20rem'} marginLeft={'5rem'} p={'2rem'} borderRadius={'1rem'} border={'2px solid #a9927d'} >
            <Typography fontWeight={'bold'} borderBottom={'2px solid #a9927d'}>Order Summery</Typography>
            <Box marginY={'1rem'} height={'40%'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'}>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Typography>Sub Total</Typography>
                    <Typography>${props.total.toFixed(2)}</Typography>
                </Box>
                <Box borderBottom={'2px solid #a9927d'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Typography>GST</Typography>
                    <Typography>${props.gst.toFixed(2)}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Typography fontWeight={'bold'}>Total</Typography>
                    <Typography fontWeight={'bold'} color={'third.main'}>${(props.total + props.gst).toFixed(2)}</Typography>
                </Box>
            </Box>
            <TextField onChange={handleChange} name='instruction' value={instruction} label={'special instructions(optional)'}></TextField>
            <Button fullWidth variant={'contained'} onClick={handleOrder}>place order</Button>
        </Box>
    )

}

export default Summery
