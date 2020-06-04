import React, { useEffect, useState, useContext, useCallback } from "react";
import clsx from "clsx";
import { Formik } from "formik";
import { WorkSettingsSchema } from "../validations/validations";
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
import { Box, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { POST, GET, PATCH, DELETE } from "../../actions/api";
import { GlobalContext } from "../../context/GlobalContext";
import DeleteIcon from "@material-ui/icons/Delete";

const WorkSettings = () => {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [works, setWorks] = useState([]);
  const [state, setState] = React.useState({
    position: "",
    company_name: "",
    start: null,
    end: null,
    currently_working: true
  });
  const [showWork, setShowWork] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadWorks = useCallback(
    async () => {
      const response = await GET("/job", session.token);
      const result = await response.json();
      let works = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i].user === session.userId) {
          works = [...works, result[i]];
        }
      }
      setWorks(works);
    },
    [session.userId, session.token]
  );

  useEffect(
    () => {
      loadWorks();
    },
    [loadWorks]
  );

  const handleAddWork = () => {
    setShowWork(true);
    setState({
      role: "",
      company_name: "",
      start_date: null,
      end_date: null,
      currently_working: true
    });
  };

  const handleDeleteWork = async job => {
    await DELETE(`/job/${job.id}`, session.token);
    loadWorks();
  };

  const handleEditWork = work => {
    setEditingId(work.id);
    setShowWork(true);
    setState({
      institution_name: work.institution_name,
      qualification_name: work.qualification_name,
      start_date: work.start_date,
      end_date: work.end_date,
      currently_studying: work.currently_studying
    });
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleSubmit = async data => {
    let body = {
      company_name: data.company_name,
      role: data.role,
      start_date: data.start_date,
      end_date: data.end_date,
      currently_working: data.currently_working,
      user: session.userId
    };

    if (editingId) await PATCH(`/job/${editingId}`, body, session.token);
    else await POST("/job", body, session.token);

    setEditingId(null);
    setShowWork(false);
    loadWorks();
  };

  return (
    <React.Fragment>
      {showWork ? (
        <ListItem>
          <Formik
            initialValues={{
              role: state.role,
              company_name: state.company_name,
              start_date: state.start_date,
              end_date: state.end_date,
              currently_working: state.currently_working
            }}
            validationSchema={WorkSettingsSchema}
            onSubmit={values => handleSubmit(values)}
            render={props => (
              <form onSubmit={props.handleSubmit} className={classes.workForm}>
                <TextField
                  placeholder="Position"
                  label="Position"
                  name="role"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.role}
                  error={props.errors.role && props.touched.role ? true : false}
                  helperText={
                    props.errors.role && props.touched.role
                      ? props.errors.role
                      : null
                  }
                />
                <TextField
                  placeholder="Company"
                  label="Company"
                  name="company_name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.company_name}
                  error={
                    props.errors.company_name && props.touched.company_name
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.company_name && props.touched.company_name
                      ? props.errors.company_name
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
                {!state.currently_working && (
                  <TextField
                    error={
                      props.errors.end_date &&
                      props.touched.end_date &&
                      !state.currently_working
                        ? true
                        : false
                    }
                    name="end_date"
                    label="End Date"
                    type="date"
                    margin="normal"
                    id="end"
                    value={props.values.end_date}
                    onChange={props.handleChange}
                    helperText={
                      props.errors.end_date &&
                      props.touched.end_date &&
                      !state.currently_working
                        ? props.errors.end_date
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
                      checked={state.currently_working}
                      onChange={handleChange("currently_working")}
                      value="currently_working"
                      color="primary"
                    />
                  }
                  label="Currently Working"
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
      ) : (
        ""
      )}
      {!showWork && (
        <ListItem
          button
          component="a"
          className={classes.addWork}
          onClick={handleAddWork}
        >
          <ListItemText
            id="switch-list-label"
            primary="Add a work experience"
          />
          <ListItemSecondaryAction className={classes.addWork}>
            <IconButton className={classes.addWork} onClick={handleAddWork}>
              <AddBoxOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
      {works.map(work => (
        <ListItem>
          <ListItemText
            id="switch-list-label"
            primary={work.role}
            secondary={work.company_name}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => handleDeleteWork(work)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEditWork(work)}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default WorkSettings;

const useStyles = makeStyles(theme => ({
  addWork: {
    color: "#4b7bec"
  },
  workForm: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  }
}));
