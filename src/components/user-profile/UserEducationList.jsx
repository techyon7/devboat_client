import React from 'react';
import EducationSettings from './EducationSettings';
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

const educationList = [
	{
		id: 1,
		qualification: 'Foundation Degree in Natural Sciences',
		institution: 'Delhi Public School, Ranchi',
		location: 'Ranchi, Jharkhand, India',
		start: 'April, 2016',
		end: 'May, 2018'
	},
];

const UserEducationList = () => {
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
						Education
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
								Education
							</Typography>
						</ListSubheader>}>
						<EducationSettings />
					</List>
				</Dialog>
			</Box>
			<Divider className={classes.divider} />
			<List>
					{educationList.slice(0,5).map((education, index) => (
						<ListItem className={classes.listItem} key={education.id}>
							<ListItemText
							primary={
								<Typography variant="body1" color="textPrimary">
									<Box fontWeight="fontWeightMedium" component="span">
										{education.institution}
									</Box>
								</Typography>}
							secondary={

								<Box display="flex" component="span" alignItems="center" width={1} justifyContent="space-between">
									<Grid component="span" container>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle1" className={classes.subtitle}>
													{education.qualification}
											</Typography>
										</Grid>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle2" className={classes.small}>
												{education.start} - {education.end}
											</Typography>
										</Grid>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle2" className={classes.small}>
												{education.location}
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

export default UserEducationList;

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
}));
