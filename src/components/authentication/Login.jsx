import React, { useContext } from "react";
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
import { GlobalContext } from '../../context/GlobalContext';
import { POST } from '../../actions/api';

// Login Component
export default function Login() {
  const classes = useStyles();

  // React Context
  const { setSession } = useContext(GlobalContext);
  // React States
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async () => {
    let body = {
      email: email,
      password: password
    };

    const response = await POST('/auth/login', body);
    const result = await response.json();

    // store token on success
    if (response.status === 200) {
      setSession({
        token: result.token,
        userId: result.user.id,
        userFirstName: result.user.name,
        userLastName: result.user.picture,
        userImg: null
      });
    }
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
