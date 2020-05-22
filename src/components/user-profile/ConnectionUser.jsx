import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
	Fade,
	Paper,
	Popper,
	Typography
} from '@material-ui/core';
import UserPicture from "./UserPicture";
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from "../../actions/api";

const UserConnectionsList = (props) => {
	const classes = useStyles();
	const { session } = useContext(GlobalContext);

	const [user, setUser] = useState(null);

	useEffect(
		() => {
			(async () => {
				let response = await GET(`/users/${props.userId}`, session.token);
				const result = await response.json();
				setUser(result);
			})();
		},
		[session.token, props.userId]
	);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	return (
		<div
			className={classes.user}
			onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
			onMouseLeave={() => setAnchorEl(null)}>
			{user &&
				<Link to={`/${user.username}`}>
					<Popper
						id={id}
						anchorEl={anchorEl}
						open={open}
						placement="top"
						className={classes.bgCinderLight}
						transition
					>
						{({ TransitionProps }) => (
							<Fade {...TransitionProps} timeout={250}>
								<Paper>
									<Typography variant="body2" className={classes.typography}>
										{user.first_name} {user.last_name}
									</Typography>
								</Paper>
							</Fade>
						)}
					</Popper>
					<UserPicture
						picture={user.picture}
						crop={user.cropped_data}/>
				</Link>
			}
		</div>

	);
}

const useStyles = makeStyles((theme) => ({
  user: {
    width: 32,
		height: 32,
		marginRight: 4,
		cursor: 'pointer'
  },
  bgCinderLight: {
		borderRadius: '20%',
    backgroundColor: "#3A4147"
  },
	typography: {
		fontSize: 12,
		color: "#EEE",
		padding: theme.spacing(1, 2, 1, 2),
	},
}));

export default UserConnectionsList;
