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
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate, useParams } from 'react-router'
import logo from '../logo.png'
import BoyIcon from '@mui/icons-material/Boy';
import GroupsIcon from '@mui/icons-material/Groups';
import MedicationIcon from '@mui/icons-material/Medication';
import RegisterStudent from './RegisterStudent';
import RegisterTherapist from './RegisterTherapist';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SchemaIcon from '@mui/icons-material/Schema';
import $ from "jquery";
import DisplayStudents from "./DisplayStudents";
import DisplayTherapist from "./DisplayTherapist";

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
            Category: {
                label: 'Category',
                options: {
                    "speech": "Speech and Language Development",
                    "motor": "Motor Development",
                    "social": "Social Development",
                    "cognitive": "Cognitive Development",
                    "emotional": "Emotional Development",
                    "sensory": "Sensory Development",
                    "behaviour": "Behaviour Development"
                },
                style: 'border: 3px solid red'
            }
        },
        date: {
            Marks: {
                label: 'Marks',
                type: 'number',
                value: '0',
                style: 'border: 3px solid red'
            },
            Category: {
                label: 'Category',
                options: {
                    "speech": "Speech and Language Development",
                    "motor": "Motor Development",
                    "social": "Social Development",
                    "cognitive": "Cognitive Development",
                    "emotional": "Emotional Development",
                    "sensory": "Sensory Development",
                    "behaviour": "Behaviour Development"
                },
                style: 'border: 3px solid red'
            }
        },
        file: {
            Marks: {
                label: 'Marks',
                type: 'number',
                value: '0',
                style: 'border: 3px solid red'
            },
            Category: {
                label: 'Category',
                options: {
                    "speech": "Speech and Language Development",
                    "motor": "Motor Development",
                    "social": "Social Development",
                    "cognitive": "Cognitive Development",
                    "emotional": "Emotional Development",
                    "sensory": "Sensory Development",
                    "behaviour": "Behaviour Development"
                },
                style: 'border: 3px solid red'
            }
        },

        select: {
            Marks: {
                label: 'Marks',
                type: 'number',
                value: '0',
                style: 'border: 3px solid red'
            },
            Category: {
                label: 'Category',
                options: {
                    "speech": "Speech and Language Development",
                    "motor": "Motor Development",
                    "social": "Social Development",
                    "cognitive": "Cognitive Development",
                    "emotional": "Emotional Development",
                    "sensory": "Sensory Development",
                    "behaviour": "Behaviour Development"
                },
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
    },
    Category: {
        label: 'Category',
        options: {
            "speech": "Speech and Language Development",
            "motor": "Motor Development",
            "social": "Social Development",
            "cognitive": "Cognitive Development",
            "emotional": "Emotional Development",
            "sensory": "Sensory Development",
            "behaviour": "Behaviour Development"
        },
        style: 'border: 3px solid red'
    }
}
options.typeUserAttrs['radio-group'] = {
    Marks: {
        label: 'Marks',
        type: 'number',
        value: '0',
        style: 'border: 3px solid red'
    },
    Category: {
        label: 'Category',
        options: {
            "speech": "Speech and Language Development",
            "motor": "Motor Development",
            "social": "Social Development",
            "cognitive": "Cognitive Development",
            "emotional": "Emotional Development",
            "sensory": "Sensory Development",
            "behaviour": "Behaviour Development"
        },
        style: 'border: 3px solid red'
    }
}
const SaveForm = async (a) => {
    console.log(a)
    const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/form/saveForm`, {
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
    const params = useParams();
    const [displayThis, setDisplayThis] = React.useState(params.display);

    const [searchStudent, setsearchStudent] = React.useState("");
    const [searchTherapist, setsearchTherapist] = React.useState("");
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

    const [loader, setload] = React.useState(false)

    const getStudent = async () => {
        const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/displayStudent`, {
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
            getTherapist();
        }
    }

    const getTherapist = async () => {
        const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/displayTherapist`, {
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
            setload(true)
        }
    }


    React.useEffect(() => {
        getStudent();
    }, [])

    function changeStudentSearch(event) {
        setsearchStudent(event.target.value);
    }

    function changeTherapistSearch(event) {
        setsearchTherapist(event.target.value);
    }

    const textAndIcon = [['Register Student', '<BoyIcon />'], ['All Students', '<GroupsIcon />'], ['Register Therapist', '<MedicationIcon />'], ['All Therapists', '<GroupsIcon />'], ['Create Form', '<BorderColorIcon />']]
    const text = ['RegisterStudent', 'AllStudents', 'RegisterTherapist', 'AllTherapists', 'CreateForm']

    if (loader) {
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
                    <img href="/" alt="logo" src={logo} style={{ width: '120px', marginRight: '20px', cursor: 'pointer' }} />
                    <Typography variant="h6" noWrap component="div">
                        {displayThis}
                    </Typography>
                    <Button
                        onClick={logout}
                        color="inherit"
                        style={{ margin: "auto 0 auto auto", fontWeight: 900,cursor:"pointer" }}
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
                                onClick={() => { setDisplayThis(text[index]); navigate(`/adminPage/${text[index]}`) }}
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
                    {displayThis === 'RegisterStudent' && <RegisterStudent />}
                    {displayThis === 'RegisterTherapist' && <RegisterTherapist />}
                    {displayThis === 'AllStudents' && <DisplayStudents arr={allStudents} search={searchStudent} filter={searchStudent} SearchFunc={changeStudentSearch} />}
                    {displayThis === 'AllTherapists' && <DisplayTherapist arr={allTherapists} search={searchTherapist} filter={searchTherapist} SearchFunc={changeTherapistSearch} />}
                    {displayThis === 'CreateForm' && <FormBuilder />}
                </div>
            </Box>
        </Box>
    
    )};
}