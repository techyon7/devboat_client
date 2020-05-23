import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	Box,
	Button,
	Paper,
	Typography
} from '@material-ui/core';
import UserPicture from "./UserPicture";
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import CreateComment from "./CreateComment";
import Comments from "./Comments";
import { GlobalContext } from "../../context/GlobalContext";
import { POST, GET, DELETE } from "../../actions/api";

export default function Post(props) {
	const classes = useStyles();
  const { session } = useContext(GlobalContext);

	const [upvotes, setUpvotes] = useState([]);
	const [upvotesCount, setUpvotesCount] = useState(0);
	const [upvoteId, setUpvoteId] = useState(null);

	const [comments, setComments] = useState([]);
	const [commentsCount, setCommentsCount] = useState(0);

	useEffect(() => {
		(async () => {
			const response = await GET('/comments', session.token);
			const result = await response.json();
			let comments = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].post === props.id) {
					comments = [...comments, result[i]];
				}
			}
			setComments(comments);
			setCommentsCount(comments.length);
		})();
	}, [session.token]);

	useEffect(() => {
		(async () => {
			const response = await GET('/upvotes', session.token);
			const result = await response.json();
			let upvotes = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].post === props.id) {
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
			post: props.id,
			user: session.userId
		};

		const response = await POST("/upvotes", body, session.token);
		const result = await response.json();
		setUpvoteId(result.id);
		setUpvotesCount(upvotesCount + 1);
	}

	const deleteUpvote = async () => {
		await DELETE(`/upvotes/${upvoteId}`, session.token);
		setUpvoteId(null);
		setUpvotesCount(upvotesCount - 1);
	}

	return(
		<Grid className={classes.item} item xs={12}>
			<Paper elevation={false} className={classes.paper}>
				<Box pl={4} pr={4} mb={4}>
					<Box mb={4} display="flex" alignItems="center" justifyContent="left">
						<Box className={classes.userPic}>
							<UserPicture picture={props.userPicture} crop={props.userCrop}/>
						</Box>
						<Box className={classes.title}>
							<Typography variant="body1" color="textPrimary">
								{`${props.userFirstName} ${props.userLastName}`}
							</Typography>
							<Typography variant="body1" color="textSecondary" className={classes.small}>
								{(new Date(props.date)).toUTCString()}
							</Typography>
						</Box>
					</Box>
					<Typography textAlign="left" variant="body1" color="textSecondary">
						{props.content}
					</Typography>
					<Box mt={4} display="flex" alignItems="center" justifyContent="left">
						<Button
							className={clsx(classes.button, {
								[classes.active]: upvoteId
							})}
							onClick={upvoteId ? deleteUpvote : handleUpvote}>
							<ExpandLessRoundedIcon style={{ fontSize: 20 }}/>
							<Typography variant="body1" color="textSecondary">
								{upvotesCount}
							</Typography>
						</Button>
						<Button
							className={classes.button}>
							<ForumRoundedIcon style={{ fontSize: 18 }}/>
							<Typography variant="body1" color="textSecondary">
								{commentsCount}
							</Typography>
						</Button>
					</Box>
				</Box>
				<Box>
					<CreateComment />
					<Comments comments={comments} />
				</Box>
			</Paper>
		</Grid>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(4, 0, 4, 0),
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.secondary.main
	},
	item: {
    marginBottom: "0.625rem"
  },
	userPic: {
		width: 32,
		height: 32,
		marginRight: 8,
		cursor: 'pointer'
	},
	button: {
		minWidth: 48,
		width: 56,
		height: 30,
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
		color: theme.palette.text.primary
	},
	title: {
		cursor: 'pointer'
	},
	small: {
		fontSize: "0.75rem"
	}
}));
