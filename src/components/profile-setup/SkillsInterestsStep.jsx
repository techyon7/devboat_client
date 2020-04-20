import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { skillObjects } from '../../data/skillsArray.js';
import { SetupSchemaSkills } from '../validations/validations'
import { Formik } from 'formik';
import { DownshiftMultiple } from './IntegrationDownshift';
import { makeStyles } from '@material-ui/styles';
import {
	Box,
	Typography,
	Button,
} from '@material-ui/core';

const SkillsInterestsStep = (props) => {

	// React hooks
		const classes = useStyles();
		const { onSubmit } = props;

		const skills = skillObjects;
		let disabled;
	return(
		<Formik
      initialValues={{
        skills: '',
				interests: ''
      }}
			validationSchema={SetupSchemaSkills}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}

		render={(props) => (
			<form onSubmit={onSubmit}>

					<Box mb={15} width={1}>
						<Typography variant="h4">
							Skills
						</Typography>
						<Typography variant="body1">
							What are some things that you're good at?
						</Typography>

						<DownshiftMultiple
						placeholder="Search for skills"
						label="Skills"
						name="skills"
						options={skills}
						onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values !== undefined ? props.values.skills : undefined}
						/>

						{/* Skills */}
					</Box>
					<Typography variant="h4">
						Interests
					</Typography>
					<Typography variant="body1">
						What are some things that you'd like to learn?
					</Typography>
					<DownshiftMultiple
					placeholder="Search for interests"
					label="Interests"
					options={skills}
					name="interests"
					error={props.errors.interests && props.touched.interests !== undefined ? "error" : undefined}
					helperText={props.errors.interests && props.touched.interests}
					onChange={(e) => {props.handleChange(e); console.log(props.values.interests)}}
					onBlur={props.handleBlur}
					value={props.values.interests}
					/>
					<Box mt={15}>
						<Button type="submit" variant="contained" className={clsx(classes.margin + "btn btn-success")} {...props.values.interests.length > 0 ? undefined : disabled}>
							<Box px={8}>Next</Box>
						</Button>
					</Box>
			</form>

		)}
		/>

	);
}

export default SkillsInterestsStep;

SkillsInterestsStep.propTypes = {
  onSubmit: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,

}

// Styles

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	margin: {
    margin: theme.spacing(1),
  },
  boxPrimary: {
    background: '#4B7BEC'
  },
}));
