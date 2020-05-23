import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { skillObjects } from "../../data/skillsArray.js";
import { DownshiftMultiple } from "./IntegrationDownshift";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, Button } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import { POST, PATCH } from "../../actions/api";

const SkillsInterestsStep = props => {
  const classes = useStyles();
  const { session, setSession } = useContext(GlobalContext);
  const { onSubmit } = props;
  const skillsList = skillObjects;

  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);

  const handleSkillSubmit = async skills => {
    let body = {
      name: skills,
      user: session.userId
    };

    await POST("/skills", body, session.token);
  };

  const handleInterestSubmit = async interest => {
    let body = {
      name: interest,
      user: session.userId
    };

    await POST("/interests", body, session.token);
  };

  const handleSubmit = async () => {
    await skills.forEach(skill => handleSkillSubmit(skill));
    await interests.forEach(interest => handleInterestSubmit(interest));
    onSubmit();
  };

  const handleSkip = async () => {
    let body = {
      is_setup: 2
    };
    await PATCH(`/users/${session.username}`, body, session.token);
    setSession({
      ...session,
      userIsSetup: 2
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={15} width={1}>
        <Typography variant="h4">Skills</Typography>
        <Typography variant="body1">
          What are some things that you're good at?
        </Typography>

        <DownshiftMultiple
          placeholder="Search for skills"
          label="Skills"
          name="skills"
          options={skillsList}
          onChange={res => setSkills(res)}
        />
      </Box>

      <Typography variant="h4">Interests</Typography>
      <Typography variant="body1">
        What are some things that you'd like to learn?
      </Typography>

      <DownshiftMultiple
        placeholder="Search for interests"
        label="Interests"
        name="interests"
        options={skillsList}
        onChange={res => setInterests(res)}
      />

      <div className={classes.buttonContainer}>
        <Box mt={15}>
          <Button
            variant="contained"
            onClick={handleSkip}
            className={clsx(classes.margin + "btn btn-success")}
          >
            <Box px={8}>Skip</Box>
          </Button>
        </Box>
        <Box mt={15} ml={2}>
          <Button
            type="submit"
            variant="contained"
            className={clsx(classes.margin + "btn btn-success")}
          >
            <Box px={8}>Next</Box>
          </Button>
        </Box>
      </div>
    </form>
  );
};

export default SkillsInterestsStep;

SkillsInterestsStep.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  },
  boxPrimary: {
    background: "#4B7BEC"
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  }
}));
