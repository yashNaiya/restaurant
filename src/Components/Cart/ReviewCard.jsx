import { Box } from '@mui/system'
import React from 'react'
import Typography from '@mui/material/Typography'
import image from '../../Assets/pizza.jpg'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../Api';
import useDidMountEffect from '../../DidMount';
import { ArrowDown3 } from 'iconsax-react';

const ReviewCard = (props) => {
    const SERVER_HOST = process.env.REACT_APP_API_ENDPOINT + '/images/'

    const [product, setProduct] = useState()
    const [show, setshow] = useState(true)
    const [count, setCount] = useState(0)
    const [toppings, settoppings] = useState([])
    const [size, setsize] = useState()
    const [value, setValue] = useState();
    const [loading, setloading] = useState(false)
    useEffect(() => {
        if (props.item) {
            setValue(parseFloat(props.item.size.value).toFixed(2))
            setsize(props.item.size.name)
            console.log(props.item.extra)

            api.post('/getproduct', props.item)
                .then(res => {
                    setProduct(res.data)
                    // setProduct((prevstate) => ({ ...prevstate, price: parseFloat(props.item.size.value).toFixed(2) }))
                    let int = 0
                    props.item.extra.forEach(topping => {
                        settoppings([...toppings, topping])
                        int = int + parseInt(topping.price)
                    });
                    let sum = Number(parseFloat(props.item.size.value).toFixed(2)) + int
                    setProduct((prevstate) => ({ ...prevstate, price: sum }))
                }).catch(err => {

                })
        }

        setCount(parseInt(localStorage.getItem(props.item.productId)))
    }, [])
    let temptoppings = []
    const handleAddtocart = (sum) => {
        let price = 0
        if(sum===0){
            price = product.price
        }else{
            price = sum
        }
        setloading(true)
        console.log(product.price)
        api.post('/addtocart', { count: count, userId: props.rootUserId, productId: props.item.productId, price: price, name: product.name, size: { name: size, value: value }, toppings: toppings })
            .then(res => {
                props.setTotal(res.data.total)
                props.setGst(res.data.gst)
                setloading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }
    const handleChange = (event) => {
        let int = 0
        toppings.forEach(topping => {
            int = int + parseInt(topping.price)
        });
        // console.log(Number(parseFloat(event.target.value).toFixed(2))+int)
        setProduct((prevstate) => ({ ...prevstate, price: Number(parseFloat(event.target.value).toFixed(2)) + int }))
        handleAddtocart(0)
    };

    useDidMountEffect(() => {
        if (count === 0) {
            localStorage.removeItem(props.item.productId)
        }
        localStorage.setItem(props.item.productId, count)
        if (product) {
            handleAddtocart(0)
        }
    }, [count])
    useEffect(() => {
        if (product) {
            handleAddtocart(0)
        }
        // console.log(toppings)
    }, [value, toppings])

    if (product && !(count === 0)) {

        // console.log(props.item.exrta)

        return (
            <Box display='flex' flexDirection={'column'} sx={{ borderBottom: '2px solid #a9927d' }}>
                <Box justifyContent={'space-between'}
                    maxHeight={'fit-content'}
                    minHeight={'8rem'} display={'flex'} bgcolor='primary.main' flexDirection={'row'} marginTop={'1rem'}>
                    <Box
                        m={'2%'}
                        minWidth={'30%'}
                        width={'30%'}
                        sx={{
                            backgroundImage: `url(${SERVER_HOST + product.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: 'center'
                        }}
                    >
                    </Box>
                    <Typography m={'1%'} fontWeight='bold'>
                        {product.name}
                    </Typography>
                    <Typography m={'2%'} variant='caption'>
                        {product.desc}
                    </Typography>
                    <Box display={'flex'} m={'2%'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'end'}>
                        <Box display={'flex'} flexDirection={'row'}>
                            <Button
                                onClick={() => {
                                    setCount(count - 1)

                                }}
                                sx={{ minHeight: 0, minWidth: 0, padding: 0, color: '#fff' }}>
                                <RemoveIcon />
                            </Button>
                            <Typography>{Number(count)}</Typography>
                            <Button
                                onClick={() => {
                                    setCount(count + 1)
                                }}
                                sx={{ minHeight: 0, minWidth: 0, padding: 0, color: '#fff' }}>
                                <AddIcon />
                            </Button>
                        </Box>
                        <Typography >${(product.price * count).toFixed(2)}</Typography>
                    </Box>

                </Box>
                <Box width={'100%'} bgcolor='primary.main' display={'flex'} justifyContent='flex-end' flexDirection={'row'}>
                    <IconButton onClick={() => { setshow(!show) }} sx={{ margin: 0, padding: 0 }}><ArrowDown3 /></IconButton>
                </Box>
                {show && <Box
                    display={'flex'}
                    flexDirection='row'
                    bgcolor={'#D3D3D3'}
                    paddingTop='1rem'
                    justifyContent={'space-around'}
                    maxHeight={'fit-content'}
                    minHeight={'8rem'}>
                    <Box>
                        {product.category === 'pizza' && <Typography><b>Select Toppings</b></Typography>
                            ||
                            <Typography><b>Select Extra</b></Typography>
                        }
                        {(product.toppings.length !== 0) &&
                            <Box>
                                {product.toppings.map(topping => {
                                    var check = false
                                    for (let i = 0; i < props.item.extra.length; i++) {
                                        // console.log(props.item.extra[i])
                                        // console.log(topping)
                                        if (props.item.extra[i].name === topping.name) {
                                            check = true

                                            break
                                        }
                                    }

                                    return (
                                        <Box display={'flex'} flexDirection='row' alignItems={'center'}>
                                            <FormControl>
                                                <Checkbox defaultChecked={check} value={topping.price}
                                                    onChange={(e) => {
                                                        //    console.log(e.target.checked)
                                                        if (e.target.checked) {

                                                            settoppings([...toppings, topping])
                                                            let int = parseInt(topping.price)
                                                            let sum = Number(product.price) + int
                                                            setProduct((prevstate) => ({ ...prevstate, price: sum }))
                                                        } else {
                                                            let int = 0
                                                            for (let i = 0; i < toppings.length; i++) {
                                                                if (toppings[i] === topping) {
                                                                    let temp = toppings
                                                                    temp.splice(i, 1)
                                                                    settoppings(temp)
                                                                    int = parseInt(topping.price)

                                                                    break
                                                                }
                                                            }
                                                            let sum = Number(product.price) - int
                                                            console.log(sum)
                                                            setProduct((prevstate) => ({ ...prevstate, price: sum }))
                                                            handleAddtocart(sum)
                                                        }
                                                        // console.log(temptoppings)
                                                    }} />
                                            </FormControl>
                                            <Typography>{topping.name}{`($${topping.price})`}</Typography>
                                        </Box>
                                    )
                                }
                                )}
                            </Box>

                            || <Typography>Nothing Available</Typography>}
                    </Box>
                    {product.category === 'pizza' && <Box>
                        <Typography><b>Select Size</b></Typography>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value)
                                    setsize(e.target.name)
                                    handleChange(e)
                                }}
                                name="radio-buttons-group"
                            >
                                <Box width='100%' justifyContent={'space-between'} display={'flex'} flexDirection='row' alignItems={'center'}>
                                    {!(Number(product.size.small) === 0) && <FormControlLabel name='small' value={parseFloat(product.size.small).toFixed(2)} control={<Radio />} label="small" />}
                                    <Typography>: ${parseFloat(product.size.small).toFixed(2)}</Typography>
                                </Box>
                                <Box display={'flex'} flexDirection='row' alignItems={'center'}>
                                    <FormControlLabel name='medium' value={parseFloat(product.size.medium).toFixed(2)} control={<Radio />} label="medium" />
                                    <Typography>: ${parseFloat(product.size.medium).toFixed(2)}</Typography>
                                </Box>
                                <Box width='100%' justifyContent={'space-between'} display={'flex'} flexDirection='row' alignItems={'center'}>
                                    {!(Number(product.size.large) === 0) && <FormControlLabel name='large' value={parseFloat(product.size.large).toFixed(2)} control={<Radio />} label="large" />}
                                    <Typography>: ${parseFloat(product.size.large).toFixed(2)}</Typography>
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Box>}

                </Box>}
                {loading && <Typography>Updating...</Typography>}
            </Box>
        )
    }
    else {
        return (
            <></>
        )
    }

}

export default ReviewCard