import * as React from "react";
import { Component, createRef } from 'react'
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import { FixedSizeList } from 'react-window';
import { useNavigate } from 'react-router'
import logo from '../logo.png'
import BoyIcon from '@mui/icons-material/Boy';
import GroupsIcon from '@mui/icons-material/Groups';
import MedicationIcon from '@mui/icons-material/Medication';
import RegisterStudent from './RegisterStudent';
import RegisterTherapist from './RegisterTherapist';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SchemaIcon from '@mui/icons-material/Schema';
import $ from "jquery";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const drawerWidth = 270;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const formData = [
];

const options = {
    disabledActionButtons: ['data', 'save', 'clear'],
    disableFields: ['autocomplete', 'button', 'hidden', 'number', 'textarea'],
    disabledAttrs: ['access', 'className', 'name'],
    editOnAdd: true,
    typeUserAttrs: {
        text: {
            Marks: {
                label: 'Marks',
                type: 'number',
                value: '0',
                style: 'border: 3px solid red'
            },
        },
        date: {
            Marks: {
                label: 'Marks',
                type: 'number',
                value: '0',
                style: 'border: 3px solid red'
            }
        },
        file: {
            Marks: {
                label: 'Marks',
                type: 'number',
                value: '0',
                style: 'border: 3px solid red'
            }
        },

        select: {
            Marks: {
                label: 'Marks',
                type: 'number',
                value: '0',
                style: 'border: 3px solid red'
            }
        },
    }
}
options.typeUserAttrs['checkbox-group'] = {
    Marks: {
        label: 'Marks',
        type: 'number',
        value: '0',
        style: 'border: 3px solid red'
    }
}
options.typeUserAttrs['radio-group'] = {
    Marks: {
        label: 'Marks',
        type: 'number',
        value: '0',
        style: 'border: 3px solid red'
    }
}
const SaveForm = async (a) => {
    console.log(a)
    const serverRes = await fetch("http://localhost:8000/save-form", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
        },
        body: JSON.stringify({
            form_obj: a,
            sender_type: "admin",
            sender_id: localStorage.getItem("User")
        })
    })

    if (serverRes.status === 200) {
        const serverResJson = await serverRes.json();
        window.alert("From Saved")
        window.location.reload(false)
    }
}
class FormBuilder extends Component {
    fb = createRef();
    // testing = createRef();
    componentDidMount() {
        console.log(this.fb.current)
        // console.log(this.testing.current)
        this.formBuilder = $(this.fb.current).formBuilder({ formData, ...options });
        // this.formRender = $(this.testing.current).formRender( {formData} )
    }

    render() {
        return (
            <>
                <div id="fb-editor" ref={this.fb}></div>
                <div id="render-wrap" ref={this.testing}></div>
                <Button variant="contained" id="saveData" onClick={() => {
                    SaveForm(JSON.stringify(this.formBuilder.actions.save()))
                }}>Save Form</Button>
            </>
        )
    }
}

