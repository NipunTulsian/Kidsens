import React from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { each } from 'jquery';
import { useNavigate } from 'react-router';
function RegisterStudent() {
    const [allTherapists, setallTherapists] = React.useState([])
    const [studentData, setStudentData] = React.useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        p_email: "",
        admin: localStorage.getItem("User")
    });

    function handleChange(event) {
        setStudentData((prevStudentData) => {
            return {
                ...prevStudentData,
                [event.target.name]: event.target.value,
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let str=""
        for(let i=0;i<allTherapists.length;i++)
        {
            if(document.getElementById(allTherapists[i].Email).checked)
            {
                if(str=="")
                {
                    str+=allTherapists[i].Email
                }
                else str+=","+allTherapists[i].Email
            }
        }
        const serverRes = await fetch("http://localhost:8000/student-register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                data:studentData,
                therapist:str
            }),
        })

        if (serverRes.status === 200) {
            setStudentData({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                p_email: "",
                admin: localStorage.getItem("User")
            })
            alert("Registered Successfully")
            window.location.reload(false)
        }
    }
    const getTherapist = async () => {
        const serverRes = await fetch("http://localhost:8000/display-therapist", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                admin: localStorage.getItem("User")
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json();
            setallTherapists(serverResJson);
        }
    }
    React.useEffect(() => {
        getTherapist()
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography align="center" style={{ width: "50%", margin: "10px auto" }} variant="h2" component="h1">
                Register Student
            </Typography>
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                value={studentData.firstName}
                required
            ></TextField>
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={studentData.lastName}
                required
            ></TextField>
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                value={studentData.phoneNumber}
                required
            ></TextField>
            <TextField
                style={{ width: "30%", margin: "10px auto" }}
                variant="outlined"
                label="Email"
                name="p_email"
                onChange={handleChange}
                value={studentData.p_email}
                required
            ></TextField>
            <FormControl fullWidth
                style={{ width: "30%", margin: "10px auto" }}>
                <p id="demo-simple-select-label">Assign Therapist</p>
                {allTherapists.map(eachTherapist => {
                    return (
                        <form>
                            <input type="checkbox" id={eachTherapist.Email}/>
                            <label htmlFor={eachTherapist.Email}>{eachTherapist.fname}</label>
                        </form>
                    )
                })}

            </FormControl>
            <Button
                style={{ width: "30%", margin: "10px auto" }}
                variant="contained"
                onClick={handleSubmit}>
                Register
            </Button>

        </div>
    )
}

export default RegisterStudent