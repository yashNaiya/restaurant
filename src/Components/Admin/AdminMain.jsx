import { Box, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Item from './Item'
import Message from './Message'
import Order from './Order'

const AdminMain = () => {
    const [onPage, setonPage] = useState(1)
    return (
        <Box>
            <Box paddingX={8} bgcolor={'primary.main'} p={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Typography fontWeight={'bold'} color={'#f2f4f3'} variant={'h5'}>The Bom|bay</Typography>
                </Box>
            </Box>
            <Box width={'100%'} minHeight={'100vh'}>
                <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                    <Box bgcolor={'primary.main'} flex={.3} minHeight={'100vh'} maxHeight={'100%'} paddingTop={'3rem'}>
                        <ListItem sx={{ paddingX: '0' }}>
                            <ListItemButton onClick={() => { setonPage(1) }} sx={{ backgroundColor: "secondary.main" }}>
                                <ListItemText>items</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{ paddingX: '0' }}>
                            <ListItemButton onClick={() => { setonPage(2) }} sx={{ backgroundColor: "#f2f2f2" }}>
                                <ListItemText>orders</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{ paddingX: '0' }}>
                            <ListItemButton onClick={() => { setonPage(3) }} sx={{ backgroundColor: "#f2f2f2" }}>
                                <ListItemText>messages</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Box>
                    <Box flex={1.5}>
                        {onPage===1 &&
                            <Box>
                                <Item />
                            </Box>}
                        {onPage===2 &&
                            <Box>
                                <Order />
                            </Box>}
                        {onPage===3 &&
                            <Box>
                                <Message />
                            </Box>}
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default AdminMain
