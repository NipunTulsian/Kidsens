import * as React from "react";
import { Component, createRef } from 'react'
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField"
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
import ViewListIcon from '@mui/icons-material/ViewList';
import Grid from '@mui/material/Grid';
import { json, useNavigate, useParams } from 'react-router'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import logo from '../logo.png'
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import $ from "jquery";
import DisplayStudentTherapist from "./DisplayStudentTherapist";
import { useState } from "react";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const tileAnimation = {
    cursor: 'pointer',
    backgroundColor: "#FFFFFF",
    color: "black",
    padding: "10px",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: "#EEEEEE",
        color: "black",
        transform: "scale(1.1)",
    },
    "&:active": {
        backgroundColor: "#DBDBDB",
        transform: "scale(0.9)",
    }
}

const drawerWidth = 240;

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

let formData = null;

let id = null;

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
                    "speech": "speech",
                    "motor": "motor",
                    "social": "social",
                    "cognitive": "cognitive",
                    "emotional": "emotional",
                    "sensory": "sensory",
                    "behaviour": "behaviour"
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
                    "speech": "speech",
                    "motor": "motor",
                    "social": "social",
                    "cognitive": "cognitive",
                    "emotional": "emotional",
                    "sensory": "sensory",
                    "behaviour": "behaviour"
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
                    "speech": "speech",
                    "motor": "motor",
                    "social": "social",
                    "cognitive": "cognitive",
                    "emotional": "emotional",
                    "sensory": "sensory",
                    "behaviour": "behaviour"
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
                    "speech": "speech",
                    "motor": "motor",
                    "social": "social",
                    "cognitive": "cognitive",
                    "emotional": "emotional",
                    "sensory": "sensory",
                    "behaviour": "behaviour"
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
            "speech": "speech",
            "motor": "motor",
            "social": "social",
            "cognitive": "cognitive",
            "emotional": "emotional",
            "sensory": "sensory",
            "behaviour": "behaviour"
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
            "speech": "speech",
            "motor": "motor",
            "social": "social",
            "cognitive": "cognitive",
            "emotional": "emotional",
            "sensory": "sensory",
            "behaviour": "behaviour"
        },
        style: 'border: 3px solid red'
    }
}
const SaveForm = async (a) => {
    const serverRes = await fetch("http://localhost:8000/form/editForm", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
        },
        body: JSON.stringify({
            id: id,
            form_obj: a,
            sender_type: "therapist",
            sender_id: localStorage.getItem("User")
        })
    })

    if (serverRes.status === 200) {
        // const serverResJson = await serverRes.json();
        window.alert("From Saved")
        window.location.reload(false)
    }
}
class FormBuilder extends Component {
    fb = createRef();
    // testing = createRef();
    componentDidMount() {
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

export default function EditFormTherapist() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    async function fetchdata() {
        let serverRes = await fetch("http://localhost:8000/user/get-FormObject", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: id,
            })
        })
        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json();
            formData = serverResJson.form;
            setload(true);
        }
    }

    const navigate = useNavigate()
    const [loader, setload] = useState(false);
    React.useEffect(() => {
        fetchdata();
    }, [])
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

    const params = useParams();
    id = params.id;

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
                        <img href="/" alt="Kidsens" src={logo} style={{ width: '120px', marginRight: '20px', cursor: 'pointer' }} />
                        <Typography variant="h6" noWrap component="div">
                            Edit Form
                        </Typography>
                        <Button
                            color="inherit"
                            style={{ margin: "auto 0 auto auto", fontWeight: 900 }}
                            onClick={logout}
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
                            <ListItemButton
                                onClick={() => { navigate("/LandTherapy/Profile") }}
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
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary='Profile' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => { navigate("/LandTherapy/MyStudents") }}
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
                                    <EscalatorWarningIcon />
                                </ListItemIcon>
                                <ListItemText primary='My Students' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => { navigate("/LandTherapy/CreateForm") }}
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
                                    <BorderColorIcon />
                                </ListItemIcon>
                                <ListItemText primary='Create a new form' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => { navigate("/LandTherapy/ViewAllForms") }}
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
                                    <ViewListIcon />
                                </ListItemIcon>
                                <ListItemText primary='View all forms' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => { navigate("/LandTherapy/ViewAllPendingForms") }}
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
                                    <PendingActionsIcon />
                                </ListItemIcon>
                                <ListItemText primary='View all pending forms' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <div>
                        <div style={{ padding: '20px' }}>
                            <FormBuilder />
                        </div>
                    </div>
                </Box>
            </Box>
        )
    };
}