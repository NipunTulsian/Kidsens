import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField"
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
import ViewListIcon from '@mui/icons-material/ViewList';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SchemaIcon from '@mui/icons-material/Schema';
import SummarizeIcon from '@mui/icons-material/Summarize';

import logo from '../logo.png'

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

export default function LandStudent() {
	const params=useParams();
	const getPendingForms = async () => {
		const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/parent/getPendingForms`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
			},
			body: JSON.stringify({
				id: localStorage.getItem("User"),
				"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
			})
		})
		if (serverRes.status === 200) {
			const serverResJson = await serverRes.json();
			getNames(serverResJson)
		}
	}

	const [formsArr, setFormsArr] = React.useState([])
	async function getNames(form_ids) {
		console.log(form_ids)
		const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/parent/getPendingformsName`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
			},
			body: JSON.stringify({
				id: form_ids
			})
		})
		if (serverRes.status === 200) {
			const serverResJson = await serverRes.json();
			console.log(serverResJson)
			setFormsArr(serverResJson);
		}
	}

	const getReports = async () => {
		const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/parent/getReports`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
			},
			body: JSON.stringify({
				id: localStorage.getItem("User")
			})
		})
		if (serverRes.status === 200) {
			const serverResJson = await serverRes.json();
			setReports(serverResJson)
		}
	}
	// fetch student details

	const [student, setStudent] = React.useState({
		username: "",
		p_fname: "",
		p_lname: "",
		p_Address: "",
		c_DOB: "",
		image: null,
		c_gender: "",
		Diagnosis: "",
		identification: null,
		reports: null,
		c_ROLL_NUMBER: "",
		p_email: localStorage.getItem("User"),
		student_Id: null,
		c_fname: null,
		c_lname: null,
	});


	const getStudent = async () => {
		const serverRes = await fetch(`${process.env.REACT_APP_API_URL}/parent/StudentDetails`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"authorization": "Bearer".concat(" ", localStorage.getItem("User")),
			},
			body: JSON.stringify({
				id: localStorage.getItem("User")
			})
		})

		if (serverRes.status === 200) {
			const serverResJson = await serverRes.json();
			setStudent({
				student_Id: serverResJson.student_Id,
				c_fname: serverResJson.c_fname,
				c_lname: serverResJson.c_lname,
				image: process.env.REACT_APP_API_URL + serverResJson.c_img.replace("../uploads", ""),
				username: serverResJson.username,
				p_fname: serverResJson.p_fname,
				p_lname: serverResJson.p_lname,
				p_Address: serverResJson.p_Address,
				c_DOB: serverResJson.c_DOB,
				c_gender: serverResJson.c_gender,
				Diagnosis: serverResJson.Diagnosis,
				identification: process.env.REACT_APP_API_URL + serverResJson.identification.replace("../uploads", ""),
				reports: process.env.REACT_APP_API_URL + serverResJson.reports.replace("../uploads", ""),
			})
		}
	}
	// fetch list of unfilled forms of this particular student

	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const navigate = useNavigate()

	React.useEffect(() => {
		if (!localStorage.getItem('User')) {
			navigate('/')
		}
		getStudent()
		getPendingForms()
		getReports()
		console.log(displayThis)
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


	const [displayThis, setDisplayThis] = React.useState(params.display)
	const [Reports, setReports] = React.useState([])
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
							onClick={() =>{ setDisplayThis("Profile"); navigate('/LandStudent/Profile')}}
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
							onClick={() => navigate(`/StagesPageStudentView/${student.student_Id}`)} sx={{
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
							<ListItemText primary='My workflow' sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
						<ListItemButton
							onClick={() => {setDisplayThis("ViewPendingForms");navigate('/LandStudent/ViewPendingForms')}}
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
							<ListItemText primary='View pending forms' sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
						<ListItemButton
							onClick={() => {setDisplayThis("ViewAllReports"); navigate('/LandStudent/ViewAllReports')}}
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
								<SummarizeIcon />
							</ListItemIcon>
							<ListItemText primary='View all Reports' sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<div>
					{displayThis === 'Profile' && <div>
						<Typography align='center' margin={3} variant='h3'>Welcome,{student ? " " + student.c_fname + " " + student.c_lname + " " : null}</Typography>
						<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
							{student ? <img src={student.image} alt="profile" style={{ display:"block",marginLeft:"auto",marginRight:"auto",borderRadius: "50%", width: "125px", height: "125px" }} /> : null}
							<TextField
								style={{ width: "30%", margin: "10px auto" }}
								variant="outlined"
								label="Username"
								value={student.username}
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
								label="Date Of Birth"
								value={student.c_DOB}
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
								label="Gender"
								value={student.c_gender}
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
								label="Parent"
								value={student.p_fname + " " + student.p_lname}
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
								value={student.p_Address}
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
								label="Diagnosis"
								value={student.Diagnosis}
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
							<Typography align='center' style={{marginTop:"15px",marginBottom:"5px",color:"#2196F3",fontSize:"15px"}}>Identification</Typography>
							<iframe src={student.identification} title="identification" width="800" height="500" style={{marginLeft:"auto",marginRight:"auto",marginBottom:"30px"}}>
							</iframe>
							<Typography align='center' style={{marginTop:"15px",marginBottom:"5px",color:"#2196F3"}}>Reports</Typography>
							<iframe src={student.reports} title="reports" width="800" height="500" style={{marginLeft:"auto",marginRight:"auto"}}>
							</iframe>
						</div>
					</div>}

					{displayThis === 'ViewPendingForms' &&
						<Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
							{formsArr?.map((form) => (
								<Grid item md={4} xl={3} xs={12} sm={6} key={form.FORM_ID}>
									<Card variant="outlined" sx={tileAnimation}>
										<CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', flexDirection: 'column', gap: '20px' }}>
											<Typography variant='h6' align="center">{form.FORM_NAME}</Typography>
											<Box>
												<Button variant='outlined' onClick={() => window.location.href = `/formSubmit.html?id=${form.FORM_ID}`}>Fill Form</Button>
											</Box>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					}
					{displayThis === 'ViewAllReports' &&
						<Grid spacing={4} container style={{ padding: '0px 50px', marginBottom: '50px' }}>
							{Reports?.map((form) => (
								<Grid item md={4} xl={3} xs={12} sm={6} key={form.FORM_ID}>
									<Card variant="outlined" sx={tileAnimation}>
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
					}
				</div>
			</Box>
		</Box>
	);
}