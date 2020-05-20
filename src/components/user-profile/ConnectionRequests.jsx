import React, { useCallback, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import { GlobalContext } from "../../context/GlobalContext";
import ConnectionRequestItem from "./ConnectionRequestItem";
import { GET } from "../../actions/api";

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

export default function RequestList(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);
  const [requests, setRequests] = useState([]);

  const loadRequests = useCallback(
    async () => {
      const response = await GET("/requests", session.token);
      const requests = await response.json();

      let filteredRequests = [];
      for (let i = 0; i < requests.length; i++) {
        if (requests[i].receiver === session.userId) {
          filteredRequests = [...filteredRequests, requests[i]];
        }
      }
      setRequests(filteredRequests);
    },
    [session.userId, session.token]
  );
  useEffect(
    () => {
      loadRequests();
    },
    [loadRequests]
  );

  const handleChange = () => {
    loadRequests();
  };
  return (
    <List className={classes.root}>
      {requests.map(item => (
        <ConnectionRequestItem
          requestId={item.id}
          userId={item.sender}
          handleChange={handleChange}
        />
      ))}
    </List>
  );
}
