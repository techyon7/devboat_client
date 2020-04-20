import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone'
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
	Paper,
	Tabs,
	Tab,
	Container,
	Box,
	Icon,
	Typography,
	TextField,
	DialogTitle,
	DialogActions,
	DialogContent,
	Dialog,
	Button,
	GridList,
	GridListTile,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	FormControlLabel,
	Checkbox,
	IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublishIcon from '@material-ui/icons/Publish';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`project-editor-tabpanel-${index}`}
      aria-labelledby={`project-editor-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `project-editor-tab-${index}`,
    'aria-controls': `project-editor-tabpanel-${index}`,
  };
}

const ProjectEditor = () => {

	const classes = useStyles();
	const [tab, setTab] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const [openCover, setOpenCover] = React.useState(false);

	const [state, setState] = React.useState({
		isRoleAvailable: false,
		isInvestmentAllowed: false,
		isComplete: false,
		showRoleForm: false,
		roleName: '',
		roleDescription: '',
		files: [],
		cover: [],
		roles: [],
	});

	const handleRemoveFile = (file) => {
		let files = state.files.filter(currFile => currFile !== file);
		setState({
			...state,
			files: files,
		});
	}

	const handleRemoveRole = (role) => {
		let roles = state.roles.filter(currRole => currRole !== role);
		setState({
			...state,
			roles: roles,
		});
	}

  const handleChange = name => event => {
		setState({ ...state, [name]: event.target.checked });
  }

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClickOpenCover = () => {
		setOpenCover(true);
	};

	const handleClose = () => {
		setOpen(false);
		setOpenCover(false);
	};

	const handleTabs = (event, newValue) => {
    setTab(newValue);
  };

	const handleNext = (index) => {
		setTab(index);
	}

	const showRoleForm = () => {
		setState({
			...state,
			showRoleForm: !state.showRoleForm,
			roleName: '',
			roleDescription: '',
		});
	}

	const addRole = (role) => {
		let oldRoles = state.roles;
		let roles = [...oldRoles, role];
		setState({
			...state,
			roles: roles,
			roleName: '',
			roleDescription: '',
		});
	}


	// JSX Markup
	return(
		<div className={classes.root}>
			<Paper square className={classes.paper}>
				<Container maxWidth="lg">
					<Tabs value={tab} onChange={handleTabs} aria-label="project editor tabs" indicatorColor="primary">
						<Tab label="Content" {...a11yProps(0)} />
						<Tab label="Project Settings" {...a11yProps(1)} />
					</Tabs>
				</Container>
			</Paper>
			<Container maxWidth="sm">
				<TabPanel value={tab} index={0}>
					<Formik
					initialValues={{
						projectName: '',
						projectDescription: '',
						projectUrl: '',
						githubUrl: '',
					}}
					validationSchema=''
					onSubmit={values => {
						// same shape as initial values
						console.log(values);
					}}
					render={props => (
						<form onSubmit={props.onSubmit}>
							<Button fullWidth onClick={handleClickOpenCover}>
								<Box component="span" display="flex" flexDirection="column" alignItems="center" p={5}>
									{state.cover.length > 0 ?
										<img src={URL.createObjectURL(state.cover[0])} alt={state.cover[0].name} width="100%" height="auto" />
										:
										<React.Fragment>
											<Icon className={classes.largeIcon} component={CameraAltIcon} />
											<Box mt={3}>
												Add cover image
											</Box>

											<Typography variant='caption'>
												<Box mt={0} className="text-lowercase" component="span">
													(400x400)px
												</Box>
											</Typography>
										</React.Fragment>
									}
								</Box>
							</Button>
							<TextField
							fullWidth
							value={props.values.projectName}
							name='projectName'
							placeholder='Name of the project'
							label='Name of the project'
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							/>
							<Box mt={5}>
								<Button variant="contained" onClick={handleClickOpen}>
									<PhotoLibraryIcon />
									<Box component="span" ml={3}>
										Add project images
									</Box>
								</Button>
							</Box>
							{state.files.length > 0
				        ?
							<Box my={5}>
								<GridList cellHeight={160} className={classes.gridList} cols={3}>
					        {state.files.map((file, index) => (
					          <GridListTile key={index} cols={file.cols || 1}>
					            <img src={URL.createObjectURL(file)} alt={file.name} />
											<IconButton onClick={() => handleRemoveFile(file)} className={classes.removeImageBtn}>
												<DeleteIcon />
											</IconButton>
					          </GridListTile>
					        ))}
					      </GridList>
							</Box>
							: ""}
							<TextField
							fullWidth
							value={props.values.githubUrl}
							name='githubUrl'
							placeholder='GitHub URL (optional)'
							label='GitHub URL (optional)'
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							/>
							<TextField
							fullWidth
							value={props.values.projectUrl}
							name='projectUrl'
							placeholder='Project URL (optional)'
							label='Project URL (optional)'
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							/>
							<TextField
							fullWidth
							multiline
							rowsMax="10"
							rows="4"
							value={props.values.projectDescription}
							name='projectDescription'
							placeholder='Description'
							label='Description'
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							/>

							<Dialog onClose={handleClose} open={open}>
							<DialogTitle id="customized-dialog-title" onClose={handleClose}>
								Upload Images
							</DialogTitle>
							<DialogContent dividers>
              <DropzoneArea
                  onChange={(files) => {setState({...state, files: files});}}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
									filesLimit={10}
                  showPreviews={true}
									showPreviewsInDropzone={false}
									showFileNamesInPreview={false}
                  maxFileSize={5000000}
									dropzoneClass="dropzone-area"
									dropzoneText="Drag 'n' Drop some files here, or click to select files"
									dropzoneParagraphClass="dropzone-text"
									color="default"
              />
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color="primary">
									Done
								</Button>
							</DialogActions>
							</Dialog>

							<Dialog onClose={handleClose} open={openCover}>
							<DialogTitle id="customized-dialog-title" onClose={handleClose}>
								Upload Cover Image
							</DialogTitle>
							<DialogContent dividers>
							<DropzoneArea
									onChange={(files) => {setState({...state, cover: files});}}
									acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
									filesLimit={1}
									showPreviews={true}
									showPreviewsInDropzone={false}
									showFileNamesInPreview={false}
									maxFileSize={5000000}
									dropzoneClass="dropzone-area"
									dropzoneText="Drag 'n' Drop some files here, or click to select files"
									dropzoneParagraphClass="dropzone-text"
									color="default"
							/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color="primary">
									Done
								</Button>
							</DialogActions>
							</Dialog>
							<Box mt={5}>
								<Button className="btn-success" onClick={()=>handleNext(1)} >
									<Box component="span" mx={3}>
									Continue
									</Box>
									<ArrowForwardIcon />
								</Button>
							</Box>
						</form>
					)}
					/>
				</TabPanel>
			</Container>
			<Container maxWidth="sm">
				<TabPanel value={tab} index={1}>
					<Formik
						initialValues={{
							roleName: state.roleName,
							roleDescription: state.roleDescription,
						}}

						validationSchema=''

						onSubmit={values => {
							// same shape as initial values
							console.log(values);
						}}

						render={props => (
							<List>
								<ListSubheader className={classes.subheader}>Project Status</ListSubheader>
			          	<ListItem>
										<FormControlLabel
											control={
												<Checkbox
													checked={state.isComplete}
													onChange={handleChange('isComplete')}
													value="isComplete"
													color="primary"
												/>
											}
											label="Completed"
										/>
									</ListItem>
									<ListSubheader className={classes.subheader}>Team</ListSubheader>
									<ListItem>
										<Button variant="contained" color="primary">
											<GroupIcon />
											<Box component="span" ml={3}>
											Add a team
											</Box>
										</Button>
									</ListItem>

									{!state.isComplete ?
										<React.Fragment>
											<ListSubheader className={classes.subheader}>Roles & Support</ListSubheader>
											<ListItem>
												<Box>
													<FormControlLabel
														control={
															<Checkbox
																checked={state.isRoleAvailable}
																onChange={handleChange('isRoleAvailable')}
																value="isRoleAvailable"
																color="primary"
															/>
														}
														label="Allow partnership proposals and job applications"
													/>
													<FormControlLabel
														control={
															<Checkbox
																checked={state.isInvestmentAllowed}
																onChange={handleChange('isInvestmentAllowed')}
																value="isInvestmentAllowed"
																color="primary"
															/>
														}
														label="Allow investment proposals"
													/>
												</Box>
											</ListItem>
										</React.Fragment>
										: ''}

									{state.isRoleAvailable && !state.isComplete && state.showRoleForm ?
										<React.Fragment>
										<ListSubheader>
											Available Roles
										</ListSubheader>
										{state.roles.length > 0 ?
										 state.roles.map((role, index) => (
											 	<Box key={index} width={1} className="bg-cinder-light" borderRadius={4}>
													<ListItem>
															<ListItemText primary={role.roleName} secondary={role.roleDescription} />
															<IconButton onClick={() => handleRemoveRole(role)}>
																<DeleteIcon />
															</IconButton>
													</ListItem>
												</Box>
											))
											: ''}
											<ListItem>
												<TextField
												fullWidth
												value={props.values.roleName}
												name='roleName'
												placeholder='Position Title'
												label='Position Title'
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												/>
											</ListItem>
											<ListItem>
												<TextField
												multiline
												fullWidth
												rowsMax="8"
												rows="4"
												value={props.values.roleDescription}
												name='roleDescription'
												placeholder='Describe the responsibilities, opportunities and expectations from the candidate...'
												label='Description'
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												/>
											</ListItem>
										</React.Fragment>
										: '' }
										{ state.isRoleAvailable && !state.isComplete ?
											state.showRoleForm ?
											<Box ml={3}>
												<Button
												color="primary"
												onClick={() =>
													addRole({
														roleName: props.values.roleName,
														roleDescription: props.values.roleDescription,
													})}
												>
													<AddIcon />
													<Box component="span" mx={3}>
													Add Role
													</Box>
												</Button>
											</Box>
											:
											<Box ml={3}>
												<Button color="primary" onClick={showRoleForm} >
													<AddIcon />
													<Box component="span" mx={3}>
													Add Role
													</Box>
												</Button>
											</Box>
											: ''
										}

									<ListItem>
									<Box mt={5} display="flex">
										<Box>
										<Button variant="contained" onClick={()=>handleNext(0)} >
											<ArrowBackIcon />
											<Box component="span" mx={3}>
											Back
											</Box>
										</Button>
										</Box>
										<Box ml={3}>
											<Button className="btn-success" onClick={()=>handleNext(1)} >
												<PublishIcon />
												<Box component="span" mx={3}>
												Save & Publish
												</Box>
											</Button>
										</Box>
									</Box>
									</ListItem>
			        </List>
						)}
					/>
				</TabPanel>
			</Container>

		</div>
	);
}

export default ProjectEditor;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    color: theme.palette.text.secondary,
		backgroundColor: "#1e1e21 !important"
  },
	alignStart: {
		alignSelf: 'start'
	},
	largeIcon: {
		transform: 'scale(2)',
	},
	subheader: {
	 backgroundColor: '#1e1e21',
 },
 formControl: {
    marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
  },
	dropzone: {
		border: "2px dashed rgba(255, 255, 255, 0.7) !important",
		padding: 16,
		maxWidth: 350,
		height: 250,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#262b2f !important",
		cursor: "pointer",
	},
	gridList: {
    width: 500,
    maxHeight: 450,
  },
	removeImageBtn: {
		position: "absolute",
		top: 5,
		right: 5,
		backgroundColor: "#87878e !important",
		'&:hover': {
			backgroundColor: "#1e1e21 !important",
		}
	}
}));
