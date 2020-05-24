import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import DevboatDescription from "../authentication/DevboatDescription";
import LoginRegister from "../authentication/LoginRegister";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import VerifyEmail from "../authentication/VerifyEmail";
import ConfirmEmail from "../authentication/ConfirmEmail";
import Forgot from "../authentication/Forgot";
import ForgotSent from "../authentication/ForgotSent";
import Reset from "../authentication/Reset";
import ResetDone from "../authentication/ResetDone";
import { makeStyles } from "@material-ui/styles";
import { Grid, Container, Box, Hidden } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";

export default function Authentication(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const { from } = props.location.state || { from: { pathname: `/${session.username}` } };

  const loggedIn = (username) => {
    props.history.push({
      pathname: `/${username}`
    });
  }

  return (
    <Fragment>
      {session.token ? (
        <Redirect to={from}/>
      ) : (
        <div className={classes.root}>
          <Router>
            <Grid container spacing={0}>
              <Hidden mdDown>
                <Grid item xs={12} lg={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                    width="100%"
                  >
                    <DevboatDescription />
                  </Box>
                </Grid>
              </Hidden>
              <Grid item xs={12} lg={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  minHeight="100vh"
                  width="100%"
                >
                  <Route path="/(login|)" render={(props) => (
                    <LoginRegister {...props}
                      loggedIn={loggedIn} />
                    )}
                  />
                <Route path="/register" component={LoginRegister}/>
                  <Route path="/confirm" component={ConfirmEmail} />
                  <Route path="/verify/:verification_key" component={VerifyEmail} />
                  <Route path="/forgot" component={Forgot} />
                  <Route path="/forgot-sent" component={ForgotSent} />
                  <Route path="/reset/:reset_password_key" component={Reset} />
                  <Route path="/reset-done" component={ResetDone} />
                </Box>
              </Grid>
            </Grid>
          </Router>
        </div>
      )}
    </Fragment>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  boxPrimary: {
    background: "#4B7BEC"
  }
});
