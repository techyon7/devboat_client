import React, { useEffect, useState, useContext } from 'react';
import UserDetails from '../user-profile/UserDetails';
import Projects from '../user-profile/Projects';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	Container,
	Paper,
} from '@material-ui/core';
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from "../../actions/api";

const UserProfile = (props) => {
	const classes = useStyles();
	const { session } = useContext(GlobalContext);

	const [user, setUser] = useState(null);
	const isProfileSelf = session.username === props.match.params.username;

	useEffect(() => {
    (async () => {
      const response = await GET(`/users/${props.match.params.username}`, session.token);
      const result = await response.json();
      setUser(result);
    })();
  }, [session.token, props.match.params.username]);

	return(
		<div className={classes.root}>
			{/* Fix maximum width */}
			<Container disableGutters maxWidth="xl">
				{/* Main container */}
				<Grid container direction="row" justify="center">
					{/* User Details */}
					<Grid item xs={12} lg={3}>
						<Paper className={classes.leftPanel}>
							{user &&
								<UserDetails
									userId={user.id}
									username={user.username}
									isProfileSelf={isProfileSelf}/>
							}
						</Paper>
					</Grid>
					{/* Projects & Posts */}
					<Grid item xs={12} lg={6}>
						<Grid container p={0} direction="row" justify="center" alignItems="flex-start" className={classes.alignStart}>
							{/* Projects */}
							<Grid className={classes.item} item xs={12}>
								<Projects />
							</Grid>
							{/* Create Post */}
							<Grid className={classes.item} item xs={12}>
								<Paper className={classes.paper}>Create Post</Paper>
							</Grid>
							{/* Posts */}
							<Grid className={classes.item} item xs={12}>
								<Paper className={classes.paper}>Post</Paper>
							</Grid>
						</Grid>
					</Grid>
					{/* Recommendations */}
					<Grid item xs={12} lg={3}>
						<Grid container p={0} direction="row" justify="center" alignItems="flex-start" className={classes.alignStart}>
							{/* Mentor Recommendations */}
							<Grid className={classes.item} item xs={12} >
								<Paper className={classes.paper}>Mentor Recommendations</Paper>
							</Grid>

							{/* Mentee Recommendations */}
							<Grid className={classes.item} item xs={12}>
								<Paper className={classes.paper}>Mentee Recommendations</Paper>
							</Grid>

							{/* Peer Recommendations */}
							<Grid className={classes.item} item xs={12}>
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
		padding: 0
  },
	leftPanel: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		backgroundColor: theme.palette.background.default,
		boxShadow: '0px 2px 2px #111111'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		backgroundColor: "#262B2F !important"
	},
	item: {
		padding: '0.625rem'
	},
	alignStart: {
		alignSelf: 'start'
	}
}));
