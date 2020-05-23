import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	IconButton,
	Grid,
	Box,
	Button,
	Paper,
	Typography
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import UserPicture from "./UserPicture";
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from "../../actions/api";

export default function Posts(props) {
	const classes = useStyles();
  const { session } = useContext(GlobalContext);

	return(
		<Grid className={classes.item} item xs={12}>
			<Paper elevation={false} className={classes.paper}>
				<Box mb={4} display="flex" alignItems="center" justifyContent="left">
					<Box className={classes.userPic}>
						<UserPicture picture={props.userPicture} crop={props.userCrop}/>
					</Box>
					<Typography variant="body1" color="textPrimary">
						{`${props.userFirstName} ${props.userLastName}`}
					</Typography>
				</Box>
				<Typography textAlign="left" variant="body1" color="textSecondary">
					{props.content}
				</Typography>
			</Paper>
		</Grid>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(4, 3.5, 3, 4),
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.secondary.main
	},
	item: {
    marginBottom: "0.625rem"
  },
	userPic: {
		width: 32,
		height: 32,
		marginRight: 8,
		cursor: 'pointer'
	}
}));
