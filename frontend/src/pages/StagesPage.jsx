import React from 'react'
import Navbar from './CommonNavbar'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { Typography, Grid, Card, CardContent, IconButton } from '@mui/material';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

function StagesPage() {
    const navigate = useNavigate();
    const { id } = useParams()
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
        getStages();
    }, [])
    const getStages = async () => {
        const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/workflow/Stages`, {
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

    // const [newStage, setNewStage] = React.useState(false)
    const [stagesArr, setStagesArr] = React.useState([]) // stages array always contains the default stages --> do the backend for this
    // const [newStageValue, setNewStageValue] = React.useState({ stageName: '', stagePosition: '' })

    // const onNewStageValueChange = (e) => {
    //     setNewStageValue({ ...newStageValue, [e.target.id]: e.target.value })
    // }

    return (
        <div>
            <Navbar pageTitle="Stages" />
            <Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
                {stagesArr.map((stage) => (
                    <Grid item md={4} xl={3} xs={12} sm={6} key={Math.random() + Math.random()}>
                        {/* <Draggable> */}
                        <Card variant="outlined" style={{ position: 'relative' }}>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <Typography variant='h5' align="center">{stage}</Typography>
                                <IconButton style={{ position: 'absolute', top: '0%', left: '90%' }} onClick={() => navigate(`/AssessmentPage/${id}` + ";" + `${stage}`)}>
                                    <OpenInBrowserIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                        {/* </Draggable> */}
                    </Grid>
                ))}

                {/* Add a new stage tile here */}

            </Grid>
        </div>
    )
}

export default StagesPage