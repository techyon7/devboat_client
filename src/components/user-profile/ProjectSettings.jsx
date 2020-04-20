import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	DialogTitle,
	Button,
	Typography,
	IconButton,
	TextField,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import { Formik } from 'formik';

const ProjectSettings = (props) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const [state, setState] = React.useState({
		ongoing: false,
		allowProposals: false,
		allowInvestments: false,
	});

	const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

	const handleAllowProposals = () => {
		setState({
			...state,
			allowProposals: !state.allowProposals,
		});
	}

	return(
		<React.Fragment>
			<DialogTitle className="bg-cinder-light">
				<Box w={1} display="flex" alignItems="center">
					<Typography variant="h5" color="textPrimary" align="left">
						<Box fontWeight="fontWeightMedium" component="span" mr={3}>
							Add a project
						</Box>
					</Typography>
				</Box>
			</DialogTitle>
			<Formik
				initialValues={{
					projectName: '',
					githubUrl: '',
					ongoing: false,
					allowProposals: false,
					allowInvestments: false,
					designation: '',
					roleDescription: '',
				}}
				onSubmit={values => {
					console.log(values);
				}}

				render={props => (
					<form>
					<Box p={5} pt={0} display="flex" flexDirection="column">
						<TextField
							placeholder="Name of the project"
							label="Name of the project"
							name="projectName"
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values !== undefined ? props.values.projectName : undefined}
						/>
						<TextField
							placeholder="Github URL (optional)"
							label="Github URL (optional)"
							name="githubUrl"
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values !== undefined ? props.values.githubUrl : undefined}
						/>
					 	<FormControlLabel
						 	control={
							 	<Checkbox
								 	checked={state.ongoing}
								 	onChange={handleChange('ongoing')}
								 	value="ongoing"
								 	color="primary"
							 	/>
						 	}
						 	label="Ongoing"
					 	/>
						<Button variant="contained" className={classes.addTeamBtn}>
							Add a team
						</Button>
						{ state.ongoing ?
							<React.Fragment>
								<FormControlLabel
									control={
										<Checkbox
											checked={state.allowProposals}
											onChange={handleAllowProposals}
											value="allowProposals"
											color="primary"
										/>
									}
									label="Allow partnership proposals and job applications"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={state.allowInvestments}
											onChange={handleChange('allowInvestments')}
											value="allowInvestments"
											color="primary"
										/>
									}
									label="Allow investment proposals"
								/>
							</React.Fragment>
							: ''}
						<Button variant="contained" type="submit" className={classes.nextBtn}>
							Next
						</Button>
					</Box>
					</form>
				)}
			/>
		</React.Fragment>
	);
}

export default ProjectSettings;

const useStyles = makeStyles(theme => ({
	addTeamBtn: {
		margin: "1.25rem 0",
	},
	nextBtn: {
		backgroundColor: "#1DD1A1",
		color: "white",
		margin: "1.25rem 0",
	}
}));
