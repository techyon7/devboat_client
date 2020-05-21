import React, { useCallback, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { GlobalContext } from "../../context/GlobalContext";
import ConnectionRequestItem from "./ConnectionRequestItem";
import { GET } from "../../actions/api";

const useStyles = makeStyles(() => ({
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

export default function RequestList() {
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
