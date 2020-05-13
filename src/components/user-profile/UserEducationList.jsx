import React, { useState, useEffect, useContext } from 'react';
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
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from '../../actions/api';

const UserEducationList = (props) => {
	const classes = useStyles();
	const { session } = useContext(GlobalContext);

	const [open, setOpen] = useState(false);
	const [educations, setEducations] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await GET('/education', session.token);
			const result = await response.json();
			let educations = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].user === props.userId) {
					educations = [...educations, result[i]];
				}
			}
			setEducations(educations);
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
					onClose={handleClickClose}
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
			<List disablePadding>
				{educations.map((education) => (
					<ListItem className={classes.listItem} key={education.id}>
						<ListItemText
							primary={
								<Typography variant="body2" color="textPrimary">
									<Box fontWeight="fontWeightMedium" component="span">
										{education.institution_name}
									</Box>
								</Typography>
							}
							secondary={
								<Box display="flex" component="span" alignItems="center" width={1} justifyContent="space-between">
									<Grid component="span" container>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle1" className={classes.subtitle}>
													{education.qualification_name}
											</Typography>
										</Grid>
										<Grid component="span" item xs={12}>
											<Typography component="span" variant="subtitle2" className={classes.small}>
												{education.start_date} - {education.end_date ? education.end_date : "Present"}
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
		width: "1.5rem",
	},
	small: {
		fontSize: "0.75rem",
	},
}));
