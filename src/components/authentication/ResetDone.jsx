import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Typography,
	Hidden,
	Button
} from '@material-ui/core';
import { POST } from "../../actions/api";

export default function ResetDone(props) {
	const classes = useStyles();

	useEffect(() => {
		(async () => {
			const body = { reset_password_key: props.location.state.reset_password_key }
			await POST('/users/reset_done', body);
		})();
	}, [props.location.state.reset_password_key]);

	return(
		<Fragment>
			<Box width={1} align="center">
				<Hidden smDown>
					<Typography variant="h4" text="center">
						Reset password
					</Typography>
				</Hidden>

				<Hidden only={['md', 'lg', 'xl']}>
					<Typography variant="h4" text="center">
						Password reset successful!
					</Typography>
				</Hidden>

				<Box mt={3}>
					<Typography variant="body1" text="center">
						Your password has been successfully reset.
					</Typography>
				</Box>

				<Box width={1} align="center" mt={8}>
					<Link to='/login'>
						<Button variant="contained" className={clsx(classes.margin, "btn btn-success")}>
							<Box px={8}>
								Go to Login
							</Box>
						</Button>
					</Link>
				</Box>
			</Box>
		</Fragment>
	);
}

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  }
}));
