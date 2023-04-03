import { Box, Button, Checkbox, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import api from '../../Api';
import AdminCard from './AdminCard';
import AddIcon from '@mui/icons-material/Add';
import { PhotoCamera, PictureInPictureRounded } from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditIcon from '@mui/icons-material/Edit';
import Localimage from '../../Assets/pizza.jpg'
import { Add, CloseCircle } from 'iconsax-react';
const Item = () => {
    const SERVER_HOST = process.env.REACT_APP_API_ENDPOINT + '/images/'

    const [itemData, setitemData] = useState({
        category: '',
        restaurant: '',
        name: '',
        price: '',
        desc: '',
    })
    const [image, setimage] = useState()
    const [editItem, seteditItem] = useState({
        category: '',
        restaurant: '',
        name: '',
        price: '',
        desc: '',
        image: null
    })
    const [sizeprice, setsizeprice] = useState({
        small: 0,
        medium:0,
        large: 0
    })
    const [sizeselect, setsizeselect] = useState({
        small: false,
        large: false
    })
    const [flag, setflag] = useState(false)
    const [editItemBox, seteditItemBox] = useState(false)
    const [editCity, seteditCity] = useState('')
    const [editCategory, seteditCategory] = useState('')
    const [editCategoryBox, seteditCategoryBox] = useState(false)
    const [editCityBox, seteditCityBox] = useState(false)
    const [addedCity, setaddedCity] = useState('')
    const [addedCategory, setaddedCategory] = useState('')
    const [addItemBox, setaddItemBox] = useState(false)
    const [addCategoryBox, setaddCategoryBox] = useState(false)
    const [addCityBox, setaddCityBox] = useState(false)
    const [display, setdisplay] = useState(true)
    const [toppingList, settoppingList] = useState([])
    const [items, setitems] = useState()
    const [citylist, setcitylist] = useState()
    const [categorylist, setcategorylist] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorEl2, setAnchorEl2] = useState(null)
    const [city, setcity] = useState('restaurant')
    const [category, setcategory] = useState('category')
    const Open = Boolean(anchorEl);
    const Open2 = Boolean(anchorEl2);
    useEffect(() => {
        api.post('/readcategory')
            .then(res => { setcategorylist(res.data); })
            .catch(err => { console.log(err) })

        api.post('/readrestaurant')
            .then(res => { setcitylist(res.data); if (citylist) { setcity(citylist[0]) } })
            .catch(err => { console.log(err) })

        api.post('/readproduct', { city: city, category: category })
            .then(res => { setitems(res.data) })
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

    const handleToppingAdd = () => {
        settoppingList([...toppingList,
        {
            name: '',
            price: '',
        }])
    }
    const handleToppingsRemove = (index) => {
        const list = [...toppingList]
        list.splice(index, 1)
        settoppingList(list)
    }

    const handleToppingsChange = (e, index) => {
        const { name, value } = e.target
        const list = [...toppingList]
        list[index][name] = value
        settoppingList(list)
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
    const handleEditCity = () => {
        setdisplay(!display)
        seteditCityBox(!editCityBox)
    }
    const handleEditCategory = () => {
        setdisplay(!display)
        seteditCategoryBox(!editCategoryBox)
    }
    const handleCityAdd = () => {
        setdisplay(!display)
        setaddCityBox(!addCityBox)
        handleClose()
    }
    const handleItemClicked = (data) => {
        setdisplay(!display)
        seteditItemBox(!editItemBox)
        seteditItem(data)
    }
    useEffect(() => {
        if (itemData.price) {
            setsizeprice((prevstate) => ({ ...prevstate, medium: itemData.price.toString() }))
        }
    }, [itemData.price])
    
    const handleItemSubmit = () => {
       
        setitemData({ category: category, restaurant: city })
        if (itemData.name && itemData.price && itemData.desc && image) {

            const formdata = new FormData()
            formdata.append('name', itemData.name)
            formdata.append('price', itemData.price)
            formdata.append('desc', itemData.desc)
            formdata.append('city', city.toString())
            formdata.append('category', category)
            formdata.append('image', image)
            // console.log(formdata)
            // setitemData({
            //     category: '',
            //     restaurant: '',
            //     name: '',
            //     price: '',
            //     desc: '',
            // })
            api.post("/addproduct", formdata)
                .then(res => {
                    api.post('/addproduct2', { sizeprice: sizeprice, toppingList: toppingList, product: res.data })
                        .then(res => {
                            alert(res.data.message)
                        })
                })
                .catch(err => { alert("something went wrong!!") })
        } else {
            // alert("fill out the details")
            // setitemData({
            //     category: '',
            //     restaurant: '',
            //     name: '',
            //     price: '',
            //     desc: '',
            // })
               console.log(toppingList)
               console.log(sizeprice)
              console.log(itemData.price)

        }

    }
    // console.log(sizeprice)
    if (citylist && categorylist && items) {
        if (display) {
            return (
                <Box paddingY={'3rem'}>
                    <Box>
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
                                    <MenuItem key={city._id} onClick={() => { setcity(city.name); setAnchorEl(null); }}>{city.name}</MenuItem>
                                )
                            })}
                            <MenuItem onClick={handleCityAdd} sx={{ backgroundColor: "#d3d3d3" }}><AddIcon /></MenuItem>
                        </Menu>
                        <Button onClick={handleEditCity} sx={{ color: 'black' }}>
                            <EditIcon />
                        </Button>
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
                                    <MenuItem key={category._id} onClick={() => { setcategory(category.name); setAnchorEl2(null); }}>{category.name}</MenuItem>
                                )
                            })}
                            <MenuItem onClick={handleCategoryAdd} sx={{ backgroundColor: "#d3d3d3" }}><AddIcon /></MenuItem>
                        </Menu>
                        <Button onClick={handleEditCategory} sx={{ color: 'black' }}>
                            <EditIcon />
                        </Button>

                    </Box>

                    <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                        {items.map(item => {
                            return (
                                <AdminCard key={item._id} handleItemClicked={handleItemClicked} item={item} />
                            )
                        })}
                    </Box>
                    {!(city == 'city') && !(category == 'category') && <Box paddingX={'3rem'} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
                        <Button variant='contained' onClick={handleAddItem}>Add Item</Button>
                    </Box>}
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
                            backgroundColor={'#d3d3d3'} width={'60%'}
                            marginX={'auto'} minHeight={'100vh'}>
                            <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'right'} >
                                <Button onClick={handleAddItem}>
                                    <CloseRoundedIcon />
                                </Button>
                            </Box>
                            <Box overflow={'hidden'} border='1px solid black' borderRadius={'50%'}>
                                <IconButton component="label">
                                    <input hidden name='image' accept='image/*' onChange={handlefileChange} value={itemData.image} type="file" />
                                    <img src={Localimage} position='center' alt='image' width={'100px'} height={'100px'} />
                                </IconButton>
                            </Box>
                            <Box paddingY='1rem'>
                                <TextField variant='outlined' autoComplete='off' size='small' name='name' onChange={handleChange} value={itemData.name} label={'name'}></TextField>
                            </Box>
                            <Box paddingY='1rem'>
                                <TextField variant='outlined' autoComplete='off' size='small' name='price' onChange={handleChange} value={itemData.price} label={'price'}></TextField>
                            </Box>
                            <Box borderBottom={'1px solid #a9927d'} paddingY='1rem'>
                                <Typography marginBottom={'1rem'}>Select Prize For Size</Typography>
                                <Box marginBottom={'.5rem'}>
                                    <Box display='flex' flexDirection={'row'}>
                                        <Typography>Small :</Typography>
                                        <Checkbox checked={sizeselect.small} onChange={() => { setsizeselect((prevstate) => ({ ...prevstate, small: !(sizeselect.small) })) }} sx={{ padding: 0, margin: 0 }} />
                                    </Box>
                                    {sizeselect.small && <TextField value={sizeprice.small} onChange={(e) => { setsizeprice((prevstate) => ({ ...prevstate, small: e.target.value })) }} label='price' size='small'></TextField>}
                                </Box>
                                <Box marginBottom={'.5rem'}>
                                    <Typography>Medium :</Typography>
                                    <TextField value={itemData.price} disabled size='small'></TextField>
                                </Box>
                                <Box marginBottom={'.5rem'}>
                                    <Box display='flex' flexDirection={'row'}>
                                        <Typography>Large :</Typography>
                                        <Checkbox checked={sizeselect.large} onChange={() => { setsizeselect((prevstate) => ({ ...prevstate, large: !(sizeselect.large) })) }} sx={{ padding: 0, margin: 0 }} />
                                    </Box>
                                    {sizeselect.large && <TextField value={sizeprice.large} onChange={(e) => { setsizeprice((prevstate) => ({ ...prevstate, large: e.target.value })) }} label='price' size='small'></TextField>}
                                </Box>
                            </Box>
                            <Box>
                                <Typography marginTop={'2rem'} sx={{ marginBottom: '1rem' }}>Toppings</Typography>
                                <Box >
                                    {
                                        toppingList.map((topping, index) => (
                                            <Box key={index} marginRight={'1rem'} marginBottom={'1rem'} display='flex' bgcolor={'grey.main'} paddingX='1rem' paddingBottom={'1rem'} borderRadius={'.5rem'} flexDirection='column'>
                                                <Box onClick={() => handleToppingsRemove(index)} textAlign={'right'}><IconButton><CloseCircle /></IconButton></Box>
                                                <TextField variant='standard' onChange={(e) => { handleToppingsChange(e, index) }} value={topping.name} sx={{ marginBottom: '1rem' }} label='name' name='name'></TextField>
                                                <TextField variant='standard' onChange={(e) => { handleToppingsChange(e, index) }} type={'number'} value={topping.price} sx={{ marginBottom: '1rem' }} label='price' name='price'></TextField>
                                            </Box>
                                        ))
                                    }
                                </Box>
                                <Button onClick={handleToppingAdd} sx={{ justifyContent: 'left', marginBottom: '1rem' }}><Add />Add</Button>
                            </Box>
                            <TextField variant='outlined' autoComplete='off' size='small' name='desc' onChange={handleChange} value={itemData.desc} label={'description'}></TextField>
                            <Box marginY='1rem'>
                                <Button onClick={handleItemSubmit} variant='contained'>Add</Button>
                            </Box>
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
                                            window.location.reload(true)
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
                            <Typography>Add Category Name</Typography>
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
                                            window.location.reload(true)
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
                            }} variant='contained'>Add Category</Button>

                        </Box>
                    </form>
                )
            }
            else if (editCityBox) {
                return (
                    <Box marginTop={'5rem'}
                        borderRadius={5}
                        backgroundColor={'#d3d3d3'} width={'40%'}
                        marginX={'auto'} height={'50vh'}>
                        <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'right'} >
                            <Button onClick={handleEditCity}>
                                <CloseRoundedIcon />
                            </Button>
                        </Box>
                        <Box
                            height={'100%'}
                            display={'flex'}
                            alignItems={'center'}
                            flexDirection={'column'}
                            justifyContent={'space-evenly'}>
                            <Box
                                display={'flex'}
                                // alignItems='left'
                                flexDirection={'row'}
                                justifyContent={'space-between'}>
                                <TextField defaultValue={city} onChange={(e) => {
                                    seteditCity(e.target.value)
                                }} size='small'></TextField>
                                <Button variant='contained' onClick={() => {
                                    if (city === editCity) {
                                        alert("no change has been done")
                                    } else {
                                        api.post('/updaterestaurant', { city: city, editCity: editCity })
                                            .then(res => {
                                                alert(res.data.message)
                                                window.location.reload(true)
                                            })
                                            .catch(err => { })
                                    }
                                }}>edit</Button>
                            </Box>
                            <Box>
                                <Button variant='contained' onClick={() => {
                                    api.post('/deleterestaurant', { city: city })
                                        .then(res => {
                                            alert(res.data.message)
                                            handleEditCity()
                                            window.location.reload(true)
                                        })
                                        .catch(err => { })
                                }}>delete</Button>
                            </Box>
                        </Box>

                    </Box>
                )
            }
            else if (editCategoryBox) {
                return (
                    <Box marginTop={'5rem'}
                        borderRadius={5}
                        backgroundColor={'#d3d3d3'} width={'40%'}
                        marginX={'auto'} height={'50vh'}>
                        <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'right'} >
                            <Button onClick={handleEditCategory}>
                                <CloseRoundedIcon />
                            </Button>
                        </Box>
                        <Box
                            height={'100%'}
                            display={'flex'}
                            alignItems={'center'}
                            flexDirection={'column'}
                            justifyContent={'space-evenly'}>
                            <Box
                                display={'flex'}
                                // alignItems='left'
                                flexDirection={'row'}
                                justifyContent={'space-between'}>
                                <TextField defaultValue={category} onChange={(e) => {
                                    seteditCategory(e.target.value)
                                }} size='small'></TextField>
                                <Button variant='contained' onClick={() => {
                                    if (category === editCategory) {
                                        alert("no change has been done")
                                    } else {
                                        api.post('/updatecategory', { category: category, editCategory: editCategory })
                                            .then(res => {
                                                alert(res.data.message)
                                                window.location.reload(true)
                                            })
                                            .catch(err => { })
                                    }
                                }}>edit</Button>
                            </Box>
                            <Box>
                                <Button variant='contained' onClick={() => {
                                    api.post('/deletecategory', { category: category })
                                        .then(res => {
                                            alert(res.data.message)
                                            handleEditCategory()
                                            window.location.reload(true)
                                        })
                                        .catch(err => { })
                                }}>delete</Button>
                            </Box>
                        </Box>

                    </Box>
                )
            }
            else if (editItemBox) {
                return (
                    <Box marginTop={'5rem'}
                        borderRadius={5}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'space-evenly'}
                        backgroundColor={'#d3d3d3'} width={'60%'}
                        marginX={'auto'} minHeight={'80vh'}>
                        <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'right'} >
                            <Button onClick={handleItemClicked}>
                                <CloseRoundedIcon />
                            </Button>
                        </Box>
                        <Box display={'flex'} justifyContent={'space-evenly'}>
                            {editItem.image && <Box
                                width={'50%'}
                                sx={{
                                    backgroundImage: `url(${SERVER_HOST + editItem.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: 'center'
                                }}>

                                <IconButton component="label">
                                    <input hidden name='editImage' accept='image/*' onChange={(e) => {
                                        setflag(true)
                                        seteditItem((prevState) => ({
                                            ...prevState, image: e.target.files[0]
                                        }))
                                        alert('new image file is uploaded')
                                    }} value={itemData.image} type="file" />
                                    <PhotoCamera />
                                </IconButton>
                            </Box>}
                            <Box display={'flex'}
                                minHeight={'50vh'}
                                justifyContent={'space-between'}
                                flexDirection={'column'}
                                alignItems={'flex-start'}
                                paddingX={'3rem'} paddingY={'1rem'}>
                                <TextField value={editItem.name} name={'name'}
                                    onChange={(e) => {
                                        seteditItem((prevState) => ({
                                            ...prevState, [e.target.name]: [e.target.value]
                                        }))
                                    }}
                                    label={'name'} variant={'outlined'}
                                    size={'small'}></TextField>
                                <TextField
                                    onChange={(e) => {
                                        seteditItem((prevState) => ({
                                            ...prevState, [e.target.name]: [e.target.value]
                                        }))
                                        console.log(editItem)
                                    }} value={editItem.price} name={'price'}
                                    label={'price'} variant={'outlined'}
                                    size={'small'}></TextField>


                                <FormControl size='small' sx={{ width: '100%' }}>
                                    <InputLabel id='city'>city</InputLabel>
                                    <Select label='city' value={editItem.restaurant} name={'restaurant'}
                                        onChange={(e) => {
                                            seteditItem((prevState) => ({
                                                ...prevState, [e.target.name]: [e.target.value]
                                            }))
                                        }}
                                    >
                                        {citylist.map(city => (
                                            <MenuItem key={city._id} value={city.name}>{city.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl size='small' sx={{ width: '100%' }}>
                                    <InputLabel id='category'>category</InputLabel>
                                    <Select label='category' value={editItem.category} name={'category'}
                                        onChange={(e) => {
                                            seteditItem((prevState) => ({
                                                ...prevState, [e.target.name]: [e.target.value]
                                            }))
                                        }}
                                    >
                                        {categorylist.map(category => (
                                            <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    onChange={(e) => {
                                        seteditItem((prevState) => ({
                                            ...prevState, [e.target.name]: [e.target.value]
                                        }))
                                    }}
                                    value={editItem.desc} name={'desc'}
                                    label={'description'} variant={'outlined'}
                                    size={'small'}></TextField>
                            </Box>
                        </Box>
                        <Box display={'flex'} justifyContent={'space-evenly'}>
                            <Button variant='contained' onClick={() => {
                                console.log(editItem)
                                const formdata = new FormData()
                                formdata.append('ID', editItem._id)
                                formdata.append('name', editItem.name)
                                formdata.append('price', editItem.price)
                                formdata.append('desc', editItem.desc)
                                formdata.append('city', editItem.restaurant)
                                formdata.append('category', editItem.category)
                                formdata.append('image', editItem.image)
                                if (flag) {
                                    api.post('/updateproduct', formdata)
                                        .then(res => { alert(res.data.message); window.location.reload(true) })
                                        .catch(err => { })
                                } else {
                                    api.post('/updateproduct2', editItem)
                                        .then(res => { alert(res.data.message); window.location.reload(true) })
                                        .catch(err => { })
                                }
                            }}>update</Button>
                            <Button variant='contained' onClick={() => {
                                api.post('/deleteproduct', editItem)
                                    .then(res => { alert(res.data.message); window.location.reload(true) })
                                    .catch(err => { })
                            }}>delete</Button>
                        </Box>
                    </Box>
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
