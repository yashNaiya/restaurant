import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import api from '../../Api';
import AdminCard from './AdminCard';
import AddIcon from '@mui/icons-material/Add';

const Item = () => {
    const [items, setitems] = useState()
    const [citylist, setcitylist] = useState()
    const [categorylist, setcategorylist] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorEl2, setAnchorEl2] = useState(null)
    const [city, setcity] = useState('toronto')
    const [category, setcategory] = useState('pizza')
    const Open = Boolean(anchorEl);
    const Open2 = Boolean(anchorEl2);
    useEffect(() => {
        api.post('/readcategory')
            .then(res => { setcategorylist(res.data) })
            .catch(err => { console.log(err) })

        api.post('/readrestaurant')
            .then(res => { setcitylist(res.data) })
            .catch(err => { console.log(err) })
    }, [])

    useEffect(() => {
        api.post('/readproduct',{city:city,category:category})
        .then(res=>{setitems(res.data)})
        .catch(err=>{console.log(err)})
    }, [city,category])
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    if (citylist && categorylist && items) {

        return (
            <Box marginTop={'3rem'} marginLeft={'2rem'}>
                <Box display={'flex'}>
                    <Button
                        sx={{ color: 'black', border: "1px solid black" }}
                        // variant='outlined'
                        aria-controls={Open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Open ? 'true' : undefined}
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        {city}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={Open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {citylist.map(city => {
                            return (
                                <MenuItem onClick={() => { setcity(city.name); setAnchorEl(null); }}>{city.name}</MenuItem>
                            )
                        })}
                        <MenuItem sx={{backgroundColor:"d3d3d3"}}><AddIcon/></MenuItem>
                    </Menu>
                    <Button
                        sx={{ marginLeft: '3rem', color: 'black', border: "1px solid black" }}
                        variant='outlined'
                        aria-controls={Open2 ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Open2 ? 'true' : undefined}
                        onClick={handleClick2}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        {category}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={Open2}
                        onClose={handleClose2}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {categorylist.map(category => {
                            return (
                                <MenuItem onClick={() => { setcategory(category.name); setAnchorEl2(null); }}>{category.name}</MenuItem>
                            )
                        })}
                        <MenuItem><AddIcon/></MenuItem>
                    </Menu>
                </Box>
                <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                        {items.map(item=>{
                            return(
                                <AdminCard item={item}/>
                            )
                        })}
                </Box>
            </Box>
        )
    }
}

export default Item
