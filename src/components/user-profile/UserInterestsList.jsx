import React, { useState, useEffect, useContext } from 'react';
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
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from '../../actions/api';

const UserInterestsList = (props) => {
	const classes = useStyles();
	const { session } = useContext(GlobalContext);

	const [open, setOpen] = useState(false);
	const [interests, setInterests] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await GET('/interests', session.token);
			const result = await response.json();
			let interests = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].user === props.userId) {
					interests = [...interests, result[i]];
				}
			}
			setInterests(interests);
		})();
	}, [props.userId, session.token, open]);

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClickClose() {
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
					onClose={handleClickClose}
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
				{interests.map(interest => (
					<ListItem className={classes.listItem} key={interest.name}>
						<ListItemText
							primary={
								<Typography variant="body1" color="textPrimary">
									{interest.name}
								</Typography>
							}
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