export default function AdminPage() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [allStudents, setallStudents] = React.useState([])
    const [allTherapists, setallTherapists] = React.useState([])
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
    }, [])

    function logout() {
        localStorage.removeItem('User')
        navigate('/')
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [displayThis, setDisplayThis] = React.useState('Register Student')

    function registerStudent() {
        navigate('/registerStudent')
    }

    function registerTherapist() {
        navigate('/registerTherapist')
    }

    const getStudent = async () => {
        const serverRes = await fetch("http://localhost:8000/display-student", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                admin: localStorage.getItem("User")
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json();
            setallStudents(serverResJson);
        }
    }

    const getTherapist = async () => {
        const serverRes = await fetch("http://localhost:8000/display-therapist", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                admin: localStorage.getItem("User")
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json();
            setallTherapists(serverResJson);
        }
    }
    const DeleteTherapist = async (email) => {
        let data = {
            email: email
        }
        const serverRes = await fetch("http://localhost:8000/delete-therapist", {
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
    const DeleteStudent = async (email) => {
        let data = {
            p_email: email
        }
        const serverRes = await fetch("http://localhost:8000/delete-student", {
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

    React.useEffect(() => {
        getStudent();
        getTherapist()
    }, [])



    function renderStudentsRow(props) {
        const { index, style } = props;

        return (
            <ListItem style={{ ...style, padding: '25px 20px' }} key={index} component="div" disablePadding>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                    <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <ListItemText primary={allStudents[index].c_fname + " " + allStudents[index].c_lname} />
                        {/* <ListItemText primary={`${allStudents[index].c_fname} ${allStudents[index].c_lname}`} /> */}
                        <Box style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Button variant="outlined" onClick={() => navigate(`/ProfilePageStudent/${allStudents[index].student_Id}`)}>Profile</Button>
                            <Button variant="outlined" onClick={() => navigate(`/StagesPage/${allStudents[index].student_Id}`)}>Manage</Button>
                            <IconButton onClick={() => { DeleteStudent(allStudents[index].p_email) }}>
                                <DeleteIcon style={{ cursor: 'pointer' }} color="error" />
                            </IconButton>
                        </Box>
                        {/* <Button variant="text" color="error" onClick={() => { DeleteStudent(allStudents[index].p_email) }}>Delete</Button> */}
                    </Box>
                    <Divider style={{ margin: '5px 0' }} />
                </Box>
            </ListItem>
        );
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
                        <Button variant="text" onClick={() => { DeleteTherapist(allTherapists[index].Email) }}>Delete</Button>
                        {/* <Button variant="text">Edit</Button> */}
                    </Box>
                    <Divider style={{ margin: '5px 0' }} />
                </Box>
            </ListItem>
        );
    }

    const textAndIcon = [['Register Student', '<BoyIcon />'], ['All Students', '<GroupsIcon />'], ['Register Therapist', '<MedicationIcon />'], ['All Therapists', '<GroupsIcon />'], ['Create a new form', '<BorderColorIcon />']]

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img href="/" src={logo} style={{ width: '120px', marginRight: '20px', cursor: 'pointer' }} />
                    <Typography variant="h6" noWrap component="div">
                        {displayThis}
                    </Typography>
                    <Button
                        onClick={logout}
                        color="inherit"
                        style={{ margin: "auto 0 auto auto", fontWeight: 900 }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: "block" }}>
                        {textAndIcon.map((item, index) => (
                            <ListItemButton key={index}
                                onClick={() => setDisplayThis(item[0])}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {index === 0 && <BoyIcon />}
                                    {index === 1 && <GroupsIcon />}
                                    {index === 2 && <MedicationIcon />}
                                    {index === 3 && <GroupsIcon />}
                                    {index === 4 && <BorderColorIcon />}
                                    {index === 5 && <AccountTreeIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item[0]} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        ))}
                        <ListItemButton
                            onClick={() => navigate('/defaultstages')}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <AccountTreeIcon />
                            </ListItemIcon>
                            <ListItemText primary='Create Default Mapping' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => navigate('/defaultWorkflow')}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <SchemaIcon />
                            </ListItemIcon>
                            <ListItemText primary='View Default Mapping' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div>
                    {displayThis === 'Register Student' && <RegisterStudent />}
                    {displayThis === 'Register Therapist' && <RegisterTherapist />}
                    {displayThis === 'All Students' && <div>
                        <Typography align='center' margin={1} variant='h4'>All students</Typography>
                        <Box
                            sx={{ padding: '10px', width: '60%', height: 520, bgcolor: 'background.paper', margin: 'auto', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
                        >
                            <FixedSizeList
                                height={500}
                                itemSize={46}
                                itemCount={allStudents.length}
                                overscanCount={5}
                            >
                                {renderStudentsRow}
                            </FixedSizeList>
                        </Box>
                    </div>}

                    {displayThis === 'All Therapists' && <div>
                        <Typography align='center' margin={1} variant='h4'>All therapists</Typography>
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

                    </div>}

                    {displayThis === 'Create a new form' && <FormBuilder />}
                </div>
            </Box>
        </Box>
    );
}