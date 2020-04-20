import React from 'react';
import SkillsSettings from './SkillsSettings';
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
	ListItemText,
	ListSubheader,
	IconButton
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const skillList = [
	{
		name: 'C',
		ratings: {
			upvotes: {
				count: 0,
				users: [],
			},
			downvotes: {
				count: 0,
				users: [],
			},
			devscore: 0,
		},
	},
	{
		name: 'JavaScript',
		ratings: {
			upvotes: {
				count: 0,
				users: [],
			},
			downvotes: {
				count: 0,
				users: [],
			},
			devscore: 0,
		},
	},
	{
		name: 'Ruby',
		ratings: {
			upvotes: {
				count: 0,
				users: [],
			},
			downvotes: {
				count: 0,
				users: [],
			},
			devscore: 0,
		},
	},
	{
		name: 'Ruby on rails',
		ratings: {
			upvotes: {
				count: 0,
				users: [],
			},
			downvotes: {
				count: 0,
				users: [],
			},
			devscore: 0,
		},
	},
	{
		name: 'Perl',
		ratings: {
			upvotes: {
				count: 0,
				users: [],
			},
			downvotes: {
				count: 0,
				users: [],
			},
			devscore: 0,
		},
	},
	{
		name: 'Assembly',
		ratings: {
			upvotes: {
				count: 0,
				users: [],
			},
			downvotes: {
				count: 0,
				users: [],
			},
			devscore: 0,
		},
	},
	{
		name: 'React JS',
		ratings: {
			upvotes: {
				count: 0,
				users: [],
			},
			downvotes: {
				count: 0,
				users: [],
			},
			devscore: 0,
		},
	},
]

const UserSkillsList = () => {
	const classes = useStyles();
	const [skills, setSkills] = React.useState([]);
	const [open, setOpen] = React.useState(false);


	React.useEffect(() => {
		let isSubscribed = true;
		let fakeSkillsAPICall = skillList;
		if(isSubscribed) {
			setSkills(fakeSkillsAPICall);
		}
		return () => isSubscribed = false;
	}, []);

	function handleClickOpen() {
		setOpen(true);
	}

	const handleClose = value => {
		setOpen(false);
	};

	const upvote = (index) => {
		let skillsCopy = [...skills];
		let isUpdated = false;
		skillsCopy[index].ratings.upvotes.count += 1;
		isUpdated = true;
		if (isUpdated) {
			setSkills(skillsCopy);
			isUpdated = false;
		}
	}

	return(
		<Box mt={8}>
			<Box display="flex" justifyContent="space-between">
				<Typography variant="body1" align="left" color="textPrimary">
					<Box fontWeight="fontWeightMedium" component="span">
						Skills
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
								Skills
							</Typography>
						</ListSubheader>}>
						<SkillsSettings />
					</List>
				</Dialog>
			</Box>
			<Divider className={classes.divider} />
			<List>
					{skills.slice(0,5).map((skill, index) => (
						<ListItem className={classes.listItem} key={skill.name}>
							<ListItemText
							primary={<Typography variant="body1" color="textPrimary">{skill.name}</Typography>}
							secondary={
								<Box display="flex" component="span" alignItems="center" width={35} justifyContent="space-between">
									<IconButton onClick={() => upvote(index)} className={classes.subtitle}>
										<ThumbUpIcon className={classes.subtitleIcon} />
									</IconButton>
									{skill.ratings.upvotes.count}
								</Box>
							}
							/>
						</ListItem>
					))}
			</List>
		</Box>
	);
}

export default UserSkillsList;

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
	dialog: {
		minWidth: "50rem",
	},
}));
