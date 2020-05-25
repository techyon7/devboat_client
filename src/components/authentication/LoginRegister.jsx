import React from "react";
import clsx from "clsx";
import { Route, Link } from "react-router-dom";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Paper } from "@material-ui/core";

export default function DevboatDescription(props) {
  const classes = useStyles();

  const loggedIn = username => {
    props.loggedIn(username);
  };

  return (
    <Paper elevation={false} className={classes.paper} color="textPrimary">
      <Box width="100%" display="flex">
        <Link to="/login" className={classes.buttonWrap}>
          <Button
            disableRipple
            className={clsx(classes.button, {
              [classes.inactive]: props.location.pathname === "/register"
            })}
          >
            Sign in
          </Button>
        </Link>

        <Link to="/register" className={classes.buttonWrap}>
          <Button
            disableRipple
            className={clsx(classes.button, {
              [classes.inactive]: props.location.pathname !== "/register"
            })}
          >
            Register
          </Button>
        </Link>
      </Box>
      <Route
        path="/(login|)"
        render={props => <Login {...props} loggedIn={loggedIn} />}
      />
      <Route path="/register" component={Register} />
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    width: "60%",
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main,
    margin: "0 auto"
  },
  buttonWrap: {
    width: "50%",
    height: 40
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
    textTransform: "capitalize",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    }
  },
  inactive: {
    color: "#555"
  }
}));
