import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import UserPicture from "./UserPicture";
import { GET, POST, DELETE } from "../../actions/api";
import { GlobalContext } from "../../context/GlobalContext";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360
  },
  iconHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
}));

export default function ConnectionRequestItem(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await GET(`/users/${props.userId}`, session.token);
      const user = await response.json();

      setUser(user);
    })();
  }, [session.token, props.userId]);

  const handleAccept = async (e) => {
    e.preventDefault();
    let body = {
      user1: user.id, //In DB, user1: who sent
      user2: session.userId //In DB, user2: who accepted
    };

    await POST("/connections", body, session.token);
    await DELETE(`/requests/${props.requestId}`, session.token);
    props.handleChange();
  };

  const handleReject = async (e) => {
    e.preventDefault();
    await DELETE(`/requests/${props.requestId}`, session.token);
    props.handleChange();
  };

  return (
    <ListItem button component={Link} to={user && `/${user.username}`}>
      <ListItemAvatar>
        <Avatar>
          {user && (
            <UserPicture picture={user.picture} crop={user.cropped_data} />
          )}
        </Avatar>
      </ListItemAvatar>
      {user && (
        <ListItemText primary={user.first_name + " " + user.last_name} />
      )}
      <div class={classes.iconHolder}>
        <IconButton
          color="primary"
          size="small"
          component="span"
          onClick={handleAccept}
        >
          <CheckCircleIcon />
        </IconButton>
        <IconButton
          color="primary"
          size="small"
          component="span"
          onClick={handleReject}
        >
          <CancelIcon />
        </IconButton>
      </div>
    </ListItem>
  );
}
