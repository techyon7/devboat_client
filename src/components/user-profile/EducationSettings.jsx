import React from 'react';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
	TextField,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	IconButton,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const EducationSettings = (props) => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		showEducation: false,
		institution: '',
		qualification: '',
		start: '',
		end: '',
		currentlyStudying: true,
	});
	const { onSubmit } = props;

	const handleClickEducation = () => {
		const { showEducation } = state;
		setState({
			showEducation: !showEducation,
			institution: '',
			qualification: '',
			start: '',
			end: '',
			currentlyStudying: true,
		});
	}

	const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

	const prefillInput = () => {
		setState({
			showEducation: true,
			institution: 'Delhi Public School, Ranchi',
			qualification: 'Foundation degree in Natural Sciences',
			start: '2016-04-01',
			end: '',
			currentlyStudying: true,
		});
	}

	return(
		<React.Fragment>
			{ state.showEducation
				?
				<ListItem>
					<Formik
						initialValues={{
							institution: state.institution,
							qualification: state.qualification,
							start: state.start,
							end: state.end,
							currentlyStudying: state.currentlyStudying,
						}}
						//validationSchema={SetupSchemaSkills}
						onSubmit={values => {
							// same shape as initial values
							console.log(values);
						}}

					render={(props) => (
						<form onSubmit={ onSubmit } className={classes.educationForm}>
							<TextField
								placeholder="Institution"
								label="Institution"
								name="institution"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values !== undefined ? props.values.institution : undefined}
								/>
							<TextField
								placeholder="Qualification"
								label="Qualification"
								name="qualification"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values !== undefined ? props.values.qualification : undefined}
								/>
							<TextField
								error={props.errors.start && props.touched.start ? true : false}
								name="start"
								label="Start Date"
								type="date"
								margin="normal"
								id="start"
								value={ props.values.start  }
								onChange={props.handleChange}
								helperText={props.errors.start && props.touched.start ? props.errors.start : null}
								InputLabelProps={{
									shrink: true,
								}}
								/>
							{ state.currentlyStudying ? '' :
								<TextField
								error={props.errors.end && props.touched.end ? true : false}
								name="end"
								label="End Date"
								type="date"
								margin="normal"
								id="end"
								value={ props.values.end  }
								onChange={props.handleChange}
								helperText={props.errors.end && props.touched.end ? props.errors.end : null}
								InputLabelProps={{
									shrink: true,
								}}
								/>
						 }
						<FormControlLabel
							control={
								<Checkbox
									checked={state.currentlyStudying}
									onChange={handleChange('currentlyStudying')}
									value="currentlyStudying"
									color="primary"
								/>
							}
							label="Currently Studying"
						/>
						</form>
					)}
					/>
					</ListItem> : ''
			}
			<ListItem button component="a" className={classes.addEducation} onClick={ handleClickEducation }>
				<ListItemText id="switch-list-label" primary={ state.showEducation ? "Done" : "Add a qualification"} />
				<ListItemSecondaryAction className={classes.addEducation}>
					<IconButton className={classes.addEducation} onClick={ handleClickEducation } >
						{ state.showEducation ? <DoneIcon /> : <AddBoxOutlinedIcon /> }
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<ListItem>
				<ListItemText id="switch-list-label" primary="Delhi Public School, Ranchi" secondary="Foundation Course in Natural Sciences" />
				<ListItemSecondaryAction>
          <IconButton onClick={prefillInput}>
						<EditIcon />
					</IconButton>
        </ListItemSecondaryAction>
			</ListItem>
		</React.Fragment>
	);
}

export default EducationSettings;

const useStyles = makeStyles(theme => ({
	addEducation: {
		color: "#4b7bec",
	},
	educationForm: {
		display: "flex",
		flexGrow: 1,
		flexDirection: "column",
	}
}));
