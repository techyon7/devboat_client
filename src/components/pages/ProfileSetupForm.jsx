import React, { useState } from "react";
// import clsx from 'clsx';
import { BrowserRouter as Router } from "react-router-dom";
import GenderDobStep from "../profile-setup/GenderDobStep";
import SkillsInterestsStep from "../profile-setup/SkillsInterestsStep";
import DevboatDescription from "../authentication/DevboatDescription";
import { makeStyles } from "@material-ui/styles";
import { Grid, Container, Box, Hidden } from "@material-ui/core";

// Authentication Component

export default function ProfileSetupForm(props) {
  // React hooks
  const classes = useStyles();

  // State
  const [state, setState] = useState({
    page: 1
  });

  // Event Handlers
  const nextPage = state => {
    setState({ page: page + 1 });
  };

  const previousPage = state => {
    setState({ page: page - 1 });
  };

  const onSubmit = e => {
    if (state.state.page < 2) {
      e.preventDefault();
      nextPage();
    }
  };

  const handleRedirect = () => {
    props.history.push({
      pathname: "/profile"
    });
  };
  const { page } = state;

  // JSX Markup
  return (
    <div className={classes.root}>
      <Router>
        {/* Grid Layout */}
        <Grid container spacing={0}>
          <Grid item xs={12} lg={6} className={classes.boxPrimary}>
            {/* Form container */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight="100vh"
              width={1}
              px={3}
            >
              {/* Limit Width */}
              <Container maxWidth="sm">
                {page === 1 && (
                  <SkillsInterestsStep onSubmit={nextPage} page={page} />
                )}
                {page === 2 && (
                  <GenderDobStep
                    previousPage={previousPage}
                    onSubmit={onSubmit}
                    page={page}
                    setState={setState}
                    handleRedirect={handleRedirect}
                  />
                )}
              </Container>
            </Box>
          </Grid>

          {/* Description container (Hidden in small devices) */}
          <Hidden mdDown>
            <Grid item xs={12} lg={6}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
              >
                <DevboatDescription />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Router>
    </div>
  );
}

// Styles

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  },
  boxPrimary: {
    background: "#4B7BEC"
  }
}));
