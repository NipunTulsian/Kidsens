import React, { useState } from 'react'
import Navbar from './CommonNavbar'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Typography, Grid, Card, CardContent, CardActions, Button, TextField, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import AddIcon from '@mui/icons-material/Add';
function DefaultAssessments() {
    const navigate = useNavigate();
    const { stage } = useParams()
    let id =1
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
        getAssess()
    }, [])

    const [newAssessment, setNewAssessment] = React.useState(false)
    const [assessmentsArr, setAssessmentsArr] = React.useState([])
    const [newAssessmentValue, setNewAssessmentValue] = React.useState('')
    const [severeUp,setSevereUp] = React.useState('')
    const [MildUp,setMildUp] = React.useState('')
    const [severeMessage,setSevMess] =useState('')
    const [moderateMessage,setModerateMess] =useState('')
    const [mildMessage,setMildMess] =useState('')
    const [severeRec,setSevRec] =useState('')
    const [moderateRec,setModerateRec] =useState('')
    const [mildRec,setMildRec] =useState('')
    const onNewAssessmentValueChange = (e) => {
        setNewAssessmentValue(e.target.value)
    }
    const SevereUpChange = (e) => {
        setSevereUp(e.target.value)
    }
    const MildUpChange = (e) => {
        setMildUp(e.target.value)
    }
    const SevMess = (e) => {
        setSevMess(e.target.value)
    }
    const ModerateMess = (e) => {
        setModerateMess(e.target.value)
    }
    const MildMess = (e) => {
        setMildMess(e.target.value)
    }
    const SevRec = (e) => {
        setSevRec(e.target.value)
    }
    const ModerateRec = (e) => {
        setModerateRec(e.target.value)
    }
    const MildRec = (e) => {
        setMildRec(e.target.value)
    }
    const getAssess = async () => {
        const serverRes = await fetch("http://localhost:8000/get-default-assessments", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: localStorage.getItem("User"),
                stage: stage
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json()
            setAssessmentsArr(serverResJson.assessment)
        }
    }

    const createNewAssessment = async () => {
        let data = {
            id: localStorage.getItem("User"),
            stage_name: stage,
            assess_name: newAssessmentValue,
            sevUp:severeUp,
            mildUp: MildUp,
            message_severe:severeMessage,
            message_moderate:moderateMessage,
            message_mild:mildMessage,
            rec_severe:severeRec,
            rec_moderate:moderateRec,
            rec_mild:mildRec,
        }
        const serverRes = await fetch("http://localhost:8000/create-default-assessment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify(data)
        })

        if (serverRes.status === 200) {
            alert("Assessment Added Successfully")
            setAssessmentsArr([...assessmentsArr, newAssessmentValue])
            setNewAssessment(false)
            setNewAssessmentValue('')
            window.location.reload(false)
        }
    }
    const DeleteAssess = async (assessment, e) => {
        e.preventDefault()
        let data = {
            id: localStorage.getItem("User"),
            stage_name: stage,
            assess_name: assessment
        }
        const serverRes = await fetch("http://localhost:8000/delete-default-assessment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify(data)
        })

        if (serverRes.status === 200) {
            alert("Assessment Removed Successfully")
            setAssessmentsArr([...assessmentsArr, newAssessmentValue])
            setNewAssessment(false)
            setNewAssessmentValue('')
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
                                <IconButton style={{ position: 'absolute', top: '0%', left: '90%' }} onClick={(e) => { DeleteAssess(assessment, e) }}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton style={{ position: 'absolute', top: '0%', left: '80%' }}  onClick={() => navigate(`/DefaultForms/${stage};${assessment}`)}>
                                    <OpenInBrowserIcon />
                                </IconButton>
                                <Typography variant='h4' align="center">{assessment}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Add a new assessment tile here */}

                {!newAssessment &&
                    <Grid item md={4} xl={3} xs={12} sm={6}>
                        <Card variant="outlined" onClick={() => setNewAssessment(true)}>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <AddIcon style={{ fontSize: '50px' }} />
                            </CardContent>
                        </Card>
                    </Grid>}

                {newAssessment &&
                    <Grid item md={4} xl={4} xs={12} sm={6}>
                        <Card variant="outlined" style={{ backgroundColor: '#F0F0F0' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '260px' }}>
                                <CardActions style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                    <TextField variant='standard' label='Assessment Name' sx={{width:300}} onChange={onNewAssessmentValueChange} value={newAssessmentValue}></TextField>
                                    <TextField variant='standard' label='Upper Limit of Severe' sx={{width:300}} onChange={SevereUpChange} value={severeUp}></TextField>
                                    <TextField variant='standard' label='Upper Limit of Moderate' sx={{width:300}} onChange={MildUpChange} value={MildUp}></TextField>
                                    <TextField variant='standard' label='Message for Severe' sx={{width:300}} onChange={SevMess} value={severeMessage}></TextField>
                                    <TextField variant='standard' label='Message for Moderate' sx={{width:300}} onChange={ModerateMess} value={moderateMessage}></TextField>
                                    <TextField variant='standard' label='Message for Mild' sx={{width:300}}  onChange={MildMess} value={mildMessage}></TextField>
                                    <TextField variant='standard' label='Severe Recommendations' sx={{width:300}} placeholder='enter ; seperated values' onChange={SevRec} value={severeRec}></TextField>
                                    <TextField variant='standard' label='Moderate Recommendations' sx={{width:300}} placeholder='enter ; seperated values' onChange={ModerateRec} value={moderateRec}></TextField>
                                    <TextField variant='standard' label='Mild Recommendations' sx={{width:300}} placeholder='enter ; seperated values' onChange={MildRec} value={mildRec}></TextField>
                                    <Box style={{ display: 'flex', gap: '10px' }}>
                                        <Button variant='contained' onClick={() => createNewAssessment()}>Create</Button>
                                        <Button variant='contained' onClick={() => setNewAssessment(false)}>Cancel</Button>
                                    </Box>
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>}

            </Grid>
        </div>
    )
}

export default DefaultAssessments