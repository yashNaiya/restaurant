import { Box, Button, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React from 'react'
import api from '../../Api'
import { useEffect, useState } from 'react'
import dateTime from 'date-time'
import { CloseCircle } from 'iconsax-react'
const Summery = (props) => {
    const [flag, setFlag] = useState(false)
    const [payment, setpayment] = useState(false)
    const [paymentInfo, setpaymentInfo] = useState({
        type: "cash",
        info: "",
        cvv: "",
        expires: ""
    })
    const [instruction, setInstruction] = useState('')
    const handleOrder = () => {
        // console.log(props.rootUserId)
        // console.log(paymentInfo)

        api.post('/placeorder',
            {
                paymentInfo: paymentInfo,
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

        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} width={'30%'} minHeight={'20rem'} marginLeft={'5rem'} p={'2rem'} borderRadius={'1rem'} border={'2px solid #a9927d'} >
            <Typography fontWeight={'bold'} borderBottom={'2px solid #a9927d'}>Order Summery</Typography>
            <Box marginY={'1rem'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'}>
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
            {payment ?
                <Box display={'flex'} flexDirection='column' marginTop={'1rem'}>
                    <Box flexDirection={'row'} display='flex' justifyContent={'space-between'} alignItems='center'>
                        <Typography fontSize={'20px'}>Payment</Typography>
                        <IconButton onClick={() => setpayment(false)}><CloseCircle /></IconButton>
                    </Box>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={paymentInfo.type}
                            name='type'
                            onChange={(e) => {
                                setpaymentInfo((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value
                                }))
                                console.log(paymentInfo.type)
                            }}
                        >
                            <FormControlLabel value="credit" control={<Radio />} label="credit" />
                            <FormControlLabel value="debit" control={<Radio />} label="debit" />
                            <FormControlLabel defaultChecked value="cash" control={<Radio />} label="cash" />
                        </RadioGroup>
                    </FormControl>
                    {!(paymentInfo.type === "cash") && <Box>
                        <TextField
                            onChange={(e) => {
                                setpaymentInfo((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value
                                }))
                            }}
                            helperText='enter 16 digit number'
                            size='small' type={'tel'} value={paymentInfo.info} label='number' name='info'></TextField>
                        <TextField
                            onChange={(e) => {
                                setpaymentInfo((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value
                                }))
                            }}
                            size='small' type={'tel'} name='cvv' value={paymentInfo.cvv} inputProps={{ maxLength: 3 }} sx={{ width: "100px" }} label='cvv'></TextField>
                        <Box>
                            <TextField sx={{ marginTop: '1rem' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => {
                                    setpaymentInfo((prevState) => ({
                                        ...prevState,
                                        [e.target.name]: e.target.value
                                    }))
                                }}
                                size='small' value={paymentInfo.expires} name='expires' type={'month'} label='expires on'></TextField>
                        </Box>
                    </Box>
                    }
                    {((paymentInfo.info.length === 16 && paymentInfo.cvv.length===3 && !(paymentInfo.expires==="")) || paymentInfo.type === "cash") && <Button inputProps={{ maxLength: 16 }} sx={{ marginTop: '1rem' }} variant='contained' onClick={handleOrder}>Make payment</Button>
                        || <Button disabled sx={{ marginTop: '1rem' }} variant='contained'>make payment</Button>}
                </Box>
                : <Button fullWidth variant={'contained'} onClick={() => { setpayment(true) }}>place order</Button>
            }
        </Box>
    )

}

export default Summery
