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
import ViewListIcon from '@mui/icons-material/ViewList';
import Grid from '@mui/material/Grid';
import { FixedSizeList } from 'react-window';
import { useNavigate } from 'react-router'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import logo from '../logo.png'
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import $ from "jquery";
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
	const serverRes = await fetch("http://localhost:8000/save-form", {
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
		const serverResJson = await serverRes.json();
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
	const [therapist, setTherapist] = React.useState()
	const [open, setOpen] = React.useState(false);
	const [pendingForms, setPendingForms] = React.useState([])

	async function fetchdata() {
		let serverRes = await fetch("http://localhost:8000/get-students", {
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
		serverRes = await fetch("http://localhost:8000/get-therapist", {
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
			setTherapist(serverResJson.therapist)
		}

		serverRes = await fetch("http://localhost:8000/get-fetchPending", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
			},
			body: JSON.stringify({
				therapist: localStorage.getItem("User")
			})
		})
		if(serverRes.status===200){
			const serverResJson = await serverRes.json();
			console.log(serverResJson)
			setPendingForms(serverResJson.answer)
		}
	}

	const navigate = useNavigate()
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


	const [displayThis, setDisplayThis] = React.useState('Profile')
	const [formsArr, setFormsArr] = React.useState(['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'])

	function renderRow(props) {
		const { index, style } = props;

		return (
			<ListItem style={{ ...style, padding: '25px 20px' }} key={index} component="div" disablePadding>
				<Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
					<Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
						<ListItemText primary={myStudents[index].c_fname + " " + myStudents[index].c_lname} />
						<Button variant="outlined" onClick={() => navigate(`/ProfilePage/${myStudents[index].student_Id}`)}>Profile</Button>
						<Button variant="outlined" onClick={() => navigate(`/StagesPage/${myStudents[index].student_Id}`)}>Manage</Button>
					</Box>
					<Divider style={{ margin: '5px 0' }} />
				</Box>
			</ListItem>
		);
	}
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
							onClick={() => setDisplayThis('Profile')}
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
							onClick={() => setDisplayThis('My Students')}
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
							onClick={() => setDisplayThis('Create a new form')}
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
							onClick={() => setDisplayThis('View all forms')}
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
							onClick={() => setDisplayThis('View all pending forms')}
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
						<Typography align='center' margin={3} variant='h3'>Welcome,{therapist ? therapist[0]?.fname + " " + therapist[0]?.lname : null}</Typography>

					</div>}

					{displayThis === 'My Students' && <div>
						<Typography align='center' margin={1} variant='h4'>All the students registered under you</Typography>
						<Box
							sx={{ padding: '10px', width: '70%', height: 520, bgcolor: 'background.paper', margin: 'auto', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
						>
							<FixedSizeList
								height={500}
								itemSize={46}
								itemCount={myStudents.length}
								overscanCount={5}
							>
								{renderRow}
							</FixedSizeList>
						</Box>

					</div>}

					{displayThis === 'Create a new form' && <div style={{ padding: '20px' }}>
						<FormBuilder />
					</div>}

					{/* {displayThis === 'View all forms' &&
						<Grid spacing={2} container>
							<Grid item md={4}>
								<Card variant="outlined">
									<CardContent>
										<Typography variant="h5" align="center">Title of Form</Typography>
										<Typography style={{ color: '#747577', fontSize: '14px', marginTop: '10px' }} align="center">Last edited on: 12/12/2021</Typography>
									</CardContent>
									<CardActions style={{ display: 'flex', justifyContent: 'center' }}>
										<Button>View and Edit form</Button>
										<Button>Delete Form</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>} */}

					{displayThis === 'View all forms' &&
						<Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
							{formsArr.map((form) => (
								<Grid item md={4} xl={3} xs={12} sm={6} key={form.FORM_ID}>
									<Card variant="outlined" sx={tileAnimation}>
										<CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', flexDirection: 'column', gap: '20px' }}>
											<Typography variant='h4' align="center">{form.FORM_NAME}</Typography>
											<Box>
												<Button variant='contained' onClick={() => window.location.href = `/formView.html?id=${form.FORM_ID}`}>View Form</Button>
											</Box>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					}

					{displayThis === 'View all pending forms' &&
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

											<Typography variant='h4' align="center">{form.formName}</Typography>

											<Box style={{ display: 'flex', justifyContent: 'center' }}>
												<Button variant='outlined' onClick={() => window.location.href = `/gradeForm.html?id=${form.FORM_ID}&student=${form.student_Id}`}>View Form</Button>
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
	);
}