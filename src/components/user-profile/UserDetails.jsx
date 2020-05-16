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
import {
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
// import listCollection from "../validations/dateInputSanitizer";
import { GET } from "../../actions/api";

//const monthNames = listCollection().monthNamesCollection();

// UserDetails component
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

        response = await GET('/connections', session.token);
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
    UserConnectionsList,
    UserSkillsList,
    UserInterestsList,
    UserWorkList,
    UserEducationList
  ];

  // JSX Markup
  return (
    <Box p={5}>
      <Grid container justify="center" spacing={5}>
        <Grid item>
          {user &&
            <ProfilePicture
              isProfileSelf={props.isProfileSelf}
              picture={user.picture}
              crop={user.cropped_data}/>
          }
        </Grid>
        <Grid item xs={12}>
          {user && (
            <Typography variant="h4" color="textPrimary">
              <Box fontWeight="fontWeightMedium" component="span">
                {user.first_name} {user.last_name}
              </Box>
            </Typography>
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
        </Grid>

        {!props.isProfileSelf && user && connections &&
          <ConnectInteraction
            connections={connections}
            user1={session.userId}
            user2={user.id}
            userFirstName={user.first_name}/>
        }
        <Grid item xs={12} className={classes.connectionsTitle}>
          <Box w={1} display="flex" alignItems="flex-end">
            <Typography variant="h5" color="textPrimary" align="left">
              <Box fontWeight="fontWeightMedium" component="span" mr={2}>
                Connections
              </Box>
            </Typography>
            <Typography variant="h6" align="left">
              <Box fontWeight="fontWeightMedium" component="span">
                ({connections ? connections.length : 0})
              </Box>
            </Typography>
          </Box>
        </Grid>
        {user && connections &&
          userDetailsBlocks.map((Component, index) => (
            <Grid item xs={12} key={index}>
              <Component connections={connections} userId={user.id} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default UserDetails;

const useStyles = makeStyles(theme => ({
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
