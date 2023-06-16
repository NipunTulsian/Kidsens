import React from 'react'
import Navbar from './CommonNavbar'
import { useNavigate } from 'react-router'
import { Typography, Grid, Card, CardContent, Button, Box, } from '@mui/material';
import { useParams } from 'react-router';

function FormsPageStudentView() {
    const navigate = useNavigate();
    let { id } = useParams()
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
        getForms()
    }, [])
    const getForms = async () => {
        const serverRes = await fetch("http://localhost:8000/user/get-fill", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: localStorage.getItem("User"),
                stage_name: id.split(";")[1],
                assess_name: id.split(";")[2]
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json()
            console.log(hi)
            console.log(serverResJson.checked)
            setChecked(serverResJson.checked)
            setUnfilled(serverResJson.unfilled)
            setNotChecked(serverResJson.filled)
        }
    }

    // fetch forms which have been scored by therapist

    const [hi, setHi] = React.useState("hello")

    const [checked, setChecked] = React.useState([
    ]);

    // fetch forms which have been filled by student but not scored by therapist
    const [notChecked, setNotChecked] = React.useState([
    ])

    //fetch forms which haven't been filled by student

    const [unfilled, setUnfilled] = React.useState([
    ])

    return (
        <div>
            <Navbar pageTitle="Forms" />
            {checked.length ?
                <Box>
                    <Typography variant='h3' style={{ textAlign: 'center' }}> Scored Forms </Typography>
                    <br />
                    <br />
                    <Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
                        {checked.map((form) => (
                            <Grid item md={4} xl={3} xs={12} sm={6} key={form.FORM_ID}>
                                <Card variant="outlined" >
                                    <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', flexDirection: 'column', gap: '20px' }}>
                                        <Typography variant='h6' align="center">{form.FORM_NAME}</Typography>
                                        <Box>
                                            <Button variant='outlined' onClick={() => window.location.href = `/viewPDF?id=${form.FORM_ID}`}>View Report</Button>
                                        </Box>
                                    </CardContent>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <br />
                    <br />
                </Box> : null}
            {notChecked.length ?
                <Box>
                    <Typography variant='h3' style={{ textAlign: 'center' }}> Unchecked Forms </Typography>
                    <br />
                    <br />
                    <Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
                        {notChecked.map((form) => (
                            <Grid item md={4} xl={3} xs={12} sm={6} key={form.FORM_ID}>
                                <Card variant="outlined" >
                                    {/* <Typography variant="body2" style={{ textAlign: 'right' }}>Not Marked</Typography> */}
                                    <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', flexDirection: 'column', gap: '20px' }}>
                                        <Typography variant='h6' align="center">{form.FORM_NAME}</Typography>
                                        <Box>
                                            <Button variant='outlined' disabled>View Report</Button>
                                        </Box>
                                    </CardContent>

                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                    <br />
                    <br />
                </Box> : null}
            {unfilled.length ?
                <Box>
                    <Typography variant='h3' style={{ textAlign: 'center' }}> Pending Forms </Typography>
                    <br />
                    <br />
                    <Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
                        {unfilled.map((form) => (
                            <Grid item md={4} xl={3} xs={12} sm={6} key={form.FORM_ID}>
                                <Card variant="outlined" >
                                    <Typography variant="body2" style={{ textAlign: 'right' }}>Not Attempted</Typography>
                                    <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', flexDirection: 'column', gap: '20px' }}>
                                        <Typography variant='h6' align="center">{form.FORM_NAME}</Typography>
                                        <Box>
                                            {/* this button */}
                                            <Button variant='outlined' onClick={() => window.location.href = '/formSubmit.html?id=' + `${form.FORM_ID}`}>Fill Form</Button>
                                        </Box>
                                    </CardContent>

                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Box> : null}
        </div>
    )
}

export default FormsPageStudentView