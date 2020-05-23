import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Typography
} from '@material-ui/core';
import UserPicture from "./UserPicture";
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from "../../actions/api";

export default function Comment(props) {
	const classes = useStyles();
  const { session } = useContext(GlobalContext);

	const [user, setUser] = useState(null);

	useEffect(() => {
		(async () => {
			const response = await GET(`/users/${props.userId}`, session.token);
			const result = await response.json();
			setUser(result);
		})();
	}, [props.userId, session.token]);

	return(
		<Box pl={4} pr={4} mt={4}>
			{user &&
				<Box display="flex" justifyContent="left">
					<Box className={classes.userPic}>
						<UserPicture picture={user.picture} crop={user.cropped_data}/>
					</Box>
					<Box>
						<Typography variant="body1" color="textPrimary" className={classes.title}>
							{`${user.first_name} ${user.last_name}`}
						</Typography>
						<Typography textAlign="left" variant="body1" color="textSecondary" className={classes.small}>
							{props.content}
						</Typography>
					</Box>
				</Box>
			}
		</Box>
	);
}

const useStyles = makeStyles(() => ({
	userPic: {
		width: 24,
		height: 24,
		marginRight: 8,
		cursor: 'pointer'
	},
	title: {
		fontSize: "0.85rem",
		cursor: 'pointer',
		marginBottom: 4,
		lineHeight: 1
	},
	small: {
		fontSize: "0.85rem"
	}
}));
