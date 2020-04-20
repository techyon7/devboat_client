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

const SkillsSettings = (props) => {
	const classes = useStyles();
	const { onSubmit } = props;
	const [state, setState] = React.useState({
		showSkills: false,
	});

	const skills = skillObjects;

	const handleClickSkills = () => {
		const { showSkills } = state;
		setState({
			showSkills: !showSkills,
		});
	}
	return(
		<React.Fragment>
		{ state.showSkills
			?
			<ListItem>
				<Formik
					initialValues={{
						skills: ''
					}}
					validationSchema={SetupSchemaSkills}
					onSubmit={values => {
						// same shape as initial values
						console.log(values);
					}}

				render={(props) => (
					<form onSubmit={onSubmit} className={classes.grow}>
						<DownshiftMultiple
							placeholder="Search for skills"
							label="Skills"
							name="skills"
							options={skills}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values !== undefined ? props.values.skills : undefined}
							/>
					</form>
				)}
				/>
				</ListItem> : ''
		}
			<ListItem button component="a" className={classes.addSkill} onClick={handleClickSkills}>
				<ListItemText id="switch-list-label" primary={ state.showSkills ? "Done" : "Add a skill"} />
				<ListItemSecondaryAction>
					<IconButton className={classes.addSkill} onClick={handleClickSkills}>
						{state.showSkills ?
							<DoneIcon />
							:
							<AddBoxOutlinedIcon />
						}
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<ListItem>
				<ListItemText id="switch-list-label" primary="C" secondary="0 upvotes" />
				<ListItemSecondaryAction>
          <IconButton>
						<DeleteIcon />
					</IconButton>
        </ListItemSecondaryAction>
			</ListItem>
		</React.Fragment>
	);
}

export default SkillsSettings;

const useStyles = makeStyles(theme => ({
	addSkill: {
		color: "#4b7bec",
	},
	grow: {
		flexGrow: 1,
	}
}));
