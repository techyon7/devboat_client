import React, { useContext } from "react";
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
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  InputAdornment,
  Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { POST } from "../../actions/api";
import { GlobalContext } from "../../context/GlobalContext";

const WorkSettings = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    showWork: false,
    position: "",
    company: "",
    start: "",
    end: "",
    currentlyWorking: true
  });
  const { onSubmit } = props;
  const { session } = useContext(GlobalContext);
  const handleClickWork = () => {
    const { showWork } = state;
    setState({
      showWork: !showWork,
      position: "",
      company: "",
      start: "",
      end: "",
      currentlyWorking: true
    });
  };

  const prefillInput = () => {
    setState({
      showWork: true,
      position: "Founder & CEO",
      company: "DevBoat",
      start: "2019-05-12",
      end: "",
      currentlyWorking: true
    });
  };
  const handleSubmit = async (
    company,
    position,
    startDate,
    endDate,
    currentlyWorking
  ) => {
    const { showWork } = state;
    setState({
      showWork: !showWork,
      position: "",
      company: "",
      start: "",
      end: "",
      currentlyWorking: true
    });
    let body = {
      company_name: company,
      role: position,
      start_date: startDate,
      end_date: endDate,
      currently_working: currentlyWorking,
      showcase: false,
      user: session.userId
    };

    const response = await POST("/job", body);
    const result = await response.json();

    console.log(result);
    return response.status;
  };
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <React.Fragment>
      {state.showWork ? (
        <ListItem>
          <Formik
            initialValues={{
              position: state.position,
              company: state.company,
              start: state.start,
              end: state.end,
              currentlyWorking: state.currentlyWorking
            }}
            //validationSchema={SetupSchemaSkills}
            onSubmit={values => {
              // same shape as initial values
              handleSubmit(
                values.company,
                values.position,
                values.start,
                values.end,
                values.currentlyWorking
              );
              console.log(values);
            }}
            render={props => (
              <form onSubmit={onSubmit} className={classes.workForm}>
                <TextField
                  placeholder="Position"
                  label="Position"
                  name="position"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={
                    props.values !== undefined
                      ? props.values.position
                      : undefined
                  }
                />
                <TextField
                  placeholder="Company"
                  label="Company"
                  name="company"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={
                    props.values !== undefined
                      ? props.values.company
                      : undefined
                  }
                />
                <TextField
                  error={
                    props.errors.start && props.touched.start ? true : false
                  }
                  name="start"
                  label="Start Date"
                  type="date"
                  margin="normal"
                  id="start"
                  value={props.values.start}
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
                {state.currentlyWorking ? (
                  ""
                ) : (
                  <TextField
                    error={props.errors.end && props.touched.end ? true : false}
                    name="end"
                    label="End Date"
                    type="date"
                    margin="normal"
                    id="end"
                    value={props.values.end}
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
                      checked={state.currentlyWorking}
                      onChange={handleChange("currentlyWorking")}
                      value="currentlyWorking"
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
      <ListItem
        button
        component="a"
        className={classes.addWork}
        onClick={handleClickWork}
      >
        <ListItemText
          id="switch-list-label"
          primary={!state.showWork && "Add a work experience"}
        />
        <ListItemSecondaryAction className={classes.addWork}>
          <IconButton className={classes.addWork} onClick={handleClickWork}>
            {!state.showWork && <AddBoxOutlinedIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText
          id="switch-list-label"
          primary="Founder & CEO"
          secondary="DevBoat"
        />
        <ListItemSecondaryAction>
          <IconButton onClick={prefillInput}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
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
