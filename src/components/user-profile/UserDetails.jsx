import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProfilePicture from "./ProfilePicture";
import ConnectInteraction from "./ConnectInteraction";
import UserConnectionsList from "./UserConnectionsList";
import UserSkillsList from "./UserSkillsList";
import UserInterestsList from "./UserInterestsList";
import UserWorkList from "./UserWorkList";
import UserEducationList from "./UserEducationList";
import { GlobalContext } from "../../context/GlobalContext";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { GET } from "../../actions/api";

const UserDetails = props => {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [user, setUser] = useState(null);
  const [connections, setConnections] = useState(null);
  const [showcase] = useState(null);

  useEffect(
    () => {
      (async () => {
        let response = await GET(`/users/${props.username}`, session.token);
        const user = await response.json();
        setUser(user);

        response = await GET("/connections", session.token);
        const result = await response.json();

        let connections = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].user1 === props.userId)
            connections = [...connections, result[i].user2];
          else if (result[i].user2 === props.userId)
            connections = [...connections, result[i].user1];
        }
        setConnections(connections);
      })();
    },
    [session.token, props.username, props.userId]
  );

  const userDetailsBlocks = [
    UserSkillsList,
    UserInterestsList,
    UserWorkList,
    UserEducationList
  ];

  return (
    <Grid item xs={12} lg={3} className={classes.panel}>
      <Grid className={classes.item} item xs={12} >
        <Paper className={classes.paper} elevation={false} textAlign="center">
          {user && (
            <ProfilePicture
              isProfileSelf={props.isProfileSelf}
              picture={user.picture}
              crop={user.cropped_data}
            />
          )}
          {user && (
            <Box mt={2}>
              <Typography variant="h5" color="textPrimary">
                {user.first_name} {user.last_name}
              </Typography>
            </Box>
          )}
          {showcase && (
            <Typography variant="subtitle1">
              {showcase.currentPosition.title} at{" "}
              {showcase.currentPosition.company}
              <br />
              since {showcase.currentPosition.startDate().month},{" "}
              {showcase.currentPosition.startDate().year}
            </Typography>
          )}
          {!props.isProfileSelf && user && connections && (
            <ConnectInteraction
              connections={connections}
              user1={session.userId}
              user2={user.id}
              userFirstName={user.first_name}
            />
          )}
        </Paper>
      </Grid>
      {user &&
        <Grid className={classes.item} item xs={12}>
          <Paper elevation={false} className={classes.paper}>
            <Box display="flex" alignItems="center" mb={2}>
              <Box mr={1} mb={0.5}>
                <Typography variant="body1" align="left" color="textPrimary">
                  Connections
                </Typography>
              </Box>
              <Typography variant="body2" align="left">
                  ({connections ? connections.length : 0})
              </Typography>
            </Box>
            <UserConnectionsList connections={connections} userId={user.id} />
          </Paper>
        </Grid>
      }
      {user &&
        connections &&
        userDetailsBlocks.map((Component, index) => (
          <Grid className={classes.item} item xs={12} key={index}>
            <Paper elevation={false} className={classes.paper}>
              <Component connections={connections} userId={user.id} />
            </Paper>
          </Grid>
        ))
      }
    </Grid>
  );
};

export default UserDetails;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 3.5, 3, 3.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main
  },
  panel: {
    padding: "0.625rem"
  },
  item: {
    marginBottom: "0.625rem"
  },
  divider: {
    width: 50,
    border: "1px solid #4b7bec",
    margin: "16px auto"
  },
  verticalDivider: {
    margin: "0 auto"
  },
  connectionsTitle: {
    paddingBottom: 2
  },
  typography: {
    padding: theme.spacing(2),
    backgroundColor: "#3A4147"
  }
}));
