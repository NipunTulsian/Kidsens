import React from 'react';
import Navbar from './CommonNavbar'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function ProfilePageTherapist() {
    const { id } = useParams();
    const [therapist, setTherapist] = React.useState({
        username: "",
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

    const getTherapist = async () => {
        const serverRes = await fetch("http://localhost:8000/therapist/TherapistProfile", {
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
                id: serverResJson.EMP_ID ? serverResJson.EMP_ID : "",
                username: serverResJson.username ? serverResJson.username : "",
                speciality: serverResJson.speciality ? serverResJson.speciality : "",
                Address: serverResJson.Address ? serverResJson.Address : "",
                image: serverResJson.image ? "http://localhost:8000" + serverResJson.image.replace("../uploads", "") : null,
                Identity: serverResJson.Identity ? "http://localhost:8000" + serverResJson.Identity.replace("../uploads", "") : null,
                Certification: serverResJson.Certificate ? "http://localhost:8000" + serverResJson.Certificate.replace("../uploads", "") : null,
                Resume: serverResJson.Resume ? "http://localhost:8000" + serverResJson.Resume.replace("../uploads", "") : null,
            })
        }
    }

    useEffect(() => {
        getTherapist()
    }, []);

    return (
        <div>
            <Navbar pageTitle="Therapist Profile" />
            <Typography align='center' margin={3} variant='h3'>Details Of,{therapist ? " " + therapist.fname + " " + therapist.lname + " " : null}</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {therapist.image ? <img src={therapist.image} alt="profile" style={{ display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "50%", width: "125px", height: "125px" }} /> : null}
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
                {therapist.Identity ? <iframe src={therapist.Identity} title="identity" width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "30px" }}>
                </iframe> : null}
                <Typography align='center' style={{ marginTop: "15px", marginBottom: "5px", color: "#2196F3" }}>Certification</Typography>
                {therapist.Certification ? <iframe src={therapist.Certification} title="certi" width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto" }}>
                </iframe> : null}
                <Typography align='center' style={{ marginTop: "15px", marginBottom: "5px", color: "#2196F3" }}>Resume</Typography>
                {therapist.Resume ? <iframe src={therapist.Resume} title="resume" width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto" }}>
                </iframe> : null}
            </div>

        </div>
    )
}
