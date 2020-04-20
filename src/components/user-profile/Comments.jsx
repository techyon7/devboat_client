import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import {
	TextField,
	Box,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
	Avatar,
	Typography,
	IconButton,
} from '@material-ui/core';
import ReportIcon from '@material-ui/icons/Report';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ReplyIcon from '@material-ui/icons/Reply';

const commentList = [
	{
		user: {
			id: 1,
			fullName: "Aahan Sharma",
		},
		content: "Wow... awesome project!",
		likes: 0,
		comments: 0,
	},
	{
		user: {
			id: 2,
			fullName: "Sparsh Tyagi",
		},
		content: "Thanks! It was fun to work on...",
		likes: 0,
		comments: 0,
	},
];

const Comments = () => {
	const classes = useStyles();

	return(
		<React.Fragment>
			<Formik
			initialValues={{
				comment: '',
			}}

			validationSchema=''

			render={props => (
				<form onSubmit={props.onSubmit}>
					<TextField
					fullWidth
					multiline
					rowsMax="4"
					rows="1"
					value={props.values.comment}
					name='comment'
					placeholder='Add a comment'
					label='Add a comment'
					onChange={props.handleChange}
					onBlur={props.handleBlur}
					/>
					<Box my={3} width={1} align="right">
						<Button variant="contained" color="primary">
							Add comment
						</Button>
					</Box>
				</form>
			)}
			/>
			<List>
				{commentList.map(comment => (
					<React.Fragment key={comment.user.id}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
			          <Avatar alt="Remy Sharp" src="https://picsum.photos/300" />
			        </ListItemAvatar>
							<ListItemText
								primary={
									<Typography
		                component="span"
		                variant="body1"
		                className={classes.inline}
		                color="textPrimary"
										fontWeight="fontWeightMedium"
		              >
										{comment.user.fullName}
									</Typography>
								}
								secondary={comment.content}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
						<Box display="flex" component="span" width={1} justifyContent="flex-end" px={4} my={2}>
							<Box display="flex" component="span" alignItems="center" width={30} mr={3} justifyContent="space-between" alignSelf="end">
								<IconButton onClick={console.log("Liked")} className={classes.subtitle}>
									<FavoriteBorderIcon className={classes.subtitleIcon} />
								</IconButton>
								3
							</Box>
							<Box display="flex" component="span" alignItems="center" width={30} justifyContent="space-between" alignSelf="end">
								<IconButton onClick={console.log("Liked")} className={classes.subtitle}>
									<ReplyIcon className={classes.subtitleIcon} />
								</IconButton>
								4
							</Box>
						</Box>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</List>
		</React.Fragment>
	);
}

export default Comments;

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
  },
	subtitle: {
		fontSize: "0.75rem",
		width: "1rem",
		height: "1rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	subtitleIcon: {
		width: "0.75rem",
		height: "0.75rem",
	},
}));
