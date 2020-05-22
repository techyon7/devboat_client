import React, { useState }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	Typography
} from '@material-ui/core';
import { POST } from "../../actions/api";

export default function ForgotSent(props) {
	const classes = useStyles();

	const [isResent, setIsResent] = useState(false);

	const handleResend = async () => {
		const body = { email: props.location.state.email }
		await POST('/users/send_reset_password_email', body);
		setIsResent(true);
		setTimeout(() => {
			setIsResent(false);
		}, 5000);
	}

	return(
		<div className={classes.root}>
			<Box width={1} align="center" mb={8}>
				<Typography variant="h4" text="center">
					Reset Password Instructions Sent
				</Typography>
				{props.location.state.email &&
					<Box mt={3}>
						<Typography variant="body1" text="center">
							Reset password link has been sent to {props.location.state.email}. Please check your mail box for instructions to reset your password.
						</Typography>
					</Box>
				}
			</Box>

			<Box width={1} align="center" mt={8}>
				{/* Reset button */}
				<Button
					variant="contained"
					className={clsx(classes.margin, "btn btn-success")}
					onClick={handleResend}>
					<Box px={8}>
						Resend Link
					</Box>
				</Button>

				{isResent &&
					<Typography variant="subtitle1" text="center">
						Link has been resent.
					</Typography>
				}
			</Box>
		</div>
	);
}

// Styles

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
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
