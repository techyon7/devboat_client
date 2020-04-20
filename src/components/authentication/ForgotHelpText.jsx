import React from 'react';
import {
	Box,
	Typography
} from '@material-ui/core';

// ForgotHelpText Component

export default function ForgotHelpText() {

	// JSX Markup
	return(
		<Box width={1} align="center" mb={8}>
			<Typography variant="h4" text="center">
				Forgot password?
			</Typography>
			<Box mt={3}>
				<Typography variant="subtitle1" text="center">
					Forgot your password? No worries! Changing your password is easy. Just enter your email below to reset your password
				</Typography>
			</Box>
		</Box>
	);
}
