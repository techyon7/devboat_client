import React, { useEffect, useState, useContext, useCallback } from "react";
import clsx from "clsx";
import { Formik } from "formik";
import { EducationSettingsSchema } from "../validations/validations";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  FormControlLabel,
  Checkbox,
  Box,
  Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { POST, GET, PATCH, DELETE } from "../../actions/api";
import { GlobalContext } from "../../context/GlobalContext";
import DeleteIcon from "@material-ui/icons/Delete";

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
  const [editingId, setEditingId] = useState(null);

  const loadEducations = useCallback(
    async () => {
      const response = await GET("/education", session.token);
      const result = await response.json();
      let educations = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i].user === session.userId) {
          educations = [...educations, result[i]];
        }
      }
      setEducations(educations);
    },
    [session.userId, session.token]
  );

  useEffect(
    () => {
      loadEducations();
    },
    [loadEducations]
  );

  const handleAddEducation = () => {
    setShowEducation(true);
    setState({
      institution_name: "",
      qualification_name: "",
      start_date: null,
      end_date: null,
      currently_studying: true
    });
  };

  const handleDeleteEducation = async edu => {
    await DELETE(`/education/${edu.id}`, session.token);
    loadEducations();
  };

  const handleEditEducation = edu => {
    setEditingId(edu.id);
    setShowEducation(true);
    setState({
      institution_name: edu.institution_name,
      qualification_name: edu.qualification_name,
      start_date: edu.start_date,
      end_date: edu.end_date,
      currently_studying: edu.currently_studying
    });
  };

  const handleSubmit = async data => {
    console.log(state);
    let body = {
      institution_name: data.institution_name,
      qualification_name: data.qualification_name,
      start_date: data.start_date,
      end_date: data.end_date,
      currently_studying: data.currently_studying,
      user: session.userId
    };

    if (editingId) await PATCH(`/education/${editingId}`, body, session.token);
    else await POST("/education", body, session.token);

    setEditingId(null);
    setShowEducation(false);
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
            validationSchema={EducationSettingsSchema}
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
                  error={
                    props.errors.institution_name &&
                    props.touched.institution_name
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.institution_name &&
                    props.touched.institution_name
                      ? props.errors.institution_name
                      : null
                  }
                />
                <TextField
                  placeholder="Qualification"
                  label="Qualification"
                  name="qualification_name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.qualification_name}
                  error={
                    props.errors.qualification_name &&
                    props.touched.qualification_name
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.qualification_name &&
                    props.touched.qualification_name
                      ? props.errors.qualification_name
                      : null
                  }
                />
                <TextField
                  error={
                    props.errors.start_date && props.touched.start_date
                      ? true
                      : false
                  }
                  name="start_date"
                  label="Start Date"
                  type="date"
                  margin="normal"
                  id="start"
                  value={props.values.start_date}
                  onChange={props.handleChange}
                  helperText={
                    props.errors.start_date && props.touched.start_date
                      ? props.errors.start_date
                      : null
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                {!props.values.currently_studying && (
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
                      checked={props.values.currently_studying}
                      onChange={props.handleChange}
                      value="currently_studying"
                      name="currently_studying"
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
          <ListItemText id="switch-list-label" primary="Add a qualification" />
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
      {educations.map(education => (
        <ListItem>
          <ListItemText
            id="switch-list-label"
            primary={education.institution_name}
            secondary={education.qualification_name}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => handleDeleteEducation(education)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEditEducation(education)}>
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
