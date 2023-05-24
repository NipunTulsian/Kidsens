import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Typography, AppBar, Toolbar, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from '../logo.png'

export default function TherapistNavbar({ toggleDrawer, displayThis }) {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('User')
        navigate('/')
    }

    return (
        <AppBar position="static" style={{ height: '60px' }}>
            <div style={{ padding: '0px 10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 'auto 0px' }}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton onClick={toggleDrawer('left', true)}>
                        <MenuIcon style={{color: 'white', cursor: 'pointer'}} />
                    </IconButton>
                    <img href="/" src={logo} style={{width: '120px', cursor: 'pointer'}} />
                    <Typography variant='h6' style={{color: 'white', marginLeft: '10px'}}>{displayThis}</Typography>
                </div>
                <Button style={{color: 'white', fontWeight: '900'}} onClick={logout}>Logout</Button>
            </div>
        </AppBar>
    )
}