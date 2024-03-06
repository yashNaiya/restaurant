import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React from 'react'
import api from '../../Api'
import { useEffect, useState } from 'react'
import dateTime from 'date-time'
import { CloseCircle } from 'iconsax-react'
import GooglePayButton from '@google-pay/button-react';
const Summery = (props) => {
    const [flag, setFlag] = useState(false)
    const [payment, setpayment] = useState(false)
    const [offers, setoffers] = useState()
    const [code, setcode] = useState('')
    const [totalG, settotalG] = useState()
    const [newTotal, setnewTotal] = useState(0)
    const [paymentInfo, setpaymentInfo] = useState({
        type: "cash",
        info: "",
        cvv: "",
        expires: ""
    })
    const [addpc, setaddpc] = useState(false)
    const [instruction, setInstruction] = useState('')
    const handleOrder = () => {
        // console.log(props.rootUserId)
        // console.log(paymentInfo)
        let total = (props.total + props.gst).toFixed(2)
        if (newTotal !== 0) {
            total = newTotal
        }
        api.post('/placeorder',
            {
                paymentInfo: paymentInfo,
                instruct: instruction,
                rootUserId: props.rootUserId,
                total: total,
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
    useEffect(() => {
        api.get('/offers')
            .then(res => setoffers(res.data))
    }, [])
    const checkCode = () => {
        let offerTemp = ''
        // flag=0
        offers.forEach((offer, index) => {
            // console.log(code)
            // console.log(offer.coupon)
            if (code === offer.coupon) {
                // console.log(offer.coupon)
                if(props.total>offer.price){
                    console.log(offer)
                    offerTemp = offer
                    offers.slice(index, 1)
                }else{
                    alert('offer not applicable')
                }
            }
        });
        // if(flag===1){
        if (offerTemp !== '') {
            // console.log(offerTemp)
            const newVal = (((props.total + props.gst) * Number(100 - offerTemp.percentage)) / 100).toFixed(2)
            setnewTotal(newVal)
            settotalG(newVal)

        }
        if(code=='First50'){
            const newVal = (((props.total + props.gst) * Number(100 - 50)) / 100).toFixed(2)
            setnewTotal(newVal)
            settotalG(newVal)
        }
        // }
    }

    return (

        <Box width='45%'>
            <Box  width={'70%'} minHeight={'25rem'} maxHeight='fit-content' display={'flex'}  marginLeft={'5rem'} flexDirection={'column'} justifyContent={'space-evenly'} p={'2rem'} bgcolor={'#dee1e6'}>
                <Typography fontWeight={'bold'} borderBottom={'2px solid #434752'}>Order Summery</Typography>
                <Box marginY={'1rem'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'}>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography>Sub Total</Typography>
                        <Typography>${props.total.toFixed(2)}</Typography>
                    </Box>
                    <Box borderBottom={'2px solid #434752'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography>GST</Typography>
                        <Typography>${props.gst.toFixed(2)}</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography fontWeight={'bold'}>Total</Typography>
                        <Typography fontWeight={'bold'} color={'third.main'}>${(props.total + props.gst).toFixed(2)}</Typography>
                    </Box>
                    <Box marginTop={'1rem'} display={'flex'} flexDirection={'row'} alignItems='center'>
                        <Checkbox onChange={(e) => { if (e.target.checked) { setaddpc(true) } else { setaddpc(false) } }}></Checkbox>
                        <Typography>Add Promo Code</Typography>
                    </Box>
                    {addpc && <Box marginTop={'1rem'} display={'flex'} flexDirection={'row'} alignItems='center'>
                        <TextField onChange={(e) => { setcode(e.target.value); console.log(e.target.value) }} label='code' size='small'></TextField>
                        <Button onClick={checkCode}>Apply</Button>
                    </Box>}
                </Box>
                {newTotal !== 0 &&
                <Box>
                    <Typography fontWeight={'bold'} color={'third.main'}>New Total : {newTotal}</Typography>
                    {/* <IconButton onClick={()=>setnewTotal(0)}><CloseCircle/></IconButton> */}
                </Box>
                }
                <TextField marginTop={'1rem'} onChange={handleChange} name='instruction' value={instruction} label={'special instructions(optional)'}></TextField>
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
                                {/* <FormControlLabel value="credit" control={<Radio />} label="credit" />
                            <FormControlLabel value="debit" control={<Radio />} label="debit" /> */}
                                <FormControlLabel defaultChecked value="cash" control={<Radio />} label="pay at restaurant" />
                                <FormControlLabel defaultChecked value="gpay" control={<Radio />} label="pay online" />
                            </RadioGroup>
                        </FormControl>
                        {!(paymentInfo.type === "cash" || paymentInfo.type === "gpay") && <Box>
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
                        {((paymentInfo.info.length === 16 && paymentInfo.cvv.length === 3 && !(paymentInfo.expires === "")) || paymentInfo.type === "cash") && <Button inputProps={{ maxLength: 16 }} sx={{ marginTop: '1rem' }} variant='contained' onClick={handleOrder}>Place Order</Button>
                            || ((paymentInfo.type === "gpay") && 
                            
                                <GooglePayButton
                                    
                                    buttonColor='#434752'
                                    buttonSizeMode='fill'
                                    environment="TEST"
                                    paymentRequest={{
                                        apiVersion: 2,
                                        apiVersionMinor: 0,
                                        allowedPaymentMethods: [
                                            {
                                                type: 'CARD',
                                                parameters: {
                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                },
                                                tokenizationSpecification: {
                                                    type: 'PAYMENT_GATEWAY',
                                                    parameters: {
                                                        gateway: 'example',
                                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                                    },
                                                },
                                            },
                                        ],
                                        merchantInfo: {
                                            merchantId: '12345678901234567890',
                                            merchantName: 'Demo Merchant',
                                        },
                                        transactionInfo: {
                                            totalPriceStatus: 'FINAL',
                                            totalPriceLabel: 'Total',
                                            totalPrice: newTotal===0?(props.total + props.gst).toFixed(2):totalG,
                                            currencyCode: 'CAD',
                                            countryCode: 'CA',
                                        },
                                        shippingAddressRequired: true,
                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                    }}
                                    onLoadPaymentData={paymentRequest => {
                                        console.log('Success', paymentRequest);
                                        api.post('/placeorder',
                                        {
                                            paymentInfo: paymentInfo,
                                            instruct: instruction,
                                            rootUserId: props.rootUserId,
                                            total: totalG,
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
                                    }}
                                    onError={reason=> {
                                        console.log("Error :",reason)
                                    }}
                                    onPaymentAuthorized={paymentData => {
                                        console.log('Payment Authorised Success', paymentData)
                                        return { transactionState: 'SUCCESS' }
                                    }
                                    }
                                    onPaymentDataChanged={paymentData => {
                                        console.log('On Payment Data Changed', paymentData)
                                        return {}
                                    }
                                    }
                                    existingPaymentMethodRequired='false'
                                    // buttonColor='primary.main'
                                    buttonType='Buy'
                                />
                            )
                            // || ((paymentInfo.type === "gpay") && 
                            //     <GooglePayButton
                            //         environment="TEST"
                            //         paymentRequest={{
                            //             apiVersion: 2,
                            //             apiVersionMinor: 0,
                            //             allowedPaymentMethods: [
                            //                 {
                            //                     type: 'CARD',
                            //                     parameters: {
                            //                         allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            //                         allowedCardNetworks: ['MASTERCARD', 'VISA'],
                            //                     },
                            //                     tokenizationSpecification: {
                            //                         type: 'PAYMENT_GATEWAY',
                            //                         parameters: {
                            //                             gateway: 'example',
                            //                             gatewayMerchantId: 'exampleGatewayMerchantId',
                            //                         },
                            //                     },
                            //                 },
                            //             ],
                            //             merchantInfo: {
                            //                 merchantId: '12345678901234567890',
                            //                 merchantName: 'Demo Merchant',
                            //             },
                            //             transactionInfo: {
                            //                 totalPriceStatus: 'FINAL',
                            //                 totalPriceLabel: 'Total',
                            //                 totalPrice: `${totalG}`,
                            //                 currencyCode: 'CAD',
                            //                 countryCode: 'CA',
                            //             },
                            //             shippingAddressRequired: true,
                            //             callbackIntents: ['SHIPPING_ADDRESS'],
                            //         }}
                            //         onLoadPaymentData={paymentRequest => {
                            //             console.log('Success', paymentRequest);

                            //             api.post('/placeorder',
                            //             {
                            //                 paymentInfo: paymentInfo,
                            //                 instruct: instruction,
                            //                 rootUserId: props.rootUserId,
                            //                 total:newTotal,
                            //                 dateTime: dateTime()
                            //             })
                            //             .then(res => {
                            //                 alert(res.data.message)
                            //                 setInstruction('')
                            //                 props.setGst(0)
                            //                 props.setTotal(0)
                            //                 localStorage.clear()
                            //                 setFlag(true)
                            //                 props.sethasOrdered(true)
                            //             }).catch(err => {
                            //                 console.log(err)
                            //             })
                            //         }}
                            //         onPaymentAuthorized={paymentData => {
                            //             console.log('Payment Authorised Success', paymentData)
                            //             return { transactionState: 'SUCCESS' }
                            //         }
                            //         }
                            //         onPaymentDataChanged={paymentData => {
                            //             console.log('On Payment Data Changed', paymentData)
                            //             return {}
                            //         }
                            //         }
                            //         existingPaymentMethodRequired='false'
                            //         // buttonColor='primary.main'
                            //         buttonType='Buy'
                            //     />
                            // )

                            || < Button disabled sx={{ marginTop: '1rem' }} variant='contained'>Make Payment</Button>}
                    </Box>
                    :
                    <Button fullWidth variant={'contained'} onClick={() => { setpayment(true) }}>Make Payment</Button>
                }
            </Box>
        </Box >
    )

}

export default Summery
