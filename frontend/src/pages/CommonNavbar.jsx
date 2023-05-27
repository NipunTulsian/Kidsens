import React from 'react'
import Button from "@mui/material/Button";
import { Typography, AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from '../logo.png'

export default function Navbar(props) {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('User')
        navigate('/')
    }

    return (
        <AppBar position="static" style={{ height: '60px', marginBottom: '60px' }}>
            <div style={{ padding: '0px 10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 'auto 0px' }}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <img href="/" src={logo} style={{width: '120px', cursor: 'pointer'}} />
                </div>
                <Typography variant='h4'>{props.pageTitle}</Typography>
                <Button style={{color: 'white', fontWeight: '900'}} onClick={logout}>Logout</Button>
            </div>
        </AppBar>
    )
}