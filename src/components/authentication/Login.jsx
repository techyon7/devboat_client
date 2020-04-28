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
  // JSX Markup
  return (
    <div className={classes.root}>
      {/* Email Input */}
      <input
        className="main-input-old"
        type="text"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="main-input-old"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button className="main-btn-old" onClick={handleLogin}>
        Login
      </button>
    </div>
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
