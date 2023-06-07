import React, { useState } from 'react'
import Navbar from './CommonNavbar'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Typography, Grid, Card, CardContent, Button, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import AddIcon from '@mui/icons-material/Add';
function AssessmentsPage() {
    let { id } = useParams()
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
        getAssess()
        getDefaultAssess()
    }, [])

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };

    const tileAnimation = {
        cursor: 'pointer',
        backgroundColor: "#F0F0F0",
        color: "black",
        padding: "10px",
        borderRadius: "5px",
        transition: "all 0.3s ease",
        "&:hover": {
            backgroundColor: "#D8D8D8",
            color: "black",
            transform: "scale(1.1)",
        },
        "&:active": {
            backgroundColor: "#B0B0B0",
            transform: "scale(0.9)",
        }
    }

    const [newAssessment, setNewAssessment] = React.useState(false)
    const [unAssignedAssessments, setUnAssignedAssessments] = React.useState([])
    const [assessmentsArr, setAssessmentsArr] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setNewAssessment(false)
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked)
    };

    const getAssess = async () => {
        const serverRes = await fetch("http://localhost:8000/get-assessments", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: id.split(";")[0],
                stage: id.split(";")[1]
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json()
            setAssessmentsArr(serverResJson.assessment)
        }
    }

    const getDefaultAssess = async () => {
        const serverRes = await fetch("http://localhost:8000/get-default-assessments-therapist", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: id.split(";")[0],
                stage: id.split(";")[1]
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json()
            setUnAssignedAssessments(serverResJson.default_assessment)
        }
    }

    const assignAssessment = async () => {
        let data = {
            id: id.split(";")[0],
            stage_name: id.split(";")[1],
            assess_name: checked
        }
        const serverRes = await fetch("http://localhost:8000/add-assessment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify(data)
        })

        if (serverRes.status === 200) {
            alert("Assessment Added Successfully")
            for(let i=0;i<checked.length;i++){
                setAssessmentsArr([...assessmentsArr, checked[i]]);
            }
            setNewAssessment(false)
            window.location.reload(false)
        }
    }

    const DeleteAssess = async (assessment) => {
       
        let data = {
            id: id.split(";")[0],
            stage_name: id.split(";")[1],
            assess_name: assessment
        }
        const serverRes = await fetch("http://localhost:8000/delete-assessment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify(data)
        })

        if (serverRes.status === 200) {
            alert("Assessment Removed Successfully")
            setNewAssessment(false)
            window.location.reload(false)
        }
    }

    return (
        <div>
            <Navbar pageTitle="Assessments" />
            <Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
                {assessmentsArr.map((assessment, assessmentIdx) => (
                    <Grid item md={4} xl={3} xs={12} sm={6} key={assessmentIdx}>
                        <Card variant="outlined" style={{ position: 'relative' }}>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <IconButton style={{ position: 'absolute', top: '0%', left: '90%' }} onClick={()=>{DeleteAssess(assessment)}}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton style={{ position: 'absolute', top: '0%', left: '80%' }}  onClick={() => navigate(`/formspage/${id}`+";"+`${assessment}`)}>
                                    <OpenInBrowserIcon />
                                </IconButton>
                                <Typography variant='h5' align="center">{assessment}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Add a new assessment tile here */}

                {!newAssessment &&
                    <Grid item md={4} xl={3} xs={12} sm={6}>
                        <Card variant="outlined" style={{height: '240px'}} onClick={() => {
                            // setNewForm(true)
                            setOpen(true)
                        }}>
                            {/* <Card variant="outlined" sx={tileAnimation}> */}
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%'}}>
                                <AddIcon style={{ fontSize: '50px' }} />
                            </CardContent>
                        </Card>
                    </Grid>}

                {open &&
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleModal}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper', height: '400px', maxHeight: '400px', overflowY: 'scroll' }}>
                                {unAssignedAssessments.map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem
                                            key={value}
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={value} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                            <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px'}}>
                                <Button variant='outlined' onClick={assignAssessment}>Add</Button>
                                <Button variant='outlined' color='error' onClick={() => {setOpen(false)}}>Cancel</Button>
                            </Box>
                        </Box>
                    </Modal>}

            </Grid>
        </div>
    )
}

export default AssessmentsPage