import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';
import { POST } from "../../actions/api";

export default function Forgot(props) {
	const classes = useStyles();

	const [email, setEmail] = useState('');

	const handleReset = async () => {
		const body = { email: email }
		await POST('/users/send_reset_password_email', body);
		props.history.push({
			pathname: '/forgot-sent',
			state: {
				email: email
			}
		})
	}

	return(
		<Paper elevation={false} className={classes.paper} color="textPrimary">
			<div className={classes.root}>
				<Box width={1} align="center" mb={4}>
					<Typography variant="h5" text="center">
						Forgot password?
					</Typography>
					<Box mt={3}>
						<Typography variant="subtitle1" text="center">
							No worries.
							Enter your email below and we'll send a verification email to help you reset your password.
						</Typography>
					</Box>
				</Box>

				<TextField
					fullWidth
					label="Email"
					type="email"
					autoComplete="current-email"
					margin="normal"
					onChange={e => setEmail(e.target.value)}
				/>

				<Box width={1} align="center" mt={8}>
					<Button
						variant="contained"
						className={classes.button}
						onClick={handleReset}>
						<Box px={8}>
							Continue
						</Box>
					</Button>
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
