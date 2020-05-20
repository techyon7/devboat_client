import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360
  },
  iconHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  accept: {
    color: "green"
  },
  decline: {
    color: "red"
  }
}));

export default function RequestListItem(props) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const { session } = useContext(GlobalContext);
  useEffect(
    () => {
      (async () => {
        const response = await GET(`/users/${props.userId}`, session.token);
        const user = await response.json();

        setUser(user);
      })();
    },
    [session.token, props.userId]
  );
  const handleAccept = async () => {
    let body = {
      user1: user.id, //In DB, user1: who sent
      user2: session.userId //In DB, user2: who accepted
    };

    const response = await POST("/connections", body, session.token);
    const result = await response.json();
    await DELETE(`/requests/${props.requestId}`, session.token);
    props.handleChange();
  };
  const handleReject = async () => {
    await DELETE(`/requests/${props.requestId}`, session.token);
    props.handleChange();
  };
  return (
    <ListItem>
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
          aria-label="accept"
          component="span"
          className={classes.accept}
          onClick={handleAccept}
        >
          <CheckCircleIcon />
        </IconButton>
        <IconButton
          color="secondary"
          size="small"
          aria-label="decline"
          component="span"
          className={classes.decline}
          onClick={handleReject}
        >
          <CancelIcon />
        </IconButton>
      </div>
    </ListItem>
  );
}
