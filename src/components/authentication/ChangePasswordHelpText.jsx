import React from 'react';
import {
	Box,
	Typography
} from '@material-ui/core';

// ChangePasswordHelpText Component

export default function ChangePasswordHelpText() {

	// JSX Markup
	return(
		<Box width={1} align="center" mb={8}>
			<Typography variant="h4" text="center">
				Change Password
			</Typography>
			<Box mt={3}>
				<Typography variant="subtitle1" text="center">
					Enter a new password for your DevBoat account
				</Typography>
			</Box>
		</Box>
	);
}
