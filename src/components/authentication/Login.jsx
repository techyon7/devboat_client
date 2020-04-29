import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Box,
  FormControl,
  TextField,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

// Login Component

export default function Login() {
  // React Hooks
  const classes = useStyles();
  const [state, setState] = React.useState("");
  // React States
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  // Event Handlers

  //
  // const handleChange = prop => event => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  //
  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };
  //
  // //
  // const handleMouseDownPassword = event => {
  //   event.preventDefault();
  // };
  const handleLogin = () => {
    console.log("run");
    let body = JSON.stringify({
      email: email,
      password: password
    });
      console.log(body);
    fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        console.log(response.status);
        return response.json();
      })
      .then(user => {
        console.log(user.name);
      });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // JSX Markup
  return (
    <div className={classes.root}>
      {/* Email Input */}
      <TextField
        fullWidth
        label="Email"
        className={clsx(classes.margin, classes.textField)}
        type="email"
        autoComplete="current-email"
        margin="normal"
        onChange={e => setEmail(e.target.value)}
      />

      {/* Password Input Container */}
      <FormControl
        fullWidth
        className={clsx(classes.margin, classes.textField)}
      >
        {/* Password Input Label */}
        <InputLabel htmlFor="login-password">Password</InputLabel>

        {/* Password Input Field */}
        <Input
          id="login-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          endAdornment={
            /* Password Visibility Icon Container*/

            <InputAdornment position="end">
              {/* Toggle Password Visibility Icon */}
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Forgot password link container */}
      <Box width={1} align="center" mt={5} mb={8}>
        {/* Forgot password link */}
        <Link to="/forgot" className={classes.linkLight}>
          Forgot your password?
        </Link>
      </Box>

      {/* Sign in button container */}
      <Box width={1} align="center">
        {/* Sign in button */}
        <Button
          onClick={handleLogin}
          variant="contained"
          className={clsx(classes.margin, "btn btn-success")}
        >
          <Box px={8}>Sign in</Box>
        </Button>
      </Box>
    </div>
    /*<div className={classes.root}>


      <input
        className={clsx(classes.margin, classes.textField)}
        type="text"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <FormControl
        fullWidth
        className={clsx(classes.margin, classes.textField)}
      >
        <input
          className="main-input-old"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>
      <Box width={1} align="center" mt={5} mb={8}>

        <Link to="/forgot" className={classes.linkLight}>
          Forgot your password?
        </Link>
      </Box>
      <Box width={1} align="center">
        <button
          variant="contained"
          className={clsx(classes.margin, "btn btn-success")}
          onClick={handleLogin}
        >
          <Box px={8}>Login</Box>
        </button>
      </Box>
    </div>*/
  );
}

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
