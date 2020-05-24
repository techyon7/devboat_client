import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Typography,
	Hidden,
	Paper,
	Button
} from '@material-ui/core';
import { POST } from "../../actions/api";

export default function VerifyEmail(props) {
	const classes = useStyles();

	useEffect(() => {
		(async () => {
			const body = { verification_key: props.match.params.verification_key }
			const response = await POST('/users/verify', body);
			if(response.status === 404) {
				props.history.push({
					pathname: '/login'
				});
			}
		})();
	}, [props.history, props.match.params.verification_key]);

	return(
		<Paper elevation={false} className={classes.paper} color="textPrimary">
			<div className={classes.root}>
				<Hidden smDown>
					<Typography variant="h5" text="center">
						Email verification
					</Typography>
				</Hidden>

				<Hidden only={['md', 'lg', 'xl']}>
					<Typography variant="h5" text="center">
						Email verified!
					</Typography>
				</Hidden>

				<Box mt={3}>
					<Typography variant="body1" text="center">
						Your email has been successfully verified.
					</Typography>
				</Box>

				<Box width={1} align="center" mt={6}>
					<Link to='/login'>
						<Button
							variant="contained"
							className={classes.button}>
							<Box px={8}>
								Go to Login
							</Box>
						</Button>
					</Link>
				</Box>
			</div>
		</Paper>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		padding: theme.spacing(2, 10, 2, 10)
	},
	paper: {
		width: "60%",
		textAlign: "center",
		color: theme.palette.text.secondary,
		backgroundColor: theme.palette.secondary.main,
		margin: "0 auto"
	},
	button: {
    margin: theme.spacing(1),
		textTransform: "capitalize",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
}));
