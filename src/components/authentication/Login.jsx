import React, { useState, useContext } from "react";
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

export default function Login(props) {
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

    if (response.status === 200) {
      props.loggedIn(result.user.username);
      setSession({
        token: result.token,
        userId: result.user.id,
        username: result.user.username,
        userFirstName: result.user.first_name,
        userLastName: result.user.last_name,
        userPicture: result.user.picture,
        userCrop: result.user.cropped_data,
        userIsSetup: result.user.is_setup
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
        type="email"
        autoComplete="current-email"
        margin="normal"
        onChange={e => setEmail(e.target.value)}
      />
      <FormControl
        fullWidth
        error={displayError}
      >
        <InputLabel htmlFor="login-password">Password</InputLabel>

        <Input
          id="login-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
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
          className={classes.button}
        >
          <Box px={8}>Sign in</Box>
        </Button>
      </Box>
    </div>
  );
}

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
  textField: {
    margin: theme.spacing(1),
    display: 'block'
  },
  linkLight: {
    color: "#fff"
  },
  error: {
    color: "red"
  }
}));
