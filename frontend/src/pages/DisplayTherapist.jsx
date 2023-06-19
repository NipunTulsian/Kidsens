import React, { useState } from 'react'
import { FixedSizeList } from 'react-window';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from 'react-router'
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function DisplayTherapist(props) {
    function searchFunctionTherapist() {
        let copy = [...props.arr];
        if (props.search !== "") {
            copy = copy.filter((item) => {
                return ((item.fname + " " + item.lname).toLowerCase()).includes((props.search).toLowerCase())
            })
        }
        setallTherapists(copy);
    }

    const [allTherapists, setallTherapists] = useState(props.arr);
    const navigate = useNavigate()

    const DeleteTherapist = async (email) => {
        let data = {
            email: email
        }
        const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/deleteTherapist`, {
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

    function renderTherapistsRow(props) {
        const { index, style } = props;
        return (
            <ListItem style={{ ...style, padding: '25px 20px' }} key={index} component="div" disablePadding>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                    <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <ListItemText primary={allTherapists[index].fname + " " + allTherapists[index].lname} />
                        {/* <ListItemText primary={`${allTherapists[index].c_fname} ${allTherapists[index].c_lname}`} /> */}
                        <Button variant="outlined" onClick={() => navigate(`/ProfilePageTherapist/${allTherapists[index].EMP_ID}`)}>Profile</Button>
                        <Button variant="text" onClick={() => { DeleteTherapist(allTherapists[index].Email) }}>
                            <DeleteIcon style={{ cursor: 'pointer' }} color="error" />
                        </Button>
                        {/* <Button variant="text">Edit</Button> */}
                    </Box>
                    <Divider style={{ margin: '5px 0' }} />
                </Box>
            </ListItem>
        );
    }

    useEffect(() => {
        console.log(props.arr)
        searchFunctionTherapist();
    }, [props.search]);

    return (
        <div>
            <Typography align='center' margin={1} variant='h4'>All therapists</Typography>
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
                    itemCount={allTherapists.length}
                    overscanCount={5}
                >
                    {renderTherapistsRow}
                </FixedSizeList>
            </Box>
        </div>
    )
}
