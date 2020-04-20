import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Typography,
	Hidden,
	Button
} from '@material-ui/core';

// VerifyEmail Component

export default function VerifyEmail() {
	// React Hooks
		const classes = useStyles();

	// JSX Markup
	return(
		<React.Fragment>
			<Box width={1} align="center">

			{/* Hide longer text on smaller devices */}
				<Hidden smDown>
					<Typography variant="h4" text="center">
						Confirm your email!
					</Typography>
				</Hidden>

				{/* Hide shorter text on bigger devices */}
				<Hidden only={['md', 'lg', 'xl']}>
					<Typography variant="h4" text="center">
						Confirm email
					</Typography>
				</Hidden>

				<Box mt={3}>
					<Typography variant="body1" text="center">
						Your account has been successfully created on DevBoat. To complete the process please check your email for a verification request.
					</Typography>
				</Box>
			</Box>

			{/* Resend button container */}
			<Box width={1} align="center" mt={8}>
				{/* Resend button */}
				<Button variant="contained" className={clsx(classes.margin, "btn btn-success")}>
					<Box px={8}>
						Resend link
					</Box>
				</Button>

			</Box>

		</React.Fragment>
	);
}

// Styles

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  }
}));
