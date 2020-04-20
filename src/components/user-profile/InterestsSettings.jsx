import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { SetupSchemaSkills } from '../validations/validations'
import { Formik } from 'formik';
import { DownshiftMultiple } from '../profile-setup/IntegrationDownshift';
import { skillObjects } from '../../data/skillsArray.js';
import { makeStyles } from '@material-ui/core/styles';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const InterestsSettings = (props) => {
	const classes = useStyles();
	const { onSubmit } = props;
	const [state, setState] = React.useState({
		showInterests: false,
	});

	const interests = skillObjects;

	const handleClickInterests = () => {
		const { showInterests } = state;
		setState({
			showInterests: !showInterests,
		});
	}

	return(
		<React.Fragment>
		{ state.showInterests
			?
			<ListItem>
				<Formik
					initialValues={{
						interests: ''
					}}
					validationSchema={SetupSchemaSkills}
					onSubmit={values => {
						// same shape as initial values
						console.log(values);
					}}

				render={(props) => (
					<form onSubmit={onSubmit} className={classes.grow}>
						<DownshiftMultiple
							placeholder="Search for interests"
							label="Interests"
							name="Interests"
							options={interests}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values !== undefined ? props.values.interests : undefined}
							/>
					</form>
				)}
				/>
				</ListItem> : ''
		}
			<ListItem button component="a" className={classes.addInterest} onClick={handleClickInterests}>
				<ListItemText id="switch-list-label" primary={ state.showInterests ? "Done" : "Add an interest"} />
				<ListItemSecondaryAction>
					<IconButton className={classes.addInterest} onClick={handleClickInterests}>
						{state.showInterests ?
							<DoneIcon />
							:
							<AddBoxOutlinedIcon />
						}
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<ListItem>
				<ListItemText id="switch-list-label" primary="C" />
				<ListItemSecondaryAction>
          <IconButton>
						<DeleteIcon />
					</IconButton>
        </ListItemSecondaryAction>
			</ListItem>
		</React.Fragment>
	);
}

export default InterestsSettings;

const useStyles = makeStyles(theme => ({
	addInterest: {
		color: "#4b7bec",
	},
	grow: {
		flexGrow: 1,
	}
}));
