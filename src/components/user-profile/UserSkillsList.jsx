import React, { useState, useEffect, useContext } from 'react';
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
	ListSubheader
} from '@material-ui/core';
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from '../../actions/api';

const UserSkillsList = (props) => {
	const classes = useStyles();
	const { session } = useContext(GlobalContext);

	const [open, setOpen] = useState(false);
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await GET('/skills', session.token);
			const result = await response.json();
			let skills = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].user === props.userId) {
					skills = [...skills, result[i]];
				}
			}
			setSkills(skills);
		})();
	}, [props.userId, session.token, open]);

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClickClose() {
		setOpen(false);
	};

	return(
		<Box>
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
					onClose={handleClickClose}
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
			<List disablePadding>
				{skills.map((skill) => (
					<ListItem className={classes.listItem} key={skill.name}>
						<ListItemText
							primary={
								<Typography variant="body2" color="textPrimary">
									{skill.name}
								</Typography>
							}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
}

export default UserSkillsList;

const useStyles = makeStyles(() => ({
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
	},
	editBtn: {
		padding: "0 !important",
	}
}));
