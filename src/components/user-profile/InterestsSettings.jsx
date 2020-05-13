import React, { useEffect, useState, useContext, useCallback } from "react";
import DoneIcon from '@material-ui/icons/Done';
import { DownshiftMultiple } from '../profile-setup/IntegrationDownshift';
import { skillObjects } from '../../data/skillsArray.js';
import { makeStyles } from '@material-ui/core/styles';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { POST, GET, DELETE } from "../../actions/api";
import { GlobalContext } from "../../context/GlobalContext";

const InterestsSettings = () => {
	const skillsList = skillObjects;
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

	const [interests, setInterests] = React.useState([]);
	const [newInterests, setNewInterests] = React.useState([]);
	const [showInterests, setShowInterests] = useState(false);

	const loadInterests = useCallback(async () => {
		const response = await GET('/interests', session.token);
		const result = await response.json();
		let interests = [];
		for (let i = 0; i < result.length; i++) {
			if (result[i].user === session.userId) {
				interests = [...interests, result[i]];
			}
		}
		setInterests(interests);
	}, [session.userId, session.token]);

	useEffect(() => {
		loadInterests();
	}, [loadInterests]);

	const handleAddInterest = () => {
		setShowInterests(true);
	}

	const handleInterestSubmit = async interest => {
		let body = {
			name: interest,
			user: session.userId
		};

		await POST("/interests", body, session.token);
	};

	const handleSubmit = async () => {
		await newInterests.forEach(interest => handleInterestSubmit(interest));
		setShowInterests(false);
		loadInterests();
	};

	const handleDelete = async (id) => {
		await DELETE(`/interests/${id}`, session.token);
		loadInterests();
	};

	return(
		<React.Fragment>
			{showInterests &&
				<form className={classes.grow}>
					<ListItem>
						<DownshiftMultiple
		          placeholder="Search for interests"
		          label="Interests"
		          name="interests"
		          options={skillsList}
		          onChange={res => setNewInterests(res)}
		        />
					</ListItem>
					<ListItem button component="a" className={classes.addInterest} onClick={handleSubmit}>
						<ListItemText id="switch-list-label" primary="Done" />
						<ListItemSecondaryAction>
							<IconButton className={classes.addInterest}>
									<DoneIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</form>
			}
			{!showInterests &&
				<ListItem button component="a" className={classes.addInterest} onClick={handleAddInterest}>
					<ListItemText id="switch-list-label" primary="Add an interest" />
					<ListItemSecondaryAction>
						<IconButton className={classes.addInterest}>
								<AddBoxOutlinedIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			}
			{interests.map((interest) => (
				<ListItem key={interest.id}>
					<ListItemText id="switch-list-label" primary={interest.name} />
					<ListItemSecondaryAction>
						<IconButton onClick={() => handleDelete(interest.id)}>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</React.Fragment>
	);
}

export default InterestsSettings;

const useStyles = makeStyles(() => ({
	addInterest: {
		color: "#4b7bec",
	},
	grow: {
		flexGrow: 1,
	}
}));
