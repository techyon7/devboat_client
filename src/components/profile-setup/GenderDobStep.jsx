import React, { useContext } from "react";
import clsx from "clsx";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormControlLabel,
  FormControl
} from "@material-ui/core";
import { SetupSchemaDob } from "../validations/validations";
import { GlobalContext } from "../../context/GlobalContext";
import { PATCH } from "../../actions/api";

const GenderDobStep = props => {
  const classes = useStyles();

  const { session, setSession } = useContext(GlobalContext);
  const { page } = props;
  const { setState } = props;

  const previousPage = () => {
    setState({ page: page - 1 });
  };

  const handleSubmit = async (dob, gender) => {
    let body = {
      dob: dob,
      gender: gender,
      is_setup: 1
    };
    await PATCH(`/users/${session.username}`, body, session.token);
    setSession({
      ...session,
      userIsSetup: true
    });
  };

  const handleSkip = async () => {
    let body = {
      is_setup: 2
    };
    await PATCH(`/users/${session.username}`, body, session.token);
    setSession({
      ...session,
      userIsSetup: true
    });
  };

  return (
    <Formik
      initialValues={{
        dob: ""
      }}
      validationSchema={SetupSchemaDob}
      onSubmit={values => {
        handleSubmit(values.dob, values.sex);
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Box mb={15} width={1}>
            <Box>
              <Typography variant="h4">Date of birth</Typography>
              <Typography variant="body1">When were you born?</Typography>
            </Box>

            <Box width={1} className={classes.root}>
              <TextField
                error={props.errors.dob && props.touched.dob ? true : false}
                name="dob"
                type="date"
                margin="normal"
                id="dob"
                value={props.values.dob}
                onChange={props.handleChange}
                helperText={
                  props.errors.dob && props.touched.dob
                    ? props.errors.dob
                    : null
                }
              />
            </Box>
          </Box>

          <Box display="flex" flexDirection="column">
            {/* Gender Header Text */}
            <Typography variant="h4">Gender</Typography>
            <Typography variant="body1">
              What is your current gender identity?
            </Typography>

            <FormControl
              component="fieldset"
              className={classes.formControl}
              name="sex"
            >
              <RadioGroup
                aria-label="gender"
                name="sex"
                value={props.values.sex}
                onChange={props.handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {props.values.sex === "other" ? (
                <TextField
                  multiline
                  name="gender-info"
                  label="Gender Information"
                  className=""
                />
              ) : null}
            </FormControl>
          </Box>

          <Box mt={15} width={1} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              className={clsx(classes.margin)}
              onClick={previousPage}
            >
              <Box px={8}>Back</Box>
            </Button>
            <div className={classes.buttonContainer}>
              <Box mr={2}>
                <Button
                  variant="contained"
                  onClick={handleSkip}
                  className={clsx(classes.margin + "btn btn-success")}
                >
                  <Box px={8}>Skip</Box>
                </Button>
              </Box>
              <Button
                type="submit"
                variant="contained"
                className={clsx(classes.margin + "btn btn-success")}
              >
                <Box px={8}>Done</Box>
              </Button>
            </div>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default GenderDobStep;

// Styles

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    flexGrow: 1
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  flexGrow: {
    flexGrow: 1
  }
}));
