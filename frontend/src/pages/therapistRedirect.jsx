import React from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from './CommonNavbar';
import { useNavigate } from 'react-router';

function TherapistRedirect() {
    const navigate = useNavigate()
    const [therapistData, setTherapistData] = React.useState({
        username: "",
        password: "",
        speciality: "",
        id: "",
        Address: "",
        image: null,
        Identity: null,
        Certification: null,
        Resume: null,
        Email: localStorage.getItem("User")
    });

    function handleChange(event) {
        setTherapistData((prevTherapistData) => {
            return {
                ...prevTherapistData,
                [event.target.name]: event.target.value,
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let form = new FormData()
        form.append("username", therapistData.username)
        form.append("password", therapistData.password)
        form.append("speciality", therapistData.speciality)
        form.append("id", therapistData.id)
        form.append("Address", therapistData.Address)
        form.append("image", document.getElementById("image").files[0])
        form.append("Identity", document.getElementById("iden").files[0])
        form.append("Certification", document.getElementById("cert").files[0])
        form.append("Resume", document.getElementById("res").files[0])
        form.append("Email", therapistData.Email)
        // navigate('/adminPage')
        const serverRes = await fetch("http://localhost:8000/auth/fillTherapist", {
            method: "POST",
            body: form,
        })

        if (serverRes.status === 200) {
            setTherapistData({
                username: "",
                password: "",
                speciality: "",
                Address: "",
                id: "",
                image: null,
                Identity: null,
                Certification: null,
                Resume: null,
                Email: localStorage.getItem("User")
            })
            alert("Successfully Updated")
            localStorage.removeItem("User")
            window.location.reload(false)
        }
        else if (serverRes.status === 400) {
            alert("Username already in use")
        }
    }

    React.useEffect(() => {
        if(!localStorage.getItem("User"))
        {
            navigate("/")
        }
    }, [])
    return (
        <>
            <Navbar />
            <div style={{  display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography align="center" style={{ width: "50%", margin: "10px auto" }} variant="h2" component="h1">
                    Register Therapist
                </Typography>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    value={therapistData.username}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    value={therapistData.password}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Employee ID"
                    name="id"
                    onChange={handleChange}
                    value={therapistData.id}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Speciality"
                    name="speciality"
                    onChange={handleChange}
                    value={therapistData.speciality}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Address"
                    name="Address"
                    onChange={handleChange}
                    value={therapistData.Address}
                    required
                ></TextField>
                <Typography align="center">
                    Photo
                </Typography>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    // label="Child's Picture"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    value={therapistData.image}
                    type="file"
                    accept=".jpeg,.png,.jpg"
                    required
                ></TextField>
                <Typography align="center">
                    Identity
                </Typography>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    id="iden"
                    name="Identity"
                    onChange={handleChange}
                    value={therapistData.Identity}
                    type="file"
                    accept=".pdf,.docx"
                    required
                ></TextField>
                <Typography align="center">
                    Certification
                </Typography>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    id="cert"
                    name="Certification"
                    onChange={handleChange}
                    value={therapistData.Certification}
                    type="file"
                    accept=".pdf,.docx"
                    required
                ></TextField>
                <Typography align="center">
                    Resume
                </Typography>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    name="Resume"
                    id="res"
                    onChange={handleChange}
                    value={therapistData.Resume}
                    type="file"
                    accept=".pdf,.docx"
                    required
                ></TextField>
                <Button
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="contained"
                    onClick={handleSubmit}>
                    Register
                </Button>

            </div>
        </>
    )
}

export default TherapistRedirect