import React from 'react';
import clsx from 'clsx';
import ChangePasswordHelpText from './ChangePasswordHelpText';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	FormControl,
	FormHelperText,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	Button
} from '@material-ui/core';

import
{
	Visibility,
	VisibilityOff
} from '@material-ui/icons';


// ChangePassword Component

export default function ChangePassword() {
	// React Hooks
		const classes = useStyles();
		// React States
		const [values, setValues] = React.useState({
			password: '',
			confirmPassword: '',
			showPassword: false,
			showPasswordConfirmation: false,
		});
		// Event Handlers

			//
			const handleChange = prop => event => {
				setValues({ ...values, [prop]: event.target.value });
			};

			//
			const handleClickShowPassword = () => {
				setValues({ ...values, showPassword: !values.showPassword });
			};

			//
			const handleClickShowPasswordConfirmation = () => {
				setValues({ ...values, showPasswordConfirmation: !values.showPasswordConfirmation });
			};

			//
			const handleMouseDownPassword = event => {
				event.preventDefault();
			};


	// JSX MArkup
	return(
		<div className={classes.root}>
			<ChangePasswordHelpText />

			<FormControl fullWidth className={clsx(classes.margin, classes.textField)}>

				{/* Password Input Label */}
				<InputLabel htmlFor="change-password">Password</InputLabel>

				{/* Password Input Field */}
				<Input
					id="change-password"
					type={values.showPassword ? 'text' : 'password'}
					value={values.password}
					onChange={handleChange('password')}
					endAdornment={
						/* Password Visibility Icon Container*/

						<InputAdornment position="end">
							{/* Toggle Password Visibility Icon */}
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{values.showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>

						</InputAdornment>
				}/>
				<FormHelperText id="change-password-helper-text">The password must be at least 8 characters long, contain a number, a
	symbol, an uppercase and a lowercase letter.</FormHelperText>


			</FormControl>

			{/* Password Confirmation Input Container */}
			<FormControl fullWidth className={clsx(classes.margin, classes.textField)}>

				{/* Password Confirmation Input Label */}
				<InputLabel htmlFor="change-password-confirmation">Confirm Password</InputLabel>

					{/* Password Confirmation Input Field */}
					<Input
						id="change-password-confirmation"
						type={values.showPasswordConfirmation ? 'text' : 'password'}
						value={values.confirmPassword}
						onChange={handleChange('confirmPassword')}
						endAdornment={
							/* Password Visibility Icon Container*/

							<InputAdornment position="end">
								{/* Toggle Password Visibility Icon */}
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPasswordConfirmation}
									onMouseDown={handleMouseDownPassword}
								>
									{values.showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
								</IconButton>

							</InputAdornment>
						}/>

			</FormControl>

			 {/* Change password button container */}
			 <Box width={1} align="center" mt={8}>
				 {/* CHange password button */}
				 <Button variant="contained" className={clsx(classes.margin, "btn btn-success")}>
					 <Box px={8}>
						 Change Password
					 </Box>
				 </Button>
			 </Box>
		</div>
	);
}

// Styles

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,

	},
  margin: {
    margin: theme.spacing(1),
  },
	textField: {
    flexBasis: 200,
  },
	linkLight: {
		color: '#fff'
	}
}));
