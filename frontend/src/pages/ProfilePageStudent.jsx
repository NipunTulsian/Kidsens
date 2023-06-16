import React from 'react';
import Navbar from './CommonNavbar'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function ProfilePageStudent() {
    const { id } = useParams();
    const [student, setStudent] = useState({
        username: "",
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
        student_Id: null,
        c_fname: null,
        c_lname: null,
    });

    const getStudent = async () => {
        const serverRes = await fetch("http://localhost:8000/parent/StudentProfile", {
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
            console.log(serverResJson)
            setStudent({
                student_Id: serverResJson.student_Id,
                c_fname: serverResJson.c_fname,
                c_lname: serverResJson.c_lname,
                image: serverResJson.c_img ? "http://localhost:8000" + serverResJson.c_img.replace("../uploads", "") : null,
                username: serverResJson.username ? serverResJson.username : "",
                p_fname: serverResJson.p_fname ? serverResJson.p_fname : "",
                p_lname: serverResJson.p_lname ? serverResJson.p_lname : "",
                p_Address: serverResJson.p_Address ? serverResJson.p_Address : "",
                c_DOB: serverResJson.c_DOB ? serverResJson.c_DOB : "",
                c_gender: serverResJson.c_gender ? serverResJson.c_gender : "",
                Diagnosis: serverResJson.Diagnosis ? serverResJson.Diagnosis : "",
                identification: serverResJson.identification ? "http://localhost:8000" + serverResJson.identification.replace("../uploads", "") : null,
                reports: serverResJson.reports ? "http://localhost:8000" + serverResJson.reports.replace("../uploads", "") : null,
            })
        }
    }

    useEffect(() => {
        getStudent()
    }, []);

    return (
        <div>
            <Navbar pageTitle="Student Profile" />
            <Typography align='center' margin={3} variant='h3'>Details Of,{student ? " " + student.c_fname + " " + student.c_lname + " " : null}</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {student.image ? <img src={student.image} alt="profile" style={{ display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "50%", width: "125px", height: "125px" }} /> : null}
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Username"
                    value={student.username}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "black"
                        }
                    }}
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Date Of Birth"
                    value={student.c_DOB}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "black"
                        }
                    }}
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Gender"
                    value={student.c_gender}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "black"
                        }
                    }}
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Parent"
                    value={student.p_fname + " " + student.p_lname}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "black"
                        }
                    }}
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Address"
                    value={student.p_Address}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "black"
                        }
                    }}
                ></TextField>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Diagnosis"
                    value={student.Diagnosis}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "black"
                        }
                    }}
                ></TextField>
                <Typography align='center' style={{ marginTop: "15px", color: "black", fontSize: "15px" }}>Identification</Typography>
                {student.identification ? <iframe src={student.identification} title="identification" width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "30px" }}>
                </iframe> : null}
                <Typography align='center' style={{ marginTop: "15px", color: "black" }}>Reports</Typography>
                {student.reports ? <iframe src={student.reports} title="reports" width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto" }}>
                </iframe> : null}
            </div>
        </div>
    )
}
