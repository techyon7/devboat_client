import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { Box, Typography } from "@material-ui/core";

// AuthButtonGroup Component

export default function AuthButtonGroup() {
  // React Hooks
  const classes = useStyles();

  // State
  const [state, setState] = React.useState({
    loginActive: useSelector(state => state.loginActive),
    registerActive: useSelector(state => state.registerActive)
  });

  // Event handlers
  const handleClickSignIn = () => {
    setState({
      loginActive: true,
      registerActive: false
    });
  };
  const handleClickSignUp = () => {
    setState({
      registerActive: true,
      loginActive: false
    });
  };

  useEffect(() => {
    if (window.location.pathname === ("/login" || "/")) {
      setState({
        loginActive: true,
        registerActive: false
      });
    } else if (window.location.pathname === "/register") {
      setState({
        registerActive: true,
        loginActive: false
      });
    }
  }, []);

  return (
    <Box width={1} display="flex" justifyContent="stretch">
      <Link
        to="/login"
        className={
          state.loginActive ? classes.btnLight : classes.btnLightOutline
        }
        onClick={handleClickSignIn}
        align="center"
      >
        <Typography variant="button">Sign in</Typography>
      </Link>
      <Link
        to="/register"
        className={
          state.registerActive ? classes.btnLight : classes.btnLightOutline
        }
        onClick={handleClickSignUp}
        align="center"
      >
        <Typography variant="button" text="center">
          Sign up
        </Typography>
      </Link>
    </Box>
  );
}

const useStyles = makeStyles({
  btnLight: {
    padding: "0.5rem 1rem",
    borderRadius: 0,
    backgroundColor: "#fff",
    color: "#1E1E21",
    flexGrow: 1
  },
  btnLightOutline: {
    padding: "0.5rem 1rem",
    borderRadius: 0,
    borderColor: "#fff",
    color: "#fff",
    borderWidth: 2,
    borderStyle: "solid",
    flexGrow: 1
  }
});
