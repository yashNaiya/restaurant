import { Box, Button, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import api from '../../Api';
import AdminCard from './AdminCard';
import AddIcon from '@mui/icons-material/Add';
import { PhotoCamera } from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FileBase64 from 'react-file-base64';

const Item = () => {
    const [itemData, setitemData] = useState({
        category: '',
        restaurant: '',
        name: '',
        price: '',
        desc: '',
    })
    const [image, setimage] = useState()
    const [addedCity, setaddedCity] = useState('')
    const [addedCategory, setaddedCategory] = useState('')
    const [addItemBox, setaddItemBox] = useState(false)
    const [addCategoryBox, setaddCategoryBox] = useState(false)
    const [addCityBox, setaddCityBox] = useState(false)
    const [display, setdisplay] = useState(true)
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
        api.post('/readproduct', { city: city, category: category })
            .then(res => { setitems(res.data) })
            .catch(err => { console.log(err) })
    }, [city, category])

    const handleChange = (e) => {

        setitemData((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
        // console.log(itemData)
    }

    const handlefileChange = async (e) => {
        setimage(e.target.files[0])

    }

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
    const handleAddItem = () => {
        setdisplay(!display)
        setaddItemBox(!addItemBox)
    }
    const handleCategoryAdd = () => {
        setdisplay(!display)
        setaddCategoryBox(!addCategoryBox)
        handleClose2()
    }
    const handleCityAdd = () => {
        setdisplay(!display)
        setaddCityBox(!addCityBox)
        handleClose()
    }
    const handleItemSubmit = () => {
        setitemData({ category: category, restaurant: city })
        if (itemData.name && itemData.price && itemData.desc && image) {

            const formdata = new FormData()
            formdata.append('name', itemData.name)
            formdata.append('price', itemData.price)
            formdata.append('desc', itemData.desc)
            formdata.append('city', city)
            formdata.append('category', category)
            formdata.append('image', image)
            setitemData({
                category: '',
                restaurant: '',
                name: '',
                price: '',
                desc: '',
            })
            api.post("/addproduct", formdata)
                .then(res => alert(res.data.message))
                .catch(err => { alert("something went wrong!!") })
        } else {
            alert("fill out the details")
            setitemData({
                category: '',
                restaurant: '',
                name: '',
                price: '',
                desc: '',
            })
        }

    }

    if (citylist && categorylist && items) {
        if (display) {
            return (
                <Box paddingY={'3rem'} marginLeft={'2rem'}>
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
                            <MenuItem onClick={handleCityAdd} sx={{ backgroundColor: "#d3d3d3" }}><AddIcon /></MenuItem>
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
                            <MenuItem onClick={handleCategoryAdd} sx={{ backgroundColor: "#d3d3d3" }}><AddIcon /></MenuItem>
                        </Menu>
                    </Box>

                    <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                        {items.map(item => {
                            return (
                                <AdminCard item={item} />
                            )
                        })}
                    </Box>
                    <Box paddingX={'3rem'} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
                        <Button variant='contained' onClick={handleAddItem}>Add Item</Button>
                    </Box>
                </Box>
            )
        }
        else {
            if (addItemBox) {
                return (
                    <form encType='multipart/form-data'>
                        <Box marginTop={'5rem'} display={'flex'}
                            alignItems={'center'} flexDirection={'column'}
                            justifyContent={'space-around'}
                            borderRadius={5}
                            backgroundColor={'#d3d3d3'} width={'40%'}
                            marginX={'auto'} height={'50vh'}>
                            <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'right'} >
                                <Button onClick={handleAddItem}>
                                    <CloseRoundedIcon />
                                </Button>
                            </Box>
                            <IconButton component="label">
                                <input hidden name='image' accept='image/*' onChange={handlefileChange} value={itemData.image} type="file" />
                                <PhotoCamera />
                            </IconButton>
                            <TextField variant='outlined' autoComplete='off' size='small' name='name' onChange={handleChange} value={itemData.name} label={'name'}></TextField>
                            <TextField variant='outlined' autoComplete='off' size='small' name='price' onChange={handleChange} value={itemData.price} label={'price'}></TextField>
                            <TextField variant='outlined' autoComplete='off' size='small' name='desc' onChange={handleChange} value={itemData.desc} label={'description'}></TextField>
                            <Button onClick={handleItemSubmit} variant='contained'>Add</Button>

                        </Box>
                    </form>
                )
            }
            else if (addCityBox) {
                return (

                    <form encType='multipart/form-data'>
                        <Box marginTop={'5rem'} display={'flex'}
                            alignItems={'center'} flexDirection={'column'}
                            justifyContent={'space-around'}
                            borderRadius={5}
                            backgroundColor={'#d3d3d3'} width={'40%'}
                            marginX={'auto'} height={'40vh'}>
                            <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'right'} >
                                <Button onClick={handleCityAdd}>
                                    <CloseRoundedIcon />
                                </Button>
                            </Box>
                            <Typography>Add City Name</Typography>
                            <TextField variant='outlined' autoComplete='off'
                                onChange={(e) => {
                                    setaddedCity(e.target.value)
                                }}
                                name='addedCity' size='small' value={addedCity} label={'name'}></TextField>
                            <Button onClick={() => {
                                if (addedCity) {
                                    api.post('/addrestaurant', { name: addedCity })
                                        .then(res => {
                                            alert(res.data.message)
                                            handleCityAdd()
                                            setaddedCity('')
                                        })
                                        .catch(err => {
                                            alert('someting went wrong')
                                            setaddedCity('')

                                        })
                                } else {
                                    alert('add city name')
                                }
                            }} variant='contained'>Add City</Button>

                        </Box>
                    </form>
                )
            }
            else if (addCategoryBox) {
                return (
                    <form encType='multipart/form-data'>
                        <Box marginTop={'5rem'} display={'flex'}
                            alignItems={'center'} flexDirection={'column'}
                            justifyContent={'space-around'}
                            borderRadius={5}
                            backgroundColor={'#d3d3d3'} width={'40%'}
                            marginX={'auto'} height={'50vh'}>
                            <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'right'} >
                                <Button onClick={handleCategoryAdd}>
                                    <CloseRoundedIcon />
                                </Button>
                            </Box>
                            <Typography>Add City Name</Typography>
                            <TextField variant='outlined' autoComplete='off'
                                onChange={(e) => {
                                    setaddedCategory(e.target.value)
                                }}
                                name='addedCategory' size='small' value={addedCategory} label={'name'}></TextField>
                            <Button onClick={() => {
                                if (addedCategory) {
                                    api.post('/addcategory', { name: addedCategory })
                                        .then(res => {
                                            alert(res.data.message)
                                            handleCategoryAdd()
                                            setaddedCategory('')
                                        })
                                        .catch(err => {
                                            alert('someting went wrong')
                                            setaddedCategory('')

                                        })
                                } else {
                                    alert('add category name')
                                }
                            }} variant='contained'>Add City</Button>

                        </Box>
                    </form>
                )
            }
            else {
                return (
                    <></>
                )
            }
        }
    }
    else {
        return (
            <></>
        )
    }
}

export default Item
