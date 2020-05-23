import React, { Fragment, useEffect, useState, useContext, useCallback } from "react";
import UserDetails from "../user-profile/UserDetails";
import Projects from "../user-profile/Projects";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Paper, Typography } from "@material-ui/core";
import CreatePost from "../user-profile/CreatePost";
import Posts from "../user-profile/Posts";
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
  const [posts, setPosts] = useState([]);

  const loadPosts = useCallback(async (user) => {
    const response = await GET('/posts', session.token);
    const result = await response.json();
    let posts = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].user === user.id) {
        posts = [...posts, result[i]];
      }
    }
    posts.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
    setPosts(posts);
  }, [session.token]);

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
          loadPosts(result);
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
                  isProfileSelf={isProfileSelf}
                />
              )}

              <Grid item xs={12} lg={6} className={classes.panel}>
                <Grid className={classes.item} item xs={12}>
                  <Paper elevation={false} className={classes.paper}>
                    <Projects />
                  </Paper>
                </Grid>

                {isProfileSelf &&
                  <Grid className={classes.item} item xs={12}>
                    <CreatePost handleCreated={() => loadPosts(user)}/>
                  </Grid>
                }

                {user && (
                  <Posts
                    posts={posts}
                    userId={user.id}
                    userFirstName={user.first_name}
                    userLastName={user.last_name}
                    userPicture={user.picture}
                    userCrop={user.cropped_data}
                    isProfileSelf={isProfileSelf}
                  />
                )}
              </Grid>

              <Grid item xs={12} lg={3} className={classes.panel}>
                <Grid className={classes.item} item xs={12}>
                  <Paper elevation={false} className={classes.paperRight} color="textPrimary">
                    <Typography variant="body1" color="textPrimary">
                      Pending Connection Requests
                    </Typography>
                    <ConnectionRequests />
                  </Paper>
                </Grid>

                <Grid className={classes.item} item xs={12}>
                  <Paper elevation={false} className={classes.paperRight} color="textPrimary">
                    <Typography variant="body1" color="textPrimary">
                      People you may know
                    </Typography>
                    <Recommendations />
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
