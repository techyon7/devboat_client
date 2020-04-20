import React from 'react';
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

const workList = [
	{
		id: 1,
		position: 'Founder & CEO',
		company: 'DevBoat',
		location: 'New Delhi, Delhi, India',
		start: 'May, 2019',
		end: 'Present'
	},
];

const UserWorkList = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

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
					onClose={handleClose}
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
			<List>
					{workList.slice(0,5).map((work, index) => (
						<ListItem className={classes.listItem} key={work.id}>
							<ListItemText
							primary={
								<Typography variant="body1" color="textPrimary">
									<Box fontWeight="fontWeightMedium" component="span">
										{work.position}
									</Box>
								</Typography>}
							secondary={

								<Box display="flex" component="span" alignItems="center" width={1} justifyContent="space-between">
									<Grid component="span" container>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle1" className={classes.subtitle}>
													{work.company}
											</Typography>
										</Grid>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle2" className={classes.small}>
												{work.start} - {work.end}
											</Typography>
										</Grid>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle2" className={classes.small}>
												{work.location}
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

const useStyles = makeStyles(theme => ({
	subtitle: {
		fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
		lineHeight: 1,
		marginTop: 4,
		marginBottom: 16,
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
	small: {
		fontSize: "0.75rem",
	},
	editBtn: {
		padding: "0 !important",
	},
}));
