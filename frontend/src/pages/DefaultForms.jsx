import React from 'react'
import Navbar from './CommonNavbar'
import { useNavigate } from 'react-router'
import { Typography, Grid, Card, CardContent, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';

function DefaultForms() {
    const navigate = useNavigate();
    const { assessment } = useParams()
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
        getForms()
    }, [])
    const getForms = async () => {
        const serverRes = await fetch("http://localhost:8000/get-default-forms", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: localStorage.getItem("User"),
                stage_name: assessment.split(";")[0],
                assess_name: assessment.split(";")[1],
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json()
            setFormsArr(serverResJson.used)
            setUnAssignedForms(serverResJson.unused)
        }
    }

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

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false)
        setNewForm(false)
    }

    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        console.log(newChecked)
        setChecked(newChecked)
    };

    const [newForm, setNewForm] = React.useState(false)
    const [formsArr, setFormsArr] = React.useState([])
    const [unAssignedForms, setUnAssignedForms] = React.useState(['form1'])

    const deleteForm = async (form) => {
        const serverRes = await fetch("http://localhost:8000/delete-default-map", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: localStorage.getItem("User"),
                stage_name: assessment.split(";")[0],
                assess_name: assessment.split(";")[1],
                form_id: form
            })
        })

        if (serverRes.status === 200) {
            window.location.reload(false)
        }
    }
    const assignForm = async () => {
        const serverRes = await fetch("http://localhost:8000/add-default-map", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: localStorage.getItem("User"),
                stage_name: assessment.split(";")[0],
                assess_name: assessment.split(";")[1],
                forms: checked
            })
        })

        if (serverRes.status === 200) {
            setChecked([])
            setOpen(false)
            window.location.reload(false)
        }
    }

    return (
        <div>
            {console.log(formsArr)}
            <Navbar pageTitle="Forms" />
            <Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
                {formsArr.map((form) => (
                    <Grid item md={4} xl={3} xs={12} sm={6} key={form.FORM_ID}>
                        <Card variant="outlined">
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', flexDirection: 'column', gap: '20px' }}>
                                <Typography variant='h4' align="center">{form.FORM_NAME}</Typography>
                                <IconButton onClick={() => { deleteForm(form.FORM_ID) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>

                        </Card>
                    </Grid>
                ))}

                {/* Add a new stage tile here */}

                {!newForm &&
                    <Grid item md={4} xl={3} xs={12} sm={6}>
                        <Card variant="outlined" onClick={() => {
                            // setNewForm(true)
                            setOpen(true)
                        }}>
                            {/* <Card variant="outlined" sx={tileAnimation}> */}
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120px' }}>
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
                                {unAssignedForms.map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem
                                            key={value.FORM_ID}
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(value.FORM_ID)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value.FORM_ID) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={value.FORM_NAME} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px' }}>
                                <Button variant='outlined' onClick={assignForm}>Add</Button>
                                <Button variant='outlined' color='error' onClick={() => { setOpen(false) }}>Cancel</Button>
                            </Box>
                        </Box>
                    </Modal>
                }

            </Grid>
        </div>
    )
}

export default DefaultForms