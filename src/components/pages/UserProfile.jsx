import React, { Fragment, useEffect, useState, useContext } from "react";
import UserDetails from "../user-profile/UserDetails";
import Projects from "../user-profile/Projects";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Paper } from "@material-ui/core";
import ConnectionRequests from "../user-profile/ConnectionRequests";
import Recommendations from "../user-profile/Recommendations";
import NotFound from "./NotFound";
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from "../../actions/api";

const UserProfile = props => {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [user, setUser] = useState(null);
  const [is404, setIs404] = useState(false);
  const isProfileSelf = session.username === props.match.params.username;

  useEffect(
    () => {
      (async () => {
        const response = await GET(
          `/users/${props.match.params.username}`,
          session.token
        );
        if(response.status === 200) {
          const result = await response.json();
          setUser(result);
        }
        else if(response.status === 404)
          setIs404(true);
      })();
    },
    [session.token, props.match.params.username]
  );

  return (
    <Fragment>
      {is404 ? (
        <NotFound />
      ) : (
        <div className={classes.root}>
          <Container disableGutters maxWidth="xl">
            <Grid container direction="row" justify="center">
              <Grid className={classes.item} item xs={12} lg={3}>
                <Paper className={classes.paper}>
                  {user && (
                    <UserDetails
                      userId={user.id}
                      username={user.username}
                      isProfileSelf={isProfileSelf}
                    />
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Grid
                  container
                  p={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  className={classes.alignStart}
                >
                  <Grid className={classes.item} item xs={12}>
                    <Projects />
                  </Grid>

                  <Grid className={classes.item} item xs={12}>
                    <Paper className={classes.paper}>Create Post</Paper>
                  </Grid>

                  <Grid className={classes.item} item xs={12}>
                    <Paper className={classes.paper}>Post</Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={3}>
                <Grid
                  container
                  p={0}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  className={classes.alignStart}
                >
                  <Grid className={classes.item} item xs={12}>
                    <Paper className={classes.paperRight}>
                      Pending Connection Requests
                      <ConnectionRequests user={session.userId} />
                    </Paper>
                  </Grid>

                  <Grid className={classes.item} item xs={12}>
                    <Paper className={classes.paperRight}>
                      People you make know
                      <Recommendations user={session.userId} />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </Fragment>
  );
};

export default UserProfile;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 0
  },
  leftPanel: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    boxShadow: "0px 2px 2px #111111"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#262B2F !important"
  },
  paperRight: {
    padding: theme.spacing(2, 0, 2, 0),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#262B2F !important"
  },
  item: {
    padding: "0.625rem"
  },
  alignStart: {
    alignSelf: "start"
  }
}));
