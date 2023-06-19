import React from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function RegisterTherapist() {

    const [therapistData, setTherapistData] = React.useState({
        fname: "",
        lname: "",
        Email: "",
        Phone: "",
        admin:localStorage.getItem("User")
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
        // navigate('/adminPage')
        const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/auth/therapistRegister`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify(therapistData),
        })

        if (serverRes.status === 200) {
            setTherapistData({
                fname: "",
                lname: "",
                Phone: "",
                Email: "",
                admin:localStorage.getItem("User")
            })
            alert("Registered Successfully")
            window.location.reload(false)
        }
    }


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography align="center" style={{ width: "50%", margin: "10px auto" }} variant="h2" component="h1">
                Register Therapist
            </Typography>
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="First Name"
                name="fname"
                onChange={handleChange}
                value={therapistData.fname}
                required
            ></TextField>
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="Last Name"
                name="lname"
                onChange={handleChange}
                value={therapistData.lname}
                required
            ></TextField>
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="Email"
                name="Email"
                onChange={handleChange}
                value={therapistData.Email}
                required
            ></TextField>
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="Phone Number"
                name="Phone"
                onChange={handleChange}
                value={therapistData.Phone}
                required
            ></TextField>
            <Button 
                style={{ width: "30%", margin: "10px auto" }} 
                variant="contained" 
                onClick={handleSubmit}>
                Register
            </Button>

        </div>
    )
}

export default RegisterTherapist