import { Box, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Item from './Item'
import Order from './Order'

const AdminMain = () => {
    const [onItems, setonItems] = useState(false)
    return (
        <Box>
            <Box paddingX={8} bgcolor={'secondary.main'} p={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Typography fontFamily={"'Lato', 'sans-serif'"} color={'#f2f4f3'} variant={'h5'}>The Bom|bay</Typography>
                </Box>
            </Box>
            <Box width={'100%'} minHeight={'100vh'}>
                <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                    <Box bgcolor={'secondary.main'} flex={.3} minHeight={'100vh'} maxHeight={'100%'} paddingTop={'3rem'}>
                        <ListItem sx={{ paddingX: '0' }}>
                            <ListItemButton onClick={() => { setonItems(false) }} sx={{ backgroundColor: "#f2f2f2" }}>
                                <ListItemText>orders</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{ paddingX: '0' }}>
                            <ListItemButton onClick={() => { setonItems(true) }} sx={{ backgroundColor: "#f2f2f2" }}>
                                <ListItemText>items</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Box>
                    <Box flex={1.5}>
                        {onItems &&
                            <Box>
                                <Item/>
                            </Box>}
                        {!onItems &&
                            <Box>
                               <Order/>
                            </Box>}
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default AdminMain
