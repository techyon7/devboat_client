import React, { useState, useEffect, useContext } from 'react';
import WorkSettings from './WorkSettings';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Dialog,
	Typography,
	Button,
	List,
	ListItem,
	ListSubheader,
	ListItemText,
} from '@material-ui/core';
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from '../../actions/api';

const UserWorkList = (props) => {
	const classes = useStyles();
	const { session } = useContext(GlobalContext);

	const [open, setOpen] = useState(false);
	const [works, setWorks] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await GET('/job', session.token);
			const result = await response.json();
			let works = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].user === props.userId) {
					works = [...works, result[i]];
				}
			}
			setWorks(works);
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
					Work Experience
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
								Work Experience
							</Typography>
						</ListSubheader>}>
						<WorkSettings />
					</List>
				</Dialog>
			</Box>
			<List disablePadding>
				{works.map((work) => (
					<ListItem className={classes.listItem} key={work.id}>
						<ListItemText
							primary={
								<Typography variant="body2">
									{work.role} at <span className={classes.highlight}>{work.company_name}</span>
								</Typography>
							}
							secondary={
								<Typography variant="body2" className={classes.small}>
									{work.start_date} to {work.end_date ? work.end_date : "Present"}
								</Typography>
							}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
}

export default UserWorkList;

const useStyles = makeStyles(theme => ({
	highlight: {
		color: "rgba(255, 255, 255, 0.85)",
	},
	listItem: {
		padding: theme.spacing(0.5, 0, 0.5, 0)
	},
	small: {
		fontSize: "0.75rem"
	},
	editBtn: {
		padding: 0,
		minWidth: 28,
		width: 28,
		height: 28,
		borderRadius: "50%"
	}
}));
