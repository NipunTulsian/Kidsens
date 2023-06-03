import React, { useState } from 'react'
import { FixedSizeList } from 'react-window';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from 'react-router'
import { useEffect } from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function DisplayStudentTherapist(props) {

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

    function renderRow(props) {
        const { index, style } = props;

        return (
            <ListItem style={{ ...style, padding: '25px 20px' }} key={index} component="div" disablePadding>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                    <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <ListItemText primary={allStudent[index].c_fname + " " + allStudent[index].c_lname} />
                        <Button style={{marginRight:"10px"}} variant="outlined" onClick={() => navigate(`/ProfilePageStudent/${allStudent[index].student_Id}`)}>Profile</Button>
                        <Button variant="outlined" onClick={() => navigate(`/StagesPage/${allStudent[index].student_Id}`)}>Manage</Button>
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
            <Typography align='center' margin={1} variant='h4'>All the students registered under you</Typography>
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
                sx={{ padding: '10px', width: '70%', height: 520, bgcolor: 'background.paper', margin: 'auto', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
            >
                <FixedSizeList
                    height={500}
                    itemSize={46}
                    itemCount={allStudent.length}
                    overscanCount={5}
                >
                    {renderRow}
                </FixedSizeList>
            </Box>

        </div>
    )
}
