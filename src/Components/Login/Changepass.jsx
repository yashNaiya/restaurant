import React from 'react'
import { Box, Typography, TextField, Button, } from '@mui/material'
import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';


const Changepass = (props) => {
    
    const [inputs, setinputs] = useState({
        email: "",
    })

    const handleChange = (e) => {
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {email} = inputs
        console.log(email)
         if (email){
            axios.post("/forgotpass", inputs)
                .then(res => alert(res.data.message))
        } else {
            alert("Invalid Input")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box
                display="flex"
                flexDirection={'column'}
                maxWidth={300}
                alignItems="center"
                justifyContent={"center"}
                margin="auto"
                marginTop={5}
                padding={3}
                borderRadius={5}
                boxShadow={"5px 5px 10px #ccc"}
                sx={{
                    ":hover": {
                        boxShadow: "10px 10px 20px #ccc"
                    }
                }}
            >
                <Box display="flex" sx={{ alignItems: "center" }}>
                    <Button onClick={props.handleForgot}>
                        <ArrowBackIcon />
                    </Button>
                    <Typography variant='h5' fontWeight={100} padding={3}>{"Change"}</Typography>
                </Box>
                <TextField
                    autoComplete='off'
                    value={inputs.email}
                    onChange={handleChange}
                    name='email'
                    size='small' margin='normal' type={"email"} placeholder='Email' />
                        <Button variant='contained'  sx={{ marginTop: 3 }} type={"submit"}>{"Get Mail"}</Button>     
            </Box>
        </form>
    )
}

export default Changepass
