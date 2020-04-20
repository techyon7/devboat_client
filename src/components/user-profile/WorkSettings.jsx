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
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const WorkSettings = (props) => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		showWork: false,
		position: '',
		company: '',
		start: '',
		end: '',
		currentlyWorking: true,
	});
	const { onSubmit } = props;

	const handleClickWork = () => {
		const { showWork } = state;
		setState({
			showWork: !showWork,
			position: '',
			company: '',
			start: '',
			end: '',
			currentlyWorking: true,
		});
	}

	const prefillInput = () => {
		setState({
			showWork: true,
			position: 'Founder & CEO',
			company: 'DevBoat',
			start: '2019-05-12',
			end: '',
			currentlyWorking: true,
		});
	}

	const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

	return(
		<React.Fragment>
			{ state.showWork
				?
				<ListItem>
					<Formik
						initialValues={{
							position: state.position,
							company: state.company,
							start: state.start,
							end: state.end,
							currentlyWorking: state.currentlyWorking,
						}}
						//validationSchema={SetupSchemaSkills}
						onSubmit={values => {
							// same shape as initial values
							console.log(values);
						}}

					render={(props) => (
						<form onSubmit={ onSubmit } className={classes.workForm}>
							<TextField
								placeholder="Position"
								label="Position"
								name="position"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values !== undefined ? props.values.position : undefined}
								/>
							<TextField
								placeholder="Company"
								label="Company"
								name="company"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values !== undefined ? props.values.company : undefined}
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
							{ state.currentlyWorking ? '' :
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
			            checked={state.currentlyWorking}
			            onChange={handleChange('currentlyWorking')}
			            value="currentlyWorking"
			            color="primary"
			          />
			        }
			        label="Currently Working"
			      />
						</form>
					)}
					/>
					</ListItem> : ''
			}
			<ListItem button component="a" className={classes.addWork} onClick={ handleClickWork } >
				<ListItemText id="switch-list-label" primary={ state.showWork ? "Done" : "Add a work experience"} />
				<ListItemSecondaryAction className={classes.addWork}>
					<IconButton className={classes.addWork} onClick={ handleClickWork }>
						{ state.showWork ? <DoneIcon /> : <AddBoxOutlinedIcon /> }
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<ListItem>
				<ListItemText id="switch-list-label" primary="Founder & CEO" secondary="DevBoat" />
				<ListItemSecondaryAction>
          <IconButton onClick={prefillInput} >
						<EditIcon />
					</IconButton>
        </ListItemSecondaryAction>
			</ListItem>
		</React.Fragment>
	);
}

export default WorkSettings;

const useStyles = makeStyles(theme => ({
	addWork: {
		color: "#4b7bec",
	},
	workForm: {
		display: "flex",
		flexGrow: 1,
		flexDirection: "column",
	}
}));
