import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
	ListItem,
	ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
	Button
} from '@material-ui/core';
import UserPicture from "./UserPicture";
import { GlobalContext } from "../../context/GlobalContext";
import { GET, POST, DELETE } from "../../actions/api";

const useStyles = makeStyles(() => ({
  iconHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
}));

export default function RecommendationItem(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [user, setUser] = useState(null);
  const [requestId, setRequestId] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await GET(`/users/${props.username}`, session.token);
      const user = await response.json();

      setUser(user);
    })();
  }, [session.token, props.username]);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    let body = {
      sender: session.userId,
      receiver: user.id
    };

    const response = await POST('/requests', body, session.token);
    const result = await response.json();
    setRequestId(result.id);
  }

  const handleCancelRequest = async (e) => {
    e.preventDefault();
    await DELETE(`/requests/${requestId}`, session.token);
    setRequestId(null);
  }

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
        {
          requestId ?
          <Button size="small" variant="outlined" color="default" onClick={handleCancelRequest}>
            Cancel
          </Button>
          :
          <Button size="small" variant="outlined" color="default" onClick={handleSendRequest}>
            Add
          </Button>
        }
      </div>
    </ListItem>
  );
}
