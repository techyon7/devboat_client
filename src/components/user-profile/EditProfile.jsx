import React from 'react';
import SkillsSettings from './SkillsSettings';
import InterestsSettings from './InterestsSettings';
import WorkSettings from './WorkSettings';
import EducationSettings from './EducationSettings';
import {
	Dialog,
	DialogTitle,
	Button,
	Typography,
	List,
	ListSubheader,
} from '@material-ui/core';

const EditProfile = () => {

	const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

	return (
		<React.Fragment>
			<Button variant="outlined" color="default" onClick={handleClickOpen}>
				Edit Profile
			</Button>
			<Dialog
				fullWidth
				maxWidth="xs"
				onClose={handleClose}
				aria-labelledby="simple-dialog-title"
				open={open}
			>
		  	<DialogTitle id="simple-dialog-title" className="bg-cinder-light">Edit your information</DialogTitle>
				<List subheader={
					<ListSubheader>
						<Typography component="span" variant="button">
							Skills
						</Typography>
					</ListSubheader>}>
					<SkillsSettings />
				</List>

				<List subheader={
					<ListSubheader>
						<Typography component="span" variant="button">
							Interests
						</Typography>
					</ListSubheader>}>
					<InterestsSettings />
				</List>

				<List subheader={
					<ListSubheader>
						<Typography component="span" variant="button">
							Work Experience
						</Typography>
					</ListSubheader>}>
					<WorkSettings />
				</List>

				<List subheader={
					<ListSubheader>
						<Typography component="span" variant="button">
							Education
						</Typography>
					</ListSubheader>}>
					<EducationSettings />
				</List>

			</Dialog>
		</React.Fragment>
	);
}

export default EditProfile;
