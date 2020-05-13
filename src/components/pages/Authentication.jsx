import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AuthButtonGroup from "../authentication/AuthButtonGroup";
import DevboatDescription from "../authentication/DevboatDescription";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import VerifyEmail from "../authentication/VerifyEmail";
import Forgot from "../authentication/Forgot";
import ResetSent from "../authentication/ResetSent";
import ChangePassword from "../authentication/ChangePassword";
import { makeStyles } from "@material-ui/styles";
import { Grid, Container, Box, Hidden } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";

// Authentication Component

export default function Authentication(props) {
  // React hooks
  const classes = useStyles();
  // React Context
  const { session } = useContext(GlobalContext);
  const { from } = props.location.state || { from: { pathname: `/${session.username}` } };

  // JSX Markup
  return (
    <Fragment>
      {session.token ? (
        <Redirect to={from}/>
      ) : (
        <div className={classes.root}>
          <Router>
            {/* Grid Layout */}
            <Grid container spacing={0}>
              <Grid item xs={12} lg={6}>
                {/* Form container */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  minHeight="100vh"
                  width={1}
                  px={3}
                >
                  {/* Limit Width */}
                  <Container maxWidth="sm">
                    {/* Add margin between button ground and form */}
                    <Box mb={5}>
                      <Route
                        path="/(|login|register)"
                        render={({ match }) => (
                          <React.Fragment>
                            {match.isExact ? <AuthButtonGroup /> : null}
                          </React.Fragment>
                        )}
                      />
                    </Box>

                    <Route path="/(login|)" exact component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/confirm-email" component={VerifyEmail} />
                    <Route path="/forgot" component={Forgot} />
                    <Route path="/reset-sent" component={ResetSent} />
                    <Route path="/change-password" component={ChangePassword} />
                  </Container>
                </Box>
              </Grid>

              {/* Description container (Hidden in small devices) */}
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

// Styles

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  boxPrimary: {
    background: "#4B7BEC"
  }
});
