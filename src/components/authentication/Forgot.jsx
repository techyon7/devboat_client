import React, { useState }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
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
		<div className={classes.root}>
			<Box width={1} align="center" mb={8}>
				<Typography variant="h4" text="center">
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
				className={clsx(classes.margin, classes.textField)}
				type="email"
				autoComplete="current-email"
				margin="normal"
				onChange={e => setEmail(e.target.value)}
			/>

			<Box width={1} align="center" mt={8}>
				{/* Reset button */}
				<Button
					variant="contained"
					className={clsx(classes.margin, "btn btn-success")}
					onClick={handleReset}>
					<Box px={8}>
						Reset password
					</Box>
				</Button>
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
