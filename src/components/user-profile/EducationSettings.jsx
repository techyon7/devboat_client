import React, { useEffect, useState, useContext, useCallback } from "react";
import clsx from "clsx";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import {
  Box,
  Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { POST, GET } from "../../actions/api";
import { GlobalContext } from "../../context/GlobalContext";

const EducationSettings = () => {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

	const [educations, setEducations] = useState([]);
  const [state, setState] = useState({
    institution_name: "",
    qualification_name: "",
    start_date: null,
    end_date: null,
    currently_studying: true
  });
  const [showEducation, setShowEducation] = useState(false);

  const loadEducations = useCallback(async () => {
    const response = await GET('/education', session.token);
    const result = await response.json();
    let educations = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].user === session.userId) {
        educations = [...educations, result[i]];
      }
    }
    setEducations(educations);
  }, [session.userId, session.token]);

  useEffect(() => {
    loadEducations();
  }, [loadEducations]);

  const handleAddEducation = () => {
    setShowEducation(!showEducation);
    setState({
      institution_name: "",
      qualification_name: "",
      start_date: null,
      end_date: null,
      currently_studying: true
    });
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleSubmit = async (data) => {
    let body = {
      institution_name: data.institution_name,
      qualification_name: data.qualification_name,
      start_date: data.start_date,
      end_date: data.end_date,
      currently_studying: data.currently_studying,
      user: session.userId
    };

    await POST("/education", body, session.token);
    setShowEducation(!showEducation);
    loadEducations();
  };

  return (
    <React.Fragment>
      {showEducation && (
        <ListItem>
          <Formik
            initialValues={{
              institution_name: state.institution_name,
              qualification_name: state.qualification_name,
              start_date: state.start_date,
              end_date: state.end_date,
              currently_studying: state.currently_studying
            }}
            onSubmit={values => handleSubmit(values)}
            render={props => (
              <form
                onSubmit={props.handleSubmit}
                className={classes.educationForm}
              >
                <TextField
                  placeholder="Institution"
                  label="Institution"
                  name="institution_name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.institution_name}
                />
                <TextField
                  placeholder="Qualification"
                  label="Qualification"
                  name="qualification_name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.qualification_name}
                />
                <TextField
                  error={
                    props.errors.start && props.touched.start ? true : false
                  }
                  name="start_date"
                  label="Start Date"
                  type="date"
                  margin="normal"
                  id="start"
                  value={props.values.start_date}
                  onChange={props.handleChange}
                  helperText={
                    props.errors.start && props.touched.start
                      ? props.errors.start
                      : null
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                {!state.currently_studying && (
                  <TextField
                    error={props.errors.end && props.touched.end ? true : false}
                    name="end_date"
                    label="End Date"
                    type="date"
                    margin="normal"
                    id="end"
                    value={props.values.end_date}
                    onChange={props.handleChange}
                    helperText={
                      props.errors.end && props.touched.end
                        ? props.errors.end
                        : null
                    }
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.currently_studying}
                      onChange={handleChange("currently_studying")}
                      value="currently_studying"
                      color="primary"
                    />
                  }
                  label="Currently Studying"
                />
                <Box width={1} align="center" mt={8}>
                  {/* Sign up button */}
                  <Button
                    variant="contained"
                    className={clsx(classes.margin, "btn btn-success")}
                    type="submit"
                  >
                    <Box px={8}>Done</Box>
                  </Button>
                </Box>
              </form>
            )}
          />
        </ListItem>
      )}
      {!showEducation && (
        <ListItem
          button
          component="a"
          className={classes.addEducation}
          onClick={handleAddEducation}
        >
          <ListItemText
            id="switch-list-label"
            primary="Add a qualification"
          />
          <ListItemSecondaryAction className={classes.addEducation}>
            <IconButton
              className={classes.addEducation}
              onClick={handleAddEducation}
            >
              <AddBoxOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
      {educations.map((education) => (
        <ListItem>
          <ListItemText
            id="switch-list-label"
            primary={education.institution_name}
            secondary={education.qualification_name}
          />
          <ListItemSecondaryAction>
            <IconButton>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default EducationSettings;

const useStyles = makeStyles(() => ({
  addEducation: {
    color: "#4b7bec"
  },
  educationForm: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  }
}));
