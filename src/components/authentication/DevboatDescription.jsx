import React from 'react';
import { Container, Box, Typography } from '@material-ui/core'

export default function DevboatDescription() {
	return(
		<Container maxWidth="sm">
			<Box mb={5}>
				<Typography variant="h3">
					A social network for developers
				</Typography>
			</Box>

			<Typography variant="body1">
				<Box component="span">
					DevBoat is a networking platform built specifically for developers. Our goal was to build a platform where developers could interact with each other. Whether it is to learn to code as a beginner or build a project as a veteran developer.
				</Box>
			</Typography>
		</Container>
	);
}
