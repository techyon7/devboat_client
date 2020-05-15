import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProfilePicture from "./ProfilePicture";
import EditProfile from "./EditProfile";
import SearchConnections from "./SearchConnections";
import SearchFollowers from "./SearchFollowers";
import SearchFollowing from "./SearchFollowing";
import ConnectInteraction from "./ConnectInteraction";
import UserSkillsList from "./UserSkillsList";
import UserInterestsList from "./UserInterestsList";
import UserWorkList from "./UserWorkList";
import UserEducationList from "./UserEducationList";
import { GlobalContext } from "../../context/GlobalContext";
import {
  Box,
  Grid,
  Paper,
  Popper,
  Typography,
  Divider
} from "@material-ui/core";
// import listCollection from "../validations/dateInputSanitizer";
import { GET } from "../../actions/api";

//const monthNames = listCollection().monthNamesCollection();

// UserDetails component
const UserDetails = props => {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [user, setUser] = React.useState(null);
  const [connections] = React.useState(null);
  const [showcase] = React.useState(null);
  const [anchorEl] = React.useState(null);

  useEffect(
    () => {
      (async () => {
        const response = await GET(`/users/${props.username}`, session.token);
        const result = await response.json();
        setUser(result);
      })();
    },
    [session.token, props.username]
  );

  // const handleAvatarMouseOver = (e, name) => {
  //   setConnectionAvatar({
  //     name: name
  //   });
  //   setAnchorEl(e.currentTarget);
  // };
  //
  // const handleAvatarMouseOut = e => {
  //   setConnectionAvatar({
  //     name: ""
  //   });
  //   setAnchorEl(null);
  // };

  const open = Boolean(anchorEl);
  const id = open ? "no-transition-popper" : undefined;

  const userDetailsBlocks = [
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

        <Grid item xs={12}>
          {!props.isProfileSelf && <ConnectInteraction />}
        </Grid>
        <Grid item xs={12}>
          <Box w={1} display="flex" alignItems="center">
            <Typography variant="h5" color="textPrimary" align="left">
              <Box fontWeight="fontWeightMedium" component="span" mr={3}>
                Connections
              </Box>
            </Typography>
            <Typography variant="subtitle1" align="left">
              <Box fontWeight="fontWeightMedium" component="span">
                ({connections ? connections.length : 0})
              </Box>
            </Typography>
          </Box>
        </Grid>
        {connections && (
          <Grid item xs={12}>
            <Box display="flex" ml={4} mb={8}>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="top"
                className={classes.bgCinderLight}
              >
                <Paper>
                  <Typography className={classes.typography} />
                </Paper>
              </Popper>
              <SearchConnections
                connectionsCount={connections.length}
                connections={connections}
              />
            </Box>
          </Grid>
        )}
        {connections && (
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={5}>
                <SearchFollowers
                  connectionsCount={connections.length}
                  connections={connections}
                />
              </Grid>
              <Grid item xs={2}>
                <Divider
                  orientation="vertical"
                  className={classes.verticalDivider}
                />
              </Grid>
              <Grid item xs={5}>
                <SearchFollowing
                  connectionsCount={connections.length}
                  connections={connections}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {user &&
          userDetailsBlocks.map((Component, index) => (
            <Grid item xs={12} key={index}>
              <Component userId={user.id} />
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
  connectionAvatar: {
    border: "2px solid #262B2F",
    height: 48,
    width: 48,
    marginLeft: "-1rem"
  },
  typography: {
    padding: theme.spacing(2),
    backgroundColor: "#3A4147"
  },
  bgCinderLight: {
    backgroundColor: "#3A4147"
  }
}));
