import React from 'react';
import UserDetails from '../user-profile/UserDetails';
import Projects from '../user-profile/Projects';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	Container,
	Paper,
} from '@material-ui/core';

const UserProfile = () => {
	const classes = useStyles();
	return(
		<div className={classes.root}>
			{/* Fix maximum width */}
			<Container maxWidth="lg">
				{/* Main container */}
				<Grid container spacing={5} direction="row" justify="center">
					{/* User Details */}
					<Grid item xs={12} lg={3}>
						<Paper className={classes.paper}>
							<UserDetails />
						</Paper>
					</Grid>
					{/* Projects & Posts */}
					<Grid item xs={12} lg={6}>
						<Grid container spacing={5} p={0} direction="row" justify="center" alignItems="flex-start" className={classes.alignStart}>
							{/* Projects */}
							<Grid item xs={12}>
								<Projects />
							</Grid>
							{/* Create Post */}
							<Grid item xs={12}>
								<Paper className={classes.paper}>Create Post</Paper>
							</Grid>
							{/* Posts */}
							<Grid item xs={12}>
								<Paper className={classes.paper}>Post</Paper>
							</Grid>
						</Grid>
					</Grid>
					{/* Recommendations */}
					<Grid item xs={12} lg={3}>
						<Grid container spacing={5} p={0} direction="row" justify="center" alignItems="flex-start" className={classes.alignStart}>
							{/* Mentor Recommendations */}
							<Grid item xs={12} >
								<Paper className={classes.paper}>Mentor Recommendations</Paper>
							</Grid>

							{/* Mentee Recommendations */}
							<Grid item xs={12}>
								<Paper className={classes.paper}>Mentee Recommendations</Paper>
							</Grid>

							{/* Peer Recommendations */}
							<Grid item xs={12}>
								<Paper className={classes.paper}>Peer Recommendations</Paper>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default UserProfile;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
		borderRadius: 16,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
		backgroundColor: "#262B2F !important"
  },
	alignStart: {
		alignSelf: 'start'
	}
}));
