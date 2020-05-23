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
			<Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="body1" align="left" color="textPrimary">
					Skills
				</Typography>
				<Button className={classes.editBtn} onClick={handleClickOpen}>
					<EditIcon style={{ fontSize: 16 }}/>
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
			<List disablePadding>
				{skills.map((skill) => (
					<ListItem className={classes.listItem} key={skill.name}>
						<Typography variant="body2">
							{skill.name}
						</Typography>
					</ListItem>
				))}
			</List>
		</Box>
	);
}

export default UserSkillsList;

const useStyles = makeStyles(theme => ({
	listItem: {
		padding: theme.spacing(0.5, 0, 0.5, 0)
	},
	editBtn: {
		padding: 0,
		minWidth: 28,
		width: 28,
		height: 28,
		borderRadius: "50%"
	}
}));
