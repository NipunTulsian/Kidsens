import React, { useState } from 'react'
import Navbar from './CommonNavbar'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Typography, Grid, Card, CardContent, IconButton } from '@mui/material';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

export default function AssessmentPageStudentView() {
    let { id } = useParams()
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
        getAssess()
    }, [])

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
    const getAssess = async () => {
        const serverRes = await fetch("http://localhost:8000/user/get-assessments", {
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

    return (
        <div>
            <Navbar pageTitle="Assessments" />
            <Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
                {assessmentsArr.map((assessment, assessmentIdx) => (
                    <Grid item md={4} xl={3} xs={12} sm={6} key={assessmentIdx}>
                        <Card variant="outlined" style={{ position: 'relative' }}>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <IconButton style={{ position: 'absolute', top: '0%', left: '90%' }}  onClick={() => navigate(`/FormsPageStudentView/${id}`+";"+`${assessment}`)}>
                                    <OpenInBrowserIcon />
                                </IconButton>
                                <Typography variant='h4' align="center">{assessment}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}