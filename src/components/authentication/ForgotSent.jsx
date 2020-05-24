import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	Paper,
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
		<Paper elevation={false} className={classes.paper} color="textPrimary">
			<div className={classes.root}>
				<Box width={1} align="center" mb={4}>
					<Typography variant="h5" text="center">
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

				<Box width={1} align="center" mt={6}>
					<Button
						variant="contained"
						className={classes.button}
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
