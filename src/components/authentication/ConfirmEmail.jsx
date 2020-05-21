import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Typography,
	Hidden,
	Button
} from '@material-ui/core';
import { POST } from "../../actions/api";

export default function ConfirmEmail(props) {
	const classes = useStyles();

	const [isResent, setIsResent] = useState(false);

	useEffect(() => {
		if(!props.location.state.username)
			props.history.push({
				pathname: '/login'
			});
	}, [props.history, props.location.state.username]);

	const handleResend = async () => {
		const body = { username: props.location.state.username }
		await POST('/users/resend_verification_email', body);
		setIsResent(true);
		setTimeout(() => {
			setIsResent(false);
		}, 5000);
	}

	return(
		<React.Fragment>
			<Box width={1} align="center">
				<Hidden smDown>
					<Typography variant="h4" text="center">
						Confirm your email!
					</Typography>
				</Hidden>

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

				<Box width={1} align="center" mt={8}>
					{/* Resend button */}
					<Button
						variant="contained"
						className={clsx(classes.margin, "btn btn-success")}
						onClick={handleResend}>
						<Box px={8}>
							Resend link
						</Box>
					</Button>
					{isResent &&
						<Typography variant="subtitle1" text="center">
							Link has been resent.
						</Typography>
					}
				</Box>
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
