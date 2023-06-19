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
import { useNavigate, useParams } from 'react-router'
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
	const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/form/saveForm`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
		},
		body: JSON.stringify({
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

export default function LandTherapy() {
	const theme = useTheme();
	const [myStudents, setallStudents] = React.useState([])
	const [therapist, setTherapist] = React.useState({
		username: "",
		password: "",
		speciality: "",
		Address: "",
		id: "",
		image: null,
		Identity: null,
		Certification: null,
		Resume: null,
		fname: "",
		lname: "",
	})
	const [open, setOpen] = React.useState(false);
	const [pendingForms, setPendingForms] = React.useState([])

	async function fetchdata() {
		let serverRes = await fetch(`${process.env.REACT_APP_API_URL}/therapist/getStudents`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
			},
			body: JSON.stringify({
				therapist: localStorage.getItem("User")
			})
		})
		if (serverRes.status === 200) {
			const serverResJson = await serverRes.json();
			setFormsArr(serverResJson.forms)
			setallStudents(serverResJson.students)
		}
		serverRes = await fetch(`${process.env.REACT_APP_API_URL}/therapist/getTherapist`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
			},
			body: JSON.stringify({
				therapist: localStorage.getItem("User")
			})
		})
		if (serverRes.status === 200) {
			const serverResJson = await serverRes.json();
			setTherapist({
				fname: serverResJson.fname,
				lname: serverResJson.lname,
				id: serverResJson.EMP_ID,
				username: serverResJson.username,
				speciality: serverResJson.speciality,
				Address: serverResJson.Address,
				phonte: serverResJson.phone,
				image: process.env.REACT_APP_API_URL + serverResJson.image.replace("../uploads", ""),
				Identity: process.env.REACT_APP_API_URL + serverResJson.Identity.replace("../uploads", ""),
				Certification: process.env.REACT_APP_API_URL + serverResJson.Certificate.replace("../uploads", ""),
				Resume: process.env.REACT_APP_API_URL + serverResJson.Resume.replace("../uploads", ""),
			})
		}

		serverRes = await fetch(`${process.env.REACT_APP_API_URL}/therapist/getPendingforms`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
			},
			body: JSON.stringify({
				therapist: localStorage.getItem("User")
			})
		})
		if (serverRes.status === 200) {
			const serverResJson = await serverRes.json();
			setPendingForms(serverResJson.answer)
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


	const [formsArr, setFormsArr] = React.useState([])
	const [searchStudent, setsearchStudent] = React.useState("");

	function changeStudentSearch(event) {
		setsearchStudent(event.target.value);
	}

	const params = useParams();
	const [displayThis, setDisplayThis] = React.useState(params.display)

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
							{displayThis}
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
								onClick={() => { setDisplayThis('Profile'); navigate("/LandTherapy/Profile") }}
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
								onClick={() => { setDisplayThis('MyStudents'); navigate("/LandTherapy/MyStudents") }}
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
								onClick={() => { setDisplayThis('CreateForm'); navigate("/LandTherapy/CreateForm") }}
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
								onClick={() => { setDisplayThis('ViewAllForms'); navigate("/LandTherapy/ViewAllForms") }}
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
								onClick={() => { setDisplayThis('ViewAllPendingForms'); navigate("/LandTherapy/ViewAllPendingForms") }}
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
						{displayThis === 'Profile' && <div>
							<Typography align='center' margin={3} variant='h3'>Welcome,{therapist ? therapist.fname + " " + therapist.lname : null}</Typography>

							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
								{therapist ? <img alt="Profile" src={therapist.image} style={{ display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "50%", width: "125px", height: "125px" }} /> : null}
								<TextField
									style={{ width: "30%", margin: "10px auto" }}
									variant="outlined"
									label="Username"
									value={therapist.username}
									InputProps={{
										readOnly: true,
									}}
									InputLabelProps={{
										style: {
											fontSize: 18,
											color: "#2196F3"
										}
									}}
								></TextField>
								<TextField
									style={{ width: "30%", margin: "10px auto" }}
									variant="outlined"
									label="Speciality"
									value={therapist.speciality}
									InputProps={{
										readOnly: true,
									}}
									InputLabelProps={{
										style: {
											fontSize: 18,
											color: "#2196F3"
										}
									}}
								></TextField>
								<TextField
									style={{ width: "30%", margin: "10px auto" }}
									variant="outlined"
									label="Address"
									value={therapist.Address}
									InputProps={{
										readOnly: true,
									}}
									InputLabelProps={{
										style: {
											fontSize: 18,
											color: "#2196F3"
										}
									}}
								></TextField>
								<TextField
									style={{ width: "30%", margin: "10px auto" }}
									variant="outlined"
									label="id"
									value={therapist.id}
									InputProps={{
										readOnly: true,
									}}
									InputLabelProps={{
										style: {
											fontSize: 18,
											color: "#2196F3"
										}
									}}
								></TextField>
								<Typography align='center' style={{ marginTop: "15px", marginBottom: "5px", color: "#2196F3", fontSize: "15px" }}>Identification</Typography>
								<iframe title={therapist.Identity} src={therapist.Identity} width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "30px" }} />
								<Typography align='center' style={{ marginTop: "15px", marginBottom: "5px", color: "#2196F3" }}>Certification</Typography>
								<iframe title={therapist.Certification} src={therapist.Certification} width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto" }} />
								<Typography align='center' style={{ marginTop: "15px", marginBottom: "5px", color: "#2196F3" }}>Resume</Typography>
								<iframe title={therapist.Resume} src={therapist.Resume} width="800" height="500" style={{ marginLeft: "auto", marginRight: "auto" }} />
							</div>
						</div>}

						{displayThis === 'MyStudents' && <DisplayStudentTherapist arr={myStudents} search={searchStudent} filter={searchStudent} SearchFunc={changeStudentSearch} />}

						{displayThis === 'CreateForm' && <div style={{ padding: '20px' }}>
							<FormBuilder />
						</div>}

						{displayThis === 'ViewAllForms' &&
							<Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
								{formsArr.map((form) => (
									<Grid item md={4} xl={3} xs={12} sm={6} key={form.FORM_ID}>
										<Card variant="outlined" sx={tileAnimation}>
											<CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120px', flexDirection: 'column', gap: '20px' }}>
												<Typography variant='h6' align="center">{form.FORM_NAME}</Typography>
												<Box>
													<Button variant='contained' onClick={() => window.location.href = `/formView.html?id=${form.FORM_ID}`} style={{ marginRight: "10px" }}>View Form</Button>
													<Button variant='contained' onClick={() => window.location.href = `/EditForm/${form.FORM_ID}`} style={{ backgroundColor: "red", marginRight: "10px" }}>Edit</Button>
													<Button variant='contained' onClick={async () => {
														let serverRes = await fetch(`${process.env.REACT_APP_API_URL}/form/deleteForm`, {
															method: "POST",
															headers: {
																'Content-Type': 'application/json',
																"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
															},
															body: JSON.stringify({
																id: form.FORM_ID
															})
														})
														if (serverRes.status === 200) {
															window.location.reload(false);
														}
													}} style={{ marginRight: "10px" }}>Delete</Button>
												</Box>
											</CardContent>
										</Card>
									</Grid>
								))}
							</Grid>
						}

						{displayThis === 'ViewAllPendingForms' &&
							<Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
								{pendingForms.map((form) => (
									<Grid item md={4} xl={3} xs={12} sm={6} key={form.formID}>
										<Card variant="outlined" sx={tileAnimation}>
											<CardContent style={{ display: 'flex', justifyContent: 'center', height: '150px', flexDirection: 'column', gap: '10px' }}>
												<Box style={{ display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
													<Typography variant="outline text" align="center" color='#5A5A5A'>{form.stage} -{'>'} {form.assessment}</Typography>
													<br></br>
													<Typography variant="outline text" align="center" color='#5A5A5A'>Student: {form.studentFirstName} {form.studentLastName}</Typography>
												</Box>

												<Typography variant='h6' align="center">{form.formName}</Typography>

												<Box style={{ display: 'flex', justifyContent: 'center' }}>
													<Button variant='outlined' onClick={() => window.location.href = `/gradeFormTherapist.html?id=${form.FORM_ID}&student=${form.student_Id}`}>View Form</Button>
												</Box>
											</CardContent>
										</Card>
									</Grid>
								))}
							</Grid>
						}
					</div>
				</Box>
			</Box>
		)
	};
}