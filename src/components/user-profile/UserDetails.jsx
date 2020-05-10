import React, { useContext } from "react";
import clsx from "clsx";
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
  Divider,
  Avatar
} from "@material-ui/core";
import listCollection from "../validations/dateInputSanitizer";

const monthNames = listCollection().monthNamesCollection();
const profileSelf = true;

// UserDetails component

const UserDetails = () => {
  /*const unsplash = new Unsplash({
    applicationId:
      "9733bbb33eae4e10646b6066914846d6b620b978dce31704aee529658db37cef",
    secret: "809ac47200d36adb68830ff85bb670b639b356f099fb2be6dda9b9a1106e0c6e"
  });*/
  const classes = useStyles();
  const { session } = useContext(GlobalContext);
  /*React.useEffect(() => {
    let isSubscribed = true;
    let usersAPICall = fetch("https://jsonplaceholder.typicode.com/users");
    let photosAPICall = unsplash.photos.listPhotos(2, 15, "latest");

    Promise.all([usersAPICall, photosAPICall])
      .then(values => Promise.all(values.map(value => value.json())))
      .then(finalVals => {
        let usersAPIResp = finalVals[0];
        let photosAPIResp = finalVals[1];

        if (isSubscribed) {
          setState({
            isLoaded: true,
            connections: usersAPIResp,
            connectionImages: photosAPIResp
          });
        }
      });
    return () => (isSubscribed = false);
  });*/

  const [state] = React.useState({
    isLoaded: true,
    connections: [],
    connectionImages: []
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [connectionAvatar, setConnectionAvatar] = React.useState({
    name: ""
  });

  const userDetails = {
    fullName: session.userFirstName,
    connectionsCount: "0",
    currentPosition: {
      title: "Founder & CEO",
      company: "DevBoat",
      startDate: () => {
        const d = new Date(2019, 4);
        return {
          month: monthNames[d.getMonth()],
          year: d.getFullYear()
        };
      }
    },
    connections: []
  };

  const handleAvatarMouseOver = (e, name) => {
    setConnectionAvatar({
      name: name
    });
    setAnchorEl(e.currentTarget);
  };

  const handleAvatarMouseOut = e => {
    setConnectionAvatar({
      name: ""
    });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "no-transition-popper" : undefined;

  const renderPhotos = () =>
    state.connectionImages
      .slice(0, 5)
      .map(image => (
        <Avatar
          key={image.id}
          aria-describedby={id}
          src={image.urls.thumb}
          onMouseOver={e => handleAvatarMouseOver(e, image.user.name)}
          onMouseOut={handleAvatarMouseOut}
          className={clsx(classes.connectionAvatar, "connectionAvatarHover")}
        />
      ));

  // JSX Markup

  if (!state.isLoaded) return <div>Loading...</div>;
  else {
    return (
      <Box p={5}>
        <Grid container justify="center" spacing={5}>
          <Grid item>
            <ProfilePicture />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="textPrimary">
              <Box fontWeight="fontWeightMedium" component="span">
                {userDetails.fullName}
              </Box>
            </Typography>
            <Typography variant="subtitle1">
              {userDetails.currentPosition.title} at{" "}
              {userDetails.currentPosition.company}
              <br />
              since {userDetails.currentPosition.startDate().month},{" "}
              {userDetails.currentPosition.startDate().year}
            </Typography>
            <Divider
              variant="middle"
              light={true}
              className={classes.divider}
            />
          </Grid>

          <Grid item xs={12}>
            {profileSelf ? <EditProfile /> : <ConnectInteraction />}
          </Grid>
          <Grid item xs={12}>
            <Box w={1} pt={8} display="flex" alignItems="center">
              <Typography variant="h5" color="textPrimary" align="left">
                <Box fontWeight="fontWeightMedium" component="span" mr={3}>
                  Connections
                </Box>
              </Typography>
              <Typography variant="subtitle1" align="left">
                <Box fontWeight="fontWeightMedium" component="span">
                  ({userDetails.connectionsCount})
                </Box>
              </Typography>
            </Box>
          </Grid>
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
                  <Typography className={classes.typography}>
                    {connectionAvatar.name}
                  </Typography>
                </Paper>
              </Popper>
              {renderPhotos()}
              <SearchConnections
                connectionsCount={userDetails.connectionsCount}
                connections={state.connectionImages}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={5}>
                <SearchFollowers
                  connectionsCount={userDetails.connectionsCount}
                  connections={state.connectionImages}
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
                  connectionsCount={userDetails.connectionsCount}
                  connections={state.connectionImages}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <UserSkillsList />
          </Grid>
          <Grid item xs={12}>
            <UserInterestsList />
          </Grid>
          <Grid item xs={12}>
            <UserWorkList />
          </Grid>
          <Grid item xs={12}>
            <UserEducationList />
          </Grid>
        </Grid>
      </Box>
    );
  }
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
