import React from 'react';
import Navbar from './CommonNavbar'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { get } from 'jquery';

export default function ProfilePageTherapist() {
    const { id } = useParams();
    const [therapist, setTherapist] = React.useState({
        username: "",
        password: "",
        speciality: "",
        Address: "",
        id: "",
        image: null,
        Identity: null,
        Certification: null,
        Resume: null,
        fname: "",
        lname: "",
    })

    const getStudent = async () => {
        const serverRes = await fetch("http://localhost:8000/get-therapist-profile", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: id,
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json();
            setTherapist({
                fname: serverResJson.fname,
                lname: serverResJson.lname,
                id: serverResJson.EMP_ID,
                username: serverResJson.username,
                speciality: serverResJson.speciality,
                Address: serverResJson.Address,
                phonte: serverResJson.phone,
                image: "http://localhost:8000" + serverResJson.image.replace("../uploads", ""),
                Identity: "http://localhost:8000" + serverResJson.Identity.replace("../uploads", ""),
                Certification: "http://localhost:8000" + serverResJson.Certificate.replace("../uploads", ""),
                Resume: "http://localhost:8000" + serverResJson.Resume.replace("../uploads", ""),
            })
        }
    }

    useEffect(() => {
        getStudent()
    }, []);

    return (
        <div>
            <Navbar pageTitle="Therapist Profile" />
            <Typography align='center' margin={3} variant='h3'>Details Of,{therapist ? " " + therapist.fname + " " + therapist.lname + " " : null}</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {therapist ? <img src={therapist.image} style={{ display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "50%", width: "125px", height: "125px" }} /> : null}
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Username"
                    value={therapist.username}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "#2196F3"
                        }
                    }}
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Speciality"
                    value={therapist.speciality}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "#2196F3"
                        }
                    }}
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Address"
                    value={therapist.Address}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "#2196F3"
                        }
                    }}
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="id"
                    value={therapist.id}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "#2196F3"
                        }
                    }}
                ></TextField>
                <Typography align='center' style={{ marginTop: "15px", marginBottom: "5px", color: "#2196F3", fontSize: "15px" }}>Identification</Typography>
                <iframe src={therapist.Identity} width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "30px" }}>
                </iframe>
                <Typography align='center' style={{ marginTop: "15px", marginBottom: "5px", color: "#2196F3" }}>Certification</Typography>
                <iframe src={therapist.Certification} width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto" }}>
                </iframe>
                <Typography align='center' style={{ marginTop: "15px", marginBottom: "5px", color: "#2196F3" }}>Resume</Typography>
                <iframe src={therapist.Resume} width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto" }}>
                </iframe>
            </div>

        </div>
    )
}
