import React, { useState, useContext } from "react";
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
  Button,
  Typography
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import { GlobalContext } from "../../context/GlobalContext";
import { POST } from "../../actions/api";

// Login Component
export default function Login() {
  const classes = useStyles();
  const { setSession } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const handleLogin = async () => {
    const body = {
      email: email,
      password: password
    };

    const response = await POST("/auth/login", body);
    const result = await response.json();

    // store token on success
    if (response.status === 200) {
      setSession({
        token: result.token,
        userId: result.user.id,
        username: result.user.username,
        userFirstName: result.user.first_name,
        userLastName: result.user.last_name,
        userImg: null
      });
    } else {
      setDisplayError(true);
    }
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <TextField
        error={displayError}
        fullWidth
        label="Email"
        className={clsx(classes.margin, classes.textField)}
        type="email"
        autoComplete="current-email"
        margin="normal"
        onChange={e => setEmail(e.target.value)}
      />
      <FormControl
        fullWidth
        error={displayError}
        className={clsx(classes.margin, classes.textField)}
      >
        <InputLabel htmlFor="login-password">Password</InputLabel>

        <Input
          id="login-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          endAdornment={
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

      <Box width={1} align="center" mt={5} mb={8}>
        {displayError && (
          <Typography className={classes.error}>
            Invalid user email or password
          </Typography>
        )}
        <Link to="/forgot" className={classes.linkLight}>
          Forgot your password?
        </Link>
      </Box>

      <Box width={1} align="center">
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
  },
  error: {
    color: "red"
  }
}));
