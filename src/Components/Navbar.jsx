import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../Api';


const Navbar = (props) => {
    const navigate = useNavigate()
    const [citylist, setcitylist] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        api.post('/readrestaurant')
            .then(res => { setcitylist(res.data) })
            .catch(err => { console.log(err) })
    }, [])

    const handleCityChange = async (name) => {

        console.log('viewer1')
        props.setrestaurant(name)
        setAnchorEl(null);
    };
 
    const handleClose = () => {
        setAnchorEl(null);
    };
    if(citylist){

        return (
            <Box paddingX={8} bgcolor={'secondary.main'} p={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Typography fontWeight={"bold"} color={'#434752'} variant={'h5'}>The Bom|bay</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-evenly'}>
                    <Button
                        id="basic-button"
                        aria-controls={Open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{ display: { xs: "none", sm: "inherit" } }}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        city
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
                                <MenuItem key={city._id} onClick={()=>{handleCityChange(city.name)}}>{city.name}</MenuItem>
                            )
                        })}
                    </Menu>
                    <Button onClick={() => {
                        navigate('/about')
                    }}>
                        About
                    </Button>
                    <Button onClick={() => {
                        navigate('/offers')
                    }}>
                        offers
                    </Button>
                    <Button onClick={() => {
                        navigate('/cart')
                    }}>
                        Cart
                    </Button>
                    <Button onClick={() => {
                        navigate('/account')
                    }}>
                        Account
                    </Button>
    
                </Box>
            </Box>
        )
    }
}

export default Navbar
