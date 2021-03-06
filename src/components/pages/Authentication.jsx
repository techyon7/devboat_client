import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import DevboatDescription from "../authentication/DevboatDescription";
import LoginRegister from "../authentication/LoginRegister";
import VerifyEmail from "../authentication/VerifyEmail";
import ConfirmEmail from "../authentication/ConfirmEmail";
import Forgot from "../authentication/Forgot";
import ForgotSent from "../authentication/ForgotSent";
import Reset from "../authentication/Reset";
import ResetDone from "../authentication/ResetDone";
import { makeStyles } from "@material-ui/styles";
import { Grid, Box, Hidden, Typography } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo192.png";

export default function Authentication(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const { from } = props.location.state || {
    from: { pathname: `/${session.username}` }
  };

  const loggedIn = username => {
    props.history.push({
      pathname: `/${username}`
    });
  };

  return (
    <Fragment>
      {session.token ? (
        <Redirect to={from} />
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
                <Hidden mdUp>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    mt={20}
                    mb={10}
                    width="100%"
                  >
                    <Link to="/">
                      <img className={classes.logo} alt="logo" src={logo} />
                    </Link>
                    <Typography variant="h3">DevBoat</Typography>
                  </Box>
                  <Box
                    style={{
                      textAlign: "center",
                      margin: 10
                    }}
                  >
                    <Typography variant="body1">
                      A social network for developers
                    </Typography>
                  </Box>
                </Hidden>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  minHeight="100vh"
                  width="100%"
                >
                  <Route
                    path="/(login|)"
                    render={props => (
                      <LoginRegister {...props} loggedIn={loggedIn} />
                    )}
                  />
                  <Route path="/register" component={LoginRegister} />
                  <Route path="/confirm" component={ConfirmEmail} />
                  <Route
                    path="/verify/:verification_key"
                    component={VerifyEmail}
                  />
                  <Route path="/forgot" component={Forgot} />
                  <Route path="/forgot-sent" component={ForgotSent} />
                  <Route path="/reset/:reset_password_key" component={Reset} />
                  <Route path="/reset-done" component={ResetDone} />
                </Box>
              </Grid>
            </Grid>
          </Router>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{
              position: "relative",
              bottom: 10,
              textAlign: "center"
            }}
          >
            {"Copyright ?? "}
            <Link
              color="inherit"
              href="https://devboat-beta.herokuapp.com/"
              target="_blank"
            >
              <span className={classes.name}>DevBoat</span>
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </div>
      )}
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  boxPrimary: {
    background: "#4B7BEC"
  },
  flex: {
    margin: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  logo: {
    height: 55,
    width: 55,
    marginRight: 10
  },
  name: {
    color: theme.palette.primary.main
  }
}));
