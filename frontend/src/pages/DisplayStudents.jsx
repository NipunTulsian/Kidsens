import React, { useState } from 'react'
import { FixedSizeList } from 'react-window';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from 'react-router'
import { useEffect } from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function DisplayStudents(props) {
    function searchFunctionStudent() {
        let copy = [...props.arr];
        if (props.search !== "") {
            copy = copy.filter((item) => {
                return ((item.c_fname + " " + item.c_lname).toLowerCase()).includes(props.search.toLowerCase())
            })
        }
        setallStudents(copy);
    }

    const [allStudent, setallStudents] = useState(props.arr);
    const navigate = useNavigate()

    const DeleteStudent = async (email) => {
        let data = {
            p_email: email
        }
        const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/deleteStudent`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify(data)
        })
        if (serverRes.status === 200) {
            alert("Deleted Successfully")
            window.location.reload(false)
        }
    }

    function renderStudentsRow(propsarg) {
        const { index, style } = propsarg;

        return (<ListItem style={{ ...style, padding: '25px 20px' }} key={index} component="div" disablePadding>
            <Box style={{
                display: 'flex', flexDirection
                    : 'column', justifyContent: 'space-between', width: '100%'
            }}>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <ListItemText primary={allStudent[index].c_fname + " " + allStudent[index].c_lname} />
                    {/* <ListItemText primary={`${allStudents[index].c_fname} ${allStudents[index].c_lname}`} /> */}
                    <Box style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Button variant="outlined" onClick={() => navigate(`/ProfilePageStudent/${allStudent[index].student_Id}`)}>Profile</Button>
                        <Button variant="outlined" onClick={() => navigate(`/StagesPage/${allStudent[index].student_Id}`)}>Manage</Button>
                        <IconButton onClick={() => { DeleteStudent(allStudent[index].p_email) }}>
                            <DeleteIcon style={{ cursor: 'pointer' }} color="error" />
                        </IconButton>
                    </Box>
                    {/* <Button variant="text" color="error" onClick={() => { DeleteStudent(allStudents[index].p_email) }}>Delete</Button> */}
                </Box>
                <Divider style={{ margin: '5px 0' }} />
            </Box>
        </ListItem>
        );
    }

    useEffect(() => {
        searchFunctionStudent();
    }, [props.search]);

    return (
        <div>
            <Typography align='center' margin={1} variant='h4'>All students</Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                    style={{ width: "30%", margin: "10px auto" }}
                    variant="outlined"
                    label="Search Filter"
                    value={props.filter}
                    onChange={props.SearchFunc}
                    InputLabelProps={{
                        style: {
                            fontSize: 18,
                            color: "black"
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                ></TextField>
            </div>
            <Box
                sx={{ padding: '10px', width: '60%', height: 520, bgcolor: 'background.paper', margin: 'auto', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
            >
                <FixedSizeList
                    height={500}
                    itemSize={46}
                    itemCount={allStudent.length}
                    overscanCount={5}
                >
                    {renderStudentsRow}
                </FixedSizeList>
            </Box>
        </div>
    )
}
