import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AuthButtonGroup from '../authentication/AuthButtonGroup';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import VerifyEmail from '../authentication/VerifyEmail';
import Forgot from '../authentication/Forgot';
import ResetSent from '../authentication/ResetSent';
import ChangePassword from '../authentication/ChangePassword';
import DevboatDescription from '../authentication/DevboatDescription';
import { makeStyles } from '@material-ui/styles';
import
{
	Grid,
	Container,
	Box,
	Hidden
}
from '@material-ui/core'

// Authentication Component

export default function Authentication({ children }) {
	// React hooks
		const classes = useStyles();

		// State

		// Event Handlers

	// JSX Markup
	return(

		<div className={classes.root}>
		<Router>
			{/* Grid Layout */}
			<Grid container spacing={0}>


				<Grid item xs={12} lg={6}>
					{/* Form container */}
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" width={1} px={3}>

					{/* Limit Width */}
						<Container maxWidth="sm">
							{/* Add margin between button ground and form */}
							<Box mb={5}>
								<Route path="/(|login|register)"
								render={({ match }) => (
									<React.Fragment>
										{match.isExact ? <AuthButtonGroup /> : null}
									</React.Fragment>
								)}
								/>
							</Box>

							{children}

						</Container>

					</Box>

				</Grid>

				{/* Description container (Hidden in small devices) */}
				<Hidden mdDown>
					<Grid item xs={12} lg={6} className={classes.boxPrimary}>

							<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
								<DevboatDescription />
							</Box>

					</Grid>
				</Hidden>


			</Grid>
			</Router>
		</div>
	);
}

// Styles

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
  boxPrimary: {
    background: '#4B7BEC'
  },
});
