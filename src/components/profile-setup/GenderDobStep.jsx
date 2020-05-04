import React, { Fragment, useContext } from "react";
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
import { POST } from "../../actions/api";

// Main [component (sort of)] function

const GenderDobStep = props => {
  // React Hooks
  const classes = useStyles();
  const { page } = props;
  const { setState } = props;
  const { session } = useContext(GlobalContext);
  const previousPage = state => {
    setState({ page: page - 1 });
  };

  // JSX Markup
  return (
    <Formik
      initialValues={{
        dob: ""
      }}
      validationSchema={SetupSchemaDob}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Box mb={15} width={1}>
            {/* Date of Birth Header Text */}
            <Box>
              <Typography variant="h4">Date of birth</Typography>
              <Typography variant="body1">When were you born?</Typography>
            </Box>

            {/* Date of Birth Input Container */}
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

          {/* Gender Input Container */}
          <Box display="flex" flexDirection="column">
            {/* Gender Header Text */}
            <Typography variant="h4">Gender</Typography>
            <Typography variant="body1">
              What is your current gender identity?
            </Typography>

            {/* Gender Input Options */}
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
              {/* Additional gender information input (shows when "other" is selected) */}
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

          {/* Buttons container */}
          <Box mt={15} width={1} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              className={clsx(classes.margin)}
              onClick={previousPage}
            >
              <Box px={8}>Back</Box>
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={clsx(classes.margin + "btn btn-success")}
            >
              <Box px={8}>Done</Box>
            </Button>
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
