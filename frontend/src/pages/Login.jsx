import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (response.status === 200) {
            const variable = await response.json()
            if (variable.type === "admin") {
                localStorage.setItem("User", variable.token);
                navigate('/adminPage/RegisterStudent')
            }
            else if (variable.type === "parent") {
                localStorage.setItem("User", variable.token);
                if(!variable.flag)
                navigate('/StudentRedirect')
                else
                {
                    navigate("/LandStudent/Profile")
                }
            }
            else {
                localStorage.setItem("User", variable.token);
                if(!variable.flag)
                navigate('/TherapistRedirect')
                else{
                    navigate("/LandTherapy/Profile")
                }
            }
        }
        else {
            window.alert("Wrong Email/Password")
        }
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <img src={logo} style={{ height: '170px', margin: "10px auto" }} />
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
            ></TextField>
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                required
            ></TextField>
            <Button
                style={{ width: "30%", margin: "10px auto" }}
                variant="contained"
                onClick={handleSubmit}>
                Login
            </Button>

        </div>
    );
}

export default Login;
