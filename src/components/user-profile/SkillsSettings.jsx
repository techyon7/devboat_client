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

const SkillsSettings = () => {
	const skillsList = skillObjects;
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

	const [skills, setSkills] = React.useState([]);
	const [newSkills, setNewSkills] = React.useState([]);
	const [showSkills, setShowSkills] = useState(false);

	const loadSkills = useCallback(async () => {
		const response = await GET('/skills', session.token);
		const result = await response.json();
		let skills = [];
		for (let i = 0; i < result.length; i++) {
			if (result[i].user === session.userId) {
				skills = [...skills, result[i]];
			}
		}
		setSkills(skills);
	}, [session.userId, session.token]);

	useEffect(() => {
		loadSkills();
	}, [loadSkills]);

	const handleAddSkill = () => {
		setShowSkills(true);
	}

	const handleSkillSubmit = async skill => {
		let body = {
			name: skill,
			user: session.userId
		};

		await POST("/skills", body, session.token);
	};

	const handleSubmit = async () => {
		await newSkills.forEach(skill => handleSkillSubmit(skill));
		setShowSkills(false);
		loadSkills();
	};

	const handleDelete = async (id) => {
		await DELETE(`/skills/${id}`, session.token);
		loadSkills();
	};

	return(
		<React.Fragment>
			{showSkills &&
				<form className={classes.grow}>
					<ListItem>
						<DownshiftMultiple
		          placeholder="Search for Skills"
		          label="Skills"
		          name="Skills"
		          options={skillsList}
		          onChange={res => setNewSkills(res)}
		        />
					</ListItem>
					<ListItem button component="a" className={classes.addSkill} onClick={handleSubmit}>
						<ListItemText id="switch-list-label" primary="Done" />
						<ListItemSecondaryAction>
							<IconButton className={classes.addSkill}>
									<DoneIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</form>
			}
			{!showSkills &&
				<ListItem button component="a" className={classes.addSkill} onClick={handleAddSkill}>
					<ListItemText id="switch-list-label" primary="Add a skill" />
					<ListItemSecondaryAction>
						<IconButton className={classes.addSkill}>
								<AddBoxOutlinedIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			}
			{skills.map((skill) => (
				<ListItem key={skill.id}>
					<ListItemText id="switch-list-label" primary={skill.name} />
					<ListItemSecondaryAction>
						<IconButton onClick={() => handleDelete(skill.id)}>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</React.Fragment>
	);
}

export default SkillsSettings;

const useStyles = makeStyles(() => ({
	addSkill: {
		color: "#4b7bec",
	},
	grow: {
		flexGrow: 1,
	}
}));
