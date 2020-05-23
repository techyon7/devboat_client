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
            <Grid
              container
              direction="row"
              justify="center"
            >
              {user && (
                <UserDetails
                  userId={user.id}
                  username={user.username}
                  isProfileSelf={isProfileSelf}
                />
              )}

              <Grid item xs={12} lg={6} className={classes.panel}>
                <Grid className={classes.item} item xs={12}>
                  <Paper elevation={false} className={classes.paper}>
                    <Projects />
                  </Paper>
                </Grid>

                <Grid className={classes.item} item xs={12}>
                  <Paper elevation={false} className={classes.paper}>Create Post</Paper>
                </Grid>

                <Grid className={classes.item} item xs={12}>
                  <Paper elevation={false} className={classes.paper}>Post</Paper>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={3} className={classes.panel}>
                <Grid className={classes.item} item xs={12}>
                  <Paper elevation={false} className={classes.paperRight}>
                    Pending Connection Requests
                    <ConnectionRequests user={session.userId} />
                  </Paper>
                </Grid>

                <Grid className={classes.item} item xs={12}>
                  <Paper elevation={false} className={classes.paperRight}>
                    People you make know
                    <Recommendations user={session.userId} />
                  </Paper>
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
  paper: {
    padding: theme.spacing(3, 3.5, 3, 3.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main
  },
  paperRight: {
    padding: theme.spacing(3, 0, 3, 0),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main
  },
  panel: {
    padding: "0.625rem",
    paddingLeft: 0
  },
  item: {
    marginBottom: "0.625rem"
  },
  alignStart: {
    alignSelf: "start"
  }
}));
