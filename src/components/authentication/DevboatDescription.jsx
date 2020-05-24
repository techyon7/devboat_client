import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Box, Typography } from '@material-ui/core';
import logo from '../../assets/logo192.png';

export default function DevboatDescription() {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Link to="/">
				<img className={classes.logo} alt="logo" src={logo}/>
			</Link>

			<Box mb={5}>
				<Typography variant="h4">
					A social network for developers
				</Typography>
			</Box>

			<Typography variant="body1">
				<Box component="span">
					<span className={classes.name}>DevBoat</span> is a networking platform built specifically for developers. Our goal was to build a platform where developers could interact with each other. Whether it is to learn to code as a beginner or build a project as a veteran developer.
				</Box>
			</Typography>
		</Box>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		width: "70%",
		margin: "0 auto"
	},
  logo: {
    height: 100,
    width: 100,
		marginBottom: 10
  },
	name: {
		color: theme.palette.primary.main
	}
}));
