import { Box, Typography, TextField, Button, styled, } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios"
import Changepass from './Changepass';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [forgot, setPass] = useState(false)
    const [inputs, setinputs] = useState({
        email: "",
        password: "",
    })
    const LandingLink = styled(NavLink)({
        color: 'primary'
    })
    const handleChange = (e) => {
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
    }

    const handleForgot = (e) => {
        if (forgot)
            setPass(false)
        else
            setPass(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = inputs
        console.log(inputs)
        if (email && password) {
            axios.post("/login", inputs)
                .then(res => {
                    alert(res.data.message)
                    if (res.data.message === "LogIn Sucessful") {
                       navigate('/home')
                    }
                })
        } else {
            alert("Invalid Input")
        }

    }
    const handleReset = (e) => {
        setinputs({
            email: "", password: ""
        })
    }
    if (!forgot) {
        return (
            <Box>
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
                            <LandingLink to={'/'}>
                                <ArrowBackIcon />
                            </LandingLink>
                            <Typography variant='h5' fontWeight={100} padding={3}>{"Login"}</Typography>
                        </Box>
                        <TextField
                            autoComplete='off'
                            value={inputs.email}
                            onChange={handleChange}
                            name='email'
                            size='small' margin='normal' type={"email"} placeholder='Email' />
                        <TextField
                            autoComplete='off'
                            name='password'
                            value={inputs.password}
                            onChange={handleChange}
                            size='small' margin='normal' type={"password"} placeholder='Password' />
                        <Button sx={{ textTransform: "none" }} onClick={handleForgot}>
                            <Typography sx={{ fontSize: "12px" }} marginRight="7rem" color={'error'}>forgot password?</Typography>
                        </Button>
                        <Button type="submit" variant='contained' sx={{ marginTop: 3 }}>{"Login"}</Button>
                        <Button sx={{ marginTop: 3 }} onClick={handleReset}>{"reset"}</Button>
                    </Box>
                </form>
            </Box>

        )
    }
    else {
        return (
            <Changepass handleForgot={handleForgot} />
        )
    }

}

export default Login
