import React from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Password } from '@mui/icons-material';
import Navbar from './CommonNavbar';
import { useNavigate } from 'react-router';

function StudentRedirect() {
    const navigate= useNavigate()
    const [studentData, setStudentData] = React.useState({
        username: "",
        password: "",
        p_fname: "",
        p_lname: "",
        p_Address: "",
        c_DOB: "",
        image: null,
        c_gender: "",
        Diagnosis: "",
        identification: null,
        reports: null,
        c_ROLL_NUMBER: "",
        p_email: localStorage.getItem("User"),
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
        // navigate('/adminPage')
        const data = new FormData();
        data.append("username", studentData.username);
        data.append("password", studentData.password);
        data.append("p_fname", studentData.p_fname);
        data.append("p_lname", studentData.p_lname);
        data.append("p_Address", studentData.p_Address);
        data.append("c_DOB", studentData.c_DOB);
        data.append("image", document.getElementById("image").files[0]);
        data.append("c_gender", studentData.c_gender);
        data.append("Diagnosis", studentData.Diagnosis);
        data.append("identification", document.getElementById("iden").files[0]);
        data.append("reports", document.getElementById("rep").files[0]);
        data.append("c_ROLL_NUMBER", studentData.c_ROLL_NUMBER);
        data.append("p_email", studentData.p_email);

        const serverRes = await fetch("http://localhost:8000/auth/fillStudent", {
            method: "POST",
            body: data,
        })

        if (serverRes.status === 200) {
            setStudentData({
                username: "",
                password: "",
                p_fname: "",
                p_lname: "",
                p_Address: "",
                c_DOB: "",
                image: null,
                c_gender: "",
                Diagnosis: "",
                identification: null,
                reports: null,
                c_ROLL_NUMBER: "",
                p_email: localStorage.getItem("User"),
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography align="center" style={{ width: "50%", margin: "10px auto" }} variant="h2" component="h1">
                    Register Student
                </Typography>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    value={studentData.username}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={studentData.password}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Parent First Name"
                    name="p_fname"
                    onChange={handleChange}
                    value={studentData.p_fname}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Parent Last Name"
                    name="p_lname"
                    onChange={handleChange}
                    value={studentData.p_lname}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Address"
                    name="p_Address"
                    onChange={handleChange}
                    value={studentData.p_Address}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Child's Roll Number"
                    name="c_ROLL_NUMBER"
                    onChange={handleChange}
                    value={studentData.c_ROLL_NUMBER}
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Gender"
                    name="c_gender"
                    onChange={handleChange}
                    value={studentData.c_gender}
                    required
                ></TextField>
                <Typography align='center'>Date of Birth</Typography>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    // label="Date of Birth"
                    name="c_DOB"
                    onChange={handleChange}
                    value={studentData.c_DOB}
                    type="date"
                    required
                ></TextField>
                <Typography align='center'>Child's Picture</Typography>
                <TextField
                    enctype="multipart/form-data"
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    id="image"
                    // label="Child's Picture"
                    name="image"
                    onChange={handleChange}
                    value={studentData.image}
                    type="file"
                    accept=".jpeg,.png,.jpg"
                    required
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Diagnosis"
                    name="Diagnosis"
                    onChange={handleChange}
                    value={studentData.Diagnosis}
                    required
                ></TextField>
                <Typography align='center'>Identification</Typography>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    id="iden"
                    name="identification"
                    onChange={handleChange}
                    value={studentData.identification}
                    type="file"
                    accept=".pdf,.docx"
                    required
                ></TextField>
                <Typography align='center'>Previous Reports</Typography>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    id="rep"
                    name="reports"
                    onChange={handleChange}
                    value={studentData.reports}
                    type="file"
                    accept=".pdf,.docx"
                // required
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

export default StudentRedirect