import React from 'react'
import Navbar from './CommonNavbar'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import Draggable from 'react-draggable'
import { Typography, Grid, Card, CardContent, CardActions, Button, TextField, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import AddIcon from '@mui/icons-material/Add';

function DefaultStages() {
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
        getStages()
    }, [])
    const getStages = async () => {
        const serverRes = await fetch("http://localhost:8000/get-default-stages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: localStorage.getItem("User")
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json()
            setStagesArr(serverResJson.stages)
        }
    }

    const [newStage, setNewStage] = React.useState(false)
    const [stagesArr, setStagesArr] = React.useState([])
    const [newStageValue, setNewStageValue] = React.useState({ stageName: '', stagePosition: '' })

    const onNewStageValueChange = (e) => {
        setNewStageValue({ ...newStageValue, [e.target.id]: e.target.value })
    }
    const createNewStage = async () => {
        let data = {
            id: localStorage.getItem("User"),
            stage_name: newStageValue.stageName,
            position: newStageValue.stagePosition
        }
        const serverRes = await fetch("http://localhost:8000/create-stage", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify(data)
        })

        if (serverRes.status === 200) {
            alert("Stage Added Successfully")
            setStagesArr([...stagesArr, newStageValue.stageName])
            setNewStage(false)
            setNewStageValue('')
            window.location.reload(false)
        }
    }

    const DeleteStage = async (stage, e) => {
        e.preventDefault()
        let data = {
            id: localStorage.getItem("User"),
            stage_name: stage
        }
        const serverRes = await fetch("http://localhost:8000/delete-stage", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify(data)
        })

        if (serverRes.status === 200) {
            alert("Stage Removed Successfully")
            setStagesArr([...stagesArr, newStageValue.stageName])
            setNewStage(false)
            setNewStageValue('')
            window.location.reload(false)
        }
    }
    return (
        <div>
            <Navbar pageTitle="Stages" />
            <Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
                {stagesArr.map((stage) => (
                    <Grid item md={4} xl={3} xs={12} sm={6} key={Math.random() + Math.random()}>
                        {/* <Draggable> */}
                        <Card variant="outlined" style={{ position: 'relative' }}>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <Typography variant='h4' align="center">{stage}</Typography>
                                <IconButton style={{ position: 'absolute', top: '0%', left: '90%' }} onClick={(e) => { DeleteStage(stage, e) }}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton style={{ position: 'absolute', top: '0%', left: '80%' }} onClick={() => navigate(`/DefaultAssessments/${stage}`)}>
                                    <OpenInBrowserIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                        {/* </Draggable> */}
                    </Grid>
                ))}

                {/* Add a new stage tile here */}

                {!newStage &&
                    <Grid item md={4} xl={3} xs={12} sm={6}>
                        <Card variant="outlined" onClick={() => setNewStage(true)}>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <AddIcon style={{ fontSize: '50px' }} />
                            </CardContent>
                        </Card>
                    </Grid>}

                {newStage &&
                    <Grid item md={4} xl={3} xs={12} sm={6}>
                        <Card variant="outlined" style={{ backgroundColor: '#F0F0F0' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '260px' }}>
                                <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                                    <TextField id="stageName" variant='standard' label='Stage Name' onChange={onNewStageValueChange} value={newStageValue.stageName} style={{ marginBottom: '5px' }}></TextField>
                                    <TextField id="stagePosition" variant='standard' label='Position' onChange={onNewStageValueChange} value={newStageValue.stagePosition}>Position</TextField>
                                    <Box style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                                        <Button variant='contained' onClick={() => createNewStage()}>Create</Button>
                                        <Button variant='contained' onClick={() => setNewStage(false)}>Cancel</Button>
                                    </Box>
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>}

            </Grid>
        </div>
    )
}

export default DefaultStages