import React from 'react';
import InterestsSettings from './InterestsSettings';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Dialog,
	Typography,
	Button,
	Divider,
	List,
	ListItem,
	ListSubheader,
	ListItemText,
} from '@material-ui/core';

const skillList = [
	{
		name: 'C',
		ratings: {
			upvotes: 0,
			downvotes: 0,
			devscore: 0,
		},
	},
	{
		name: 'JavaScript',
		ratings: {
			upvotes: 0,
			downvotes: 0,
			devscore: 0,
		},
	},
	{
		name: 'Ruby',
		ratings: {
			upvotes: 0,
			downvotes: 0,
			devscore: 0,
		},
	},
	{
		name: 'Ruby on rails',
		ratings: {
			upvotes: 0,
			downvotes: 0,
			devscore: 0,
		},
	},
	{
		name: 'Perl',
		ratings: {
			upvotes: 0,
			downvotes: 0,
			devscore: 0,
		},
	},
	{
		name: 'Assembly',
		ratings: {
			upvotes: 0,
			downvotes: 0,
			devscore: 0,
		},
	},
	{
		name: 'React JS',
		ratings: {
			upvotes: 0,
			downvotes: 0,
			devscore: 0,
		},
	},
]

const UserInterestsList = () => {
	const classes = useStyles();
	const [interests, setInterests] = React.useState([]);
	const [open, setOpen] = React.useState(false);


	React.useEffect(() => {
		let isSubscribed = true;
		let fakeSkillsAPICall = skillList;
		if(isSubscribed) {
			setInterests(fakeSkillsAPICall);
		}
		return () => isSubscribed = false;
	}, []);

	function handleClickOpen() {
		setOpen(true);
	}

	const handleClose = value => {
		setOpen(false);
	};

	return(
		<Box mt={8}>
			<Box display="flex" justifyContent="space-between">
				<Typography variant="body1" align="left" color="textPrimary">
					<Box fontWeight="fontWeightMedium" component="span">
						Interests
					</Box>
				</Typography>
				<Button className={classes.editBtn} onClick={handleClickOpen}>
					<EditIcon className={classes.subtitleIcon}/>
					<Box pl={1} fontSize="0.5rem">
						Edit
					</Box>
				</Button>
				<Dialog
					fullWidth
					maxWidth="xs"
					onClose={handleClose}
					aria-labelledby="simple-dialog-title"
					open={open}
				>
					<List subheader={
						<ListSubheader>
							<Typography component="span" variant="button" className={classes.dialog}>
								Interests
							</Typography>
						</ListSubheader>}>
						<InterestsSettings />
					</List>
				</Dialog>
			</Box>
			<Divider className={classes.divider} />
			<List>
					{interests.slice(0,5).map(interest => (
						<ListItem className={classes.listItem} key={interest.name}>
							<ListItemText
							primary={<Typography variant="body1" color="textPrimary">{interest.name}</Typography>}
							/>
						</ListItem>
					))}
			</List>
		</Box>
	);
}

export default UserInterestsList;

const useStyles = makeStyles(theme => ({
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
	listItem: {
		paddingLeft: "0 !important",
	},
	divider: {
		height: 2,
		backgroundColor: "#4b7bec",
		width: "1.5rem",
		marginBottom: "1rem",
	},
	editBtn: {
		padding: "0 !important",
	},
}));
