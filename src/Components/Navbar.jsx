import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react'

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const Open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  
  const handleRecruiter = async () =>{
   
    console.log('viewer1')
    setAnchorEl(null);
  };
  const handleSeeker = async () => {
   
    console.log('viewer2')
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <Box paddingX={8} bgcolor={'secondary.main'} p={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
                <Typography fontFamily={"'Lato', 'sans-serif'"} color={'#f2f4f3'} variant={'h5'}>The Bom|bay</Typography>
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
                    <MenuItem onClick={handleRecruiter}>Toronto</MenuItem>
                    <MenuItem onClick={handleSeeker}>Kitchener</MenuItem>
                </Menu>
                <Button>
                    offers
                </Button>
                <Button>
                    Cart
                </Button>
                <Button>
                    Account
                </Button>
            </Box>
        </Box>
    )
}

export default Navbar
