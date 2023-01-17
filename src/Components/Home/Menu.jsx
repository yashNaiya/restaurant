import { Box, Typography } from '@mui/material'
import React from 'react'
import Card from './Card'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import image from '../../Assets/pizza.jpg'
import burger from '../../Assets/burger.jpg'
import { Link } from 'react-scroll'
import { useEffect, useState } from 'react';
import api from '../../Api';
const Menu = (props) => {
    const [open, setOpen] = React.useState(false);
    const [products, setproducts] = useState()
    const [pizzas, setpizzas] = useState(0)
    let pizzasTemp = []
    const [burgers, setburgers] = useState()
    let burgersTemp = []
    const handleClick = () => {
        setOpen(!open);
    };
    const getproducts = () => {
        api.get('/getproducts')
            .then(res => {
                setproducts(res.data)
            })
        if (products) {
            pizzasTemp = products.filter(product => {
                return (
                    product.category === 'pizza'
                )
            })
            burgersTemp = products.filter(product => {
                return (
                    product.category === 'burger'
                )
            })
        }
    }
    useEffect(() => {
        getproducts()
        if (pizzasTemp && burgersTemp) {
            setpizzas(pizzasTemp)
            setburgers(burgersTemp)
            // console.log(pizzas)
        }
    }, [products])

    if (pizzas && burgers) {
        return (
            <Box
                maxWidth={'60%'}
                minWidth={'60%'}
                margin="50px auto"
                minHeight={'100vh'}
                display={'flex'}
                justifyContent={'space-around'}
                flexDirection={'column'}>
                <Box width={'300px'}>

                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>

                        <ListItemText primary="Menu" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to="pizza" spy={true} smooth={true} offset={50} duration={500}>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary="Pizza" />
                                </ListItemButton>
                            </Link>
                            <Link to="burger" spy={true} smooth={true} offset={50} duration={500}>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary="Burger" />
                                </ListItemButton>
                            </Link>
                        </List>
                    </Collapse>
                </Box>

                <Box
                    id={'pizza'}
                    borderTop={'2px solid #a9927d'}
                    paddingTop={8}
                    margin="50px auto"
                    display={'flex'}
                    width={'100%'}
                    flexDirection={'row'}
                    flexWrap={'wrap'}
                    justifyContent={'space-evenly'}
                >
                    {pizzas.map(pizza => {
                        return (
                            <Card rootUserId={props.rootUserId} key={pizza._id} image={image} item={pizza} />
                        )
                    })}
                </Box>
                <Box
                    id={'burger'}
                    borderTop={'2px solid #a9927d'}
                    paddingTop={8}
                    margin="50px auto"
                    minHeight={'100vh'}
                    display={'flex'}
                    width={'100%'}
                    flexDirection={'row'}
                    flexWrap={'wrap'}
                    justifyContent={'space-evenly'}
                >
                    {burgers.map(burg => {
                        return (
                            <Card rootUserId={props.rootUserId} key={burg._id} image={burger} item={burg} />
                        )
                    })}
                </Box>

            </Box>
        )
    } else {
        return (
            <Typography>Loading...</Typography>
        )
    }
}

export default Menu
