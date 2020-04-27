import React from "react";
import clsx from "clsx";
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
  Button
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

const RegisterForm = () => {
  // React Hooks
  const classes = useStyles();
  // React States
  const [state, setState] = React.useState({
    showPassword: false,
    showPasswordConfirmation: false
  });

  // Error
  // const [ errors, setErrors ] = React.useState({});
  //
  // // Values
  const [values, setValues] = React.useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  //
  // // Event Handlers
  const handleChange = event => {
    const { name, value } = event.target;
    //const err = validate(value);
    //console.log(err);
    setValues(currentValues => ({
      ...currentValues,
      [name]: value
    }));
    //setErrors(err);
  };

  // Change the state on toggle visibility button click to show/hide password
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  // Change the state on toggle visibility button click to show/hide password confirmation

  const handleClickShowPasswordConfirmation = () => {
    setState({
      ...state,
      showPasswordConfirmation: !state.showPasswordConfirmation
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleSubmit = (email, firstName, lastName, password) => {
    console.log("run");
    let body = JSON.stringify({
      user: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password
      }
    });
    fetch("http://127.0.0.1:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(user => {
        console.log(user.name);
      });
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={RegistrationSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));

          //this.addNewUser(user.name, user.profile_pic);
          //});
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={props => (
        <form onSubmit={handleSubmit} className={classes.root}>
          <Box width={1} display="flex" justifyContent="space-between">
            {/* First Name Input */}
            <TextField
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name="firstName"
              label="First Name"
              value={props.values.firstName}
              className={clsx(classes.margin, classes.textField, classes.root)}
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

            {/* Last Name Input */}
            <TextField
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name="lastName"
              label="Last Name"
              value={props.values.lastName}
              className={clsx(classes.margin, classes.textField, classes.root)}
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

          {/* Email Input */}
          <TextField
            fullWidth
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            name="email"
            label="Email"
            type="email"
            value={props.values.email}
            className={clsx(classes.margin, classes.textField)}
            margin="normal"
            error={props.errors.email && props.touched.email ? true : false}
            helperText={
              props.errors.email && props.touched.email
                ? props.errors.email
                : null
            }
          />

          {/* Password Input */}
          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            error={
              props.errors.password && props.touched.password ? true : false
            }
          >
            {/* Password Input Label */}
            <InputLabel htmlFor="password">Password</InputLabel>

            {/* Password Input Field */}
            <Input
              name="password"
              type={state.showPassword ? "text" : "password"}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              endAdornment={
                /* Password Visibility Icon Container*/

                <InputAdornment position="end">
                  {/* Toggle Password Visibility Icon */}
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

          {/* Password Confirmation Input */}
          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            error={
              props.errors.confirmPassword && props.touched.confirmPassword
                ? true
                : false
            }
          >
            {/* Password Input Label */}
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>

            {/* Password Input Field */}
            <Input
              name="confirmPassword"
              type={state.showPasswordConfirmation ? "text" : "password"}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.confirmPassword}
              endAdornment={
                /* Password Visibility Icon Container*/

                <InputAdornment position="end">
                  {/* Toggle Password Visibility Icon */}
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

          {/* Sign up button container */}
          <Box width={1} align="center" mt={8}>
            {/* Sign up button */}
            <Button
              variant="contained"
              className={clsx(classes.margin, "btn btn-success")}
              type="submit"
            >
              <Box px={8}>Sign up</Box>
            </Button>
          </Box>
        </form>
      )}
    />
  );
};

export default RegisterForm;

// Styles

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 200
  },
  linkLight: {
    color: "#fff"
  }
}));
