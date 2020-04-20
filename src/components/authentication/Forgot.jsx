import React from 'react';
import clsx from 'clsx';
import ForgotHelpText from './ForgotHelpText';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	TextField,
	Button
} from '@material-ui/core';

// Forgot Component

export default function Forgot() {
	// React Hooks
		const classes = useStyles();

	// JSX Markup
	return(
		<div className={classes.root}>
			<ForgotHelpText />

			{/* Email Input */}
			<TextField
					fullWidth
					label="Email"
					className={clsx(classes.margin, classes.textField)}
					type="email"
					autoComplete="current-email"
					margin="normal"
			 />

			 {/* Reset button container */}
			 <Box width={1} align="center" mt={8}>
				 {/* Reset button */}
				 <Button variant="contained" className={clsx(classes.margin, "btn btn-success")}>
					 <Box px={8}>
						 Reset password
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
