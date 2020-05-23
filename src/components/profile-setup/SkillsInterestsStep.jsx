import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { skillObjects } from "../../data/skillsArray.js";
import { DownshiftMultiple } from "./IntegrationDownshift";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, Button } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import { POST, PATCH } from "../../actions/api";

const SkillsInterestsStep = props => {
  // React hooks
  const classes = useStyles();
  const { session, setSession } = useContext(GlobalContext);
  const { onSubmit } = props;
  const skillsList = skillObjects;

  const [skills, setSkills] = React.useState([]);
  const [interests, setInterests] = React.useState([]);

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
      is_setup: 1
    };
    await PATCH(`/users/${session.userId}`, body, session.token);
    console.log(props);
    setSession({
      userIsSetup: true
    });
    // props.history.push({
    //   pathname: `/${session.username}`
    // });
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

        {/* Skills */}
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

// Styles

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
