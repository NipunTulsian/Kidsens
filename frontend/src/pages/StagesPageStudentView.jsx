import React from 'react'
import Navbar from './CommonNavbar'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import Draggable from 'react-draggable'
import { Typography, Grid, Card, CardContent, CardActions, Button, TextField, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import AddIcon from '@mui/icons-material/Add';

export default function StagesPageStudentView() {
    const navigate = useNavigate();
    const { id } = useParams()
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
        getStages();
    }, [])

    //fetch stages of student
    const getStages = async () => {
        const serverRes = await fetch("http://localhost:8000/get-stages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: id
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json()
            setStagesArr(serverResJson.stages)
        }
    }

    const [stagesArr, setStagesArr] = React.useState([]) // stages array always contains the default stages --> do the backend for this
    const [newStageValue, setNewStageValue] = React.useState({ stageName: '', stagePosition: '' })

    const onNewStageValueChange = (e) => {
        setNewStageValue({ ...newStageValue, [e.target.id]: e.target.value })
    }

    return (
        <div>
            <Navbar pageTitle="Stages" />
            <Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
                {stagesArr.map((stage) => (
                    <Grid item md={4} xl={3} xs={12} sm={6} key={Math.random()}>
                        {/* <Draggable> */}
                        <Card variant="outlined" style={{ position: 'relative' }}>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <Typography variant='h4' align="center">{stage}</Typography>
                                <IconButton style={{ position: 'absolute', top: '0%', left: '90%' }} onClick={() => navigate(`/AssessmentPageStudentView/${id}` + ";" + `${stage}`)}>
                                    <OpenInBrowserIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}