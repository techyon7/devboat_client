import React, { useCallback, useState, useEffect, useContext } from "react";
import { Box, List, Typography } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import RecommendationItem from "./RecommendationItem";
import { GET } from "../../actions/api";

export default function Recommendations() {
  const { session } = useContext(GlobalContext);
  const [recommendations, setRecommendations] = useState([]);

  const loadRecommendations = useCallback(
    async () => {
      const response = await GET(
        `/users/${session.username}/recommendations`,
        session.token
      );
      const recommendations = await response.json();

      setRecommendations(recommendations);
    },
    [session.username, session.token]
  );

  useEffect(
    () => {
      loadRecommendations();
    },
    [loadRecommendations]
  );

  const handleChange = () => {
    loadRecommendations();
  };

  return (
    <Box>
      {recommendations.length > 0 && (
        <List>
          {recommendations.map(item => (
            <RecommendationItem
              key={item}
              username={item}
              handleChange={handleChange}
            />
          ))}
        </List>
      )}
      {recommendations.length <= 0 && (
        <List>
          <Typography
            style={{
              fontSize: 14,
              margin: 10,
              color: "#bab8b8"
            }}
          >
            {" "}
            Nothing to show here
          </Typography>
        </List>
      )}
    </Box>
  );
}
