import React, { useState, useEffect, useContext } from 'react';
import WorkSettings from './WorkSettings';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Grid,
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
			<Box display="flex" justifyContent="space-between">
				<Typography variant="body1" align="left" color="textPrimary">
					<Box fontWeight="fontWeightMedium" component="span">
						Work Experience
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
								Work Experience
							</Typography>
						</ListSubheader>}>
						<WorkSettings />
					</List>
				</Dialog>
			</Box>
			<Divider className={classes.divider} />
			<List disablePadding>
				{works.map((work) => (
					<ListItem className={classes.listItem} key={work.id}>
						<ListItemText
							primary={
								<Typography variant="body2" color="textPrimary">
									<Box fontWeight="fontWeightMedium" component="span">
										{work.role}
									</Box>
								</Typography>
							}
							secondary={
								<Box display="flex" component="span" alignItems="center" width={1} justifyContent="space-between">
									<Grid component="span" container>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle1" className={classes.subtitle}>
													{work.company_name}
											</Typography>
										</Grid>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle2" className={classes.small}>
												{work.start_date} - {work.end_date ? work.end_date : "Present"}
											</Typography>
										</Grid>
									</Grid>
								</Box>
							}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
}

export default UserWorkList;

const useStyles = makeStyles(() => ({
	subtitle: {
		fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
		lineHeight: 1,
		marginTop: 1,
		marginBottom: 1,
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
		width: "1.5rem"
	},
	small: {
		fontSize: "0.75rem",
	},
	editBtn: {
		padding: "0 !important",
	},
}));
