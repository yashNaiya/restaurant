import { Box } from '@mui/system'
import React from 'react'
import Typography from '@mui/material/Typography'
import image from '../../Assets/pizza.jpg'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../Api';
import useDidMountEffect from '../../DidMount';

const ReviewCard = (props) => {
    const [product, setProduct] = useState()
    const [count, setCount] = useState()
    // console.log(props.item)
    useEffect(() => {
        if(props.item){
            api.post('/getproduct',props.item)
            .then(res=>{
                setProduct(res.data)
            }).catch(err=>{
            })
        }
        setCount(parseInt(localStorage.getItem(props.item.productId)))
    }, [])
    const handleAddtocart = () => {
        api.post('/addtocart', { count: count, userId: props.rootUserId, productId: props.item.productId })
            .then()
            .catch(err => {
                console.log(err)
            })

    }

    useDidMountEffect(()=>{
        console.log("product mounted")
        if(count===0){
            localStorage.removeItem(props.item.productId)
        }
        localStorage.setItem(props.item.productId,count)
        handleAddtocart()
    },[count])
    if(product && !(count===0)){
        return (
            <Box sx={{ borderBottom: '2px solid #a9927d' }} justifyContent={'space-between'}
           maxHeight={'fit-content'}
            minHeight={'8rem'} display={'flex'} flexDirection={'row'} marginY={'1rem'}>
                <Box
                    m={'2%'}
                    minWidth={'30%'}
                    width={'30%'}
                    sx={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: 'center'
                    }}
                >
                </Box>
                <Typography m={'2%'} variant='caption'>
                    {product.desc}
                </Typography>
                <Box display={'flex'} m={'2%'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'end'}>
                    <Box display={'flex'} flexDirection={'row'}>
                        <Button
                        onClick={()=>{
                            setCount(count -1)
                        }}
                        sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                        <RemoveIcon />
                        </Button>
                        <Typography>{count}</Typography>
                        <Button
                        onClick={()=>{
                            setCount(count +1)
                        }}
                        sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                        <AddIcon />
                        </Button>
                    </Box>
                    <Typography >${product.price*count}</Typography>
                </Box>
            </Box>
        )
    }
    else{
        return(
            <></>
        )
    }

}

export default ReviewCard