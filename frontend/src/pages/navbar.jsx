import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, AppBar, Toolbar, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from '../logo.png'

export default function Navbar({registerStudent, registerTherapist, students, therapists, setDisplayThis}) {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('User')
        navigate('/')
    }
    return (
        <AppBar position="static" style={{ height: '60px' }}>
            <div style={{padding: '0px 10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 'auto 0px' }}>
                <div>
                    <img href="/" src={logo} style={{width: '120px', cursor: 'pointer'}} />
                </div>
                <div>
                    <Button onClick={() => setDisplayThis({
                            registerStudent: true,
                            registerTherapist: false,
                            students: false,
                            therapists: false
                        })} color='inherit'>Register Student</Button>
                        <Button onClick={() => setDisplayThis({
                            registerStudent: false,
                            registerTherapist: true,
                            students: false,
                            therapists: false
                        })} color='inherit'>Register Therapist</Button>
                        <Button onClick={() => setDisplayThis({
                            registerStudent: false,
                            registerTherapist: false,
                            students: true,
                            therapists: false
                        })} color='inherit'>All Students</Button>
                        <Button onClick={() => setDisplayThis({
                            registerStudent: false,
                            registerTherapist: false,
                            students: false,
                            therapists: true
                        })} color='inherit'>All Therapists</Button>
                    <Button onClick={logout} color='inherit' style={{fontWeight: '900'}}>Logout</Button>
                </div>
            </div>
        </AppBar>
    )
}