import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	Typography
} from '@material-ui/core';
import UserPicture from "./UserPicture";
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import { GlobalContext } from "../../context/GlobalContext";
import { GET, POST, DELETE } from "../../actions/api";

export default function Comment(props) {
	const classes = useStyles();
  const { session } = useContext(GlobalContext);

	const [user, setUser] = useState(null);

	const [upvotes, setUpvotes] = useState([]);
	const [upvotesCount, setUpvotesCount] = useState(0);
	const [upvoteId, setUpvoteId] = useState(null);

	useEffect(() => {
		(async () => {
			const response = await GET('/comment_upvotes', session.token);
			const result = await response.json();
			let upvotes = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].comment === props.id) {
					upvotes = [...upvotes, result[i]];
					if(result[i].user === session.userId)
						setUpvoteId(result[i].id);
				}
			}
			setUpvotes(upvotes);
			setUpvotesCount(upvotes.length);
		})();
	}, [session.userId, props.id, session.token, setUpvotes]);

	const handleUpvote = async () => {
		const body = {
			comment: props.id,
			user: session.userId
		};

		const response = await POST("/comment_upvotes", body, session.token);
		const result = await response.json();
		setUpvoteId(result.id);
		setUpvotesCount(upvotesCount + 1);
	}

	const deleteUpvote = async () => {
		await DELETE(`/comment_upvotes/${upvoteId}`, session.token);
		setUpvoteId(null);
		setUpvotesCount(upvotesCount - 1);
	}

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
					<Box width="100%">
						<Typography variant="body1" color="textPrimary" className={classes.title}>
							{`${user.first_name} ${user.last_name}`}
						</Typography>
						<Typography textAlign="left" variant="body1" color="textSecondary" className={classes.small}>
							{props.content}
						</Typography>
						<Button
							className={clsx(classes.button, {
								[classes.active]: upvoteId
							})}
							onClick={upvoteId ? deleteUpvote : handleUpvote}>
							<ExpandLessRoundedIcon style={{ fontSize: 12, transform: "scale(1.8)" }}/>
							<Typography variant="body1" color="textPrimary" className={classes.count}>
								{upvotesCount}
							</Typography>
						</Button>
					</Box>
				</Box>
			}
		</Box>
	);
}

const useStyles = makeStyles(theme => ({
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
	button: {
		minWidth: 42,
		height: 22,
		fontSize: 14,
		letterSpacing: 1.1,
		marginRight: 8,
		backgroundColor: theme.palette.secondary.vice,
		borderRadius: "16px",
		textAlign: 'left',
		color: theme.palette.text.primary,
		justifyContent: 'space-around'
	},
	active: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.text.primary,
		'&:hover': {
			 backgroundColor: theme.palette.primary.main,
		},
	},
	small: {
		fontSize: "0.85rem",
		marginBottom: 3,
	},
	count: {
		fontSize: "0.75rem"
	}
}));
