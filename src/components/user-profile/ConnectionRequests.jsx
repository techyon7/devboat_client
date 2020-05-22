import React, { useCallback, useState, useEffect, useContext } from "react";
import { Box, List } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import ConnectionRequestItem from "./ConnectionRequestItem";
import { GET } from "../../actions/api";

export default function ConnectionRequests() {
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

  useEffect(() => {
      loadRequests();
  }, [loadRequests]);

  const handleChange = () => {
    loadRequests();
  };

  return (
    <Box>
      {requests.length > 0 &&
        <List>
          {requests.map(item => (
            <ConnectionRequestItem
              requestId={item.id}
              userId={item.sender}
              handleChange={handleChange}
            />
          ))}
        </List>
      }
    </Box>
  );
}
