import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Link
} from 'react-router-dom';
import {
	Box,
	FormControl,
	TextField,
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


// Login Component

export default function Login() {
	// React Hooks
		const classes = useStyles();
		// React States
		const [values, setValues] = React.useState({
	    password: '',
	    showPassword: false,
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
	  const handleMouseDownPassword = event => {
	    event.preventDefault();
	  };

	// JSX Markup
	return(

		<div className={classes.root}>

			{/* Email Input */}
			<TextField
					fullWidth
	        label="Email"
	        className={clsx(classes.margin, classes.textField)}
	        type="email"
	        autoComplete="current-email"
	        margin="normal"
	     />

			{/* Password Input Container */}
			<FormControl fullWidth className={clsx(classes.margin, classes.textField)}>

				{/* Password Input Label */}
	      <InputLabel htmlFor="login-password">Password</InputLabel>

				{/* Password Input Field */}
	      <Input
	        id="login-password"
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

	    </FormControl>

			{/* Forgot password link container */}
			<Box width={1} align="center" mt={5} mb={8}>
					{/* Forgot password link */}
					<Link to="/forgot" className={classes.linkLight}>Forgot your password?</Link>
			</Box>

			{/* Sign in button container */}
			<Box width={1} align="center">
				{/* Sign in button */}
				<Button variant="contained" className={clsx(classes.margin, "btn btn-success")}>
					<Box px={8}>
						Sign in
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
