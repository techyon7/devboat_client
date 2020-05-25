import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RegistrationSchema } from "../validations/validations";
import { Formik } from "formik";
import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Typography
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import { POST } from "../../actions/api";

const RegisterForm = props => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    showPassword: false,
    showPasswordConfirmation: false
  });
  const [errorValues, setErrorValues] = React.useState({
    showError: false,
    errorValue: null
  });
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleClickShowPasswordConfirmation = () => {
    setState({
      ...state,
      showPasswordConfirmation: !state.showPasswordConfirmation
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = async (
    username,
    email,
    firstName,
    lastName,
    password
  ) => {
    let body = {
      username: username,
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      dob: "1998-11-10",
      gender: "Male"
    };

    const response = await POST("/users", body);
    if (response.status === 400) {
      setErrorValues({
        showError: true,
        errorValue: response.text
      });
    }
    return response;
  };
  return (
    <Formik
      initialValues={{
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: ""
      }}
      validationSchema={RegistrationSchema}
      onSubmit={async values => {
        let response = await handleSubmit(
          values.username,
          values.email,
          values.firstName,
          values.lastName,
          values.password
        );
        if (response.status === 201) {
          props.history.push({
            pathname: "/confirm",
            state: {
              username: values.username
            }
          });
        }
      }}
      render={props => (
        <form onSubmit={props.handleSubmit} className={classes.root}>
          <Box width={1} display="flex" justifyContent="space-between">
            <TextField
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name="firstName"
              label="First Name"
              value={props.values.firstName}
              className={classes.firstName}
              margin="normal"
              error={
                props.errors.firstName && props.touched.firstName ? true : false
              }
              helperText={
                props.errors.firstName && props.touched.firstName
                  ? props.errors.firstName
                  : null
              }
            />

            <TextField
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name="lastName"
              label="Last Name"
              value={props.values.lastName}
              margin="normal"
              error={
                props.errors.lastName && props.touched.lastName ? true : false
              }
              helperText={
                props.errors.lastName && props.touched.lastName
                  ? props.errors.lastName
                  : null
              }
            />
          </Box>

          <TextField
            fullWidth
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            name="username"
            label="Username"
            type="username"
            value={props.values.username}
            margin="normal"
            error={
              props.errors.username && props.touched.username ? true : false
            }
            helperText={
              props.errors.username && props.touched.username
                ? props.errors.username
                : null
            }
          />

          <TextField
            fullWidth
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            name="email"
            label="Email"
            type="email"
            value={props.values.email}
            margin="normal"
            error={props.errors.email && props.touched.email ? true : false}
            helperText={
              props.errors.email && props.touched.email
                ? props.errors.email
                : null
            }
          />

          <FormControl
            fullWidth
            error={
              props.errors.password && props.touched.password ? true : false
            }
          >
            <InputLabel htmlFor="password">Password</InputLabel>

            <Input
              name="password"
              type={state.showPassword ? "text" : "password"}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    tabIndex="0"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>
              {props.errors.password && props.touched.password
                ? props.errors.password
                : null}
            </FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            error={
              props.errors.confirmPassword && props.touched.confirmPassword
                ? true
                : false
            }
          >
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>

            <Input
              name="confirmPassword"
              type={state.showPasswordConfirmation ? "text" : "password"}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.confirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    tabIndex="0"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirmation}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {state.showPasswordConfirmation ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>
              {props.errors.confirmPassword && props.touched.confirmPassword
                ? props.errors.confirmPassword
                : null}
            </FormHelperText>
          </FormControl>
          <Box width={1} align="center" mt={5} mb={8}>
            {errorValues.showError && (
              <Typography className={classes.error}>
                This username or user email is already in use
              </Typography>
            )}
          </Box>
          <Box width={1} align="center" mt={8}>
            <Button
              variant="contained"
              className={classes.button}
              type="submit"
            >
              <Box px={8}>Register</Box>
            </Button>
          </Box>
        </form>
      )}
    />
  );
};

export default RegisterForm;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(2, 10, 2, 10)
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "capitalize",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
  error: {
    color: "red",
    fontSize: 12
  },
  textField: {
    margin: theme.spacing(1),
    display: "block"
  },
  firstName: {
    marginRight: 10
  },
  linkLight: {
    color: "#fff"
  }
}));
