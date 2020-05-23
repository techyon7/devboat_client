import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	IconButton,
	Box,
	Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const Projects = () => {
	const classes = useStyles();

	const [projects] = useState([]);

	return(
		<Fragment>
			<Box display="flex" alignItems="center" mb={2}>
				<Box mr={1} mb={0.6}>
					<Typography variant="body1" align="left" color="textPrimary">
						Projects
					</Typography>
				</Box>
				<Typography variant="body2" align="left">
						({projects ? projects.length : 0})
				</Typography>
			</Box>
			<Box display="flex" alignItems="center">
				<IconButton className={classes.addProject}>
  				<AddIcon />
				</IconButton>
      </Box>
		</Fragment>
	);
}

export default Projects;

const useStyles = makeStyles(theme => ({
	addProject: {
		backgroundColor: theme.palette.secondary.vice,
		borderRadius: "4px",
		width: 70,
		height: 70,
	}
}));
