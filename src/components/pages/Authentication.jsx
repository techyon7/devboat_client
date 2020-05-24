import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AuthButtonGroup from "../authentication/AuthButtonGroup";
import DevboatDescription from "../authentication/DevboatDescription";
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
              <Grid item xs={12} lg={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  minHeight="100vh"
                  width={1}
                  px={3}
                >
                  <Container maxWidth="sm">
                    <Box mb={5}>
                      <Route
                        path="/(|login|register)"
                        render={({ match }) => (
                          <Fragment>
                            {match.isExact ? <AuthButtonGroup /> : null}
                          </Fragment>
                        )}
                      />
                    </Box>
                    <Route path="/(login|)" render={(props) => (
                      <Login {...props}
                        loggedIn={loggedIn}/>
                      )}
                    />
                    <Route path="/register" component={Register} />
                    <Route path="/confirm" component={ConfirmEmail} />
                    <Route path="/verify/:verification_key" component={VerifyEmail} />
                    <Route path="/forgot" component={Forgot} />
                    <Route path="/forgot-sent" component={ForgotSent} />
                    <Route path="/reset/:reset_password_key" component={Reset} />
                    <Route path="/reset-done" component={ResetDone} />
                  </Container>
                </Box>
              </Grid>

              <Hidden mdDown>
                <Grid item xs={12} lg={6} className={classes.boxPrimary}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                  >
                    <DevboatDescription />
                  </Box>
                </Grid>
              </Hidden>
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
