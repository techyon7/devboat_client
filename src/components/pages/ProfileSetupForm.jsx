import React, { Fragment, useContext, useState } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import GenderDobStep from "../profile-setup/GenderDobStep";
import SkillsInterestsStep from "../profile-setup/SkillsInterestsStep";
import DevboatDescription from "../authentication/DevboatDescription";
import { makeStyles } from "@material-ui/styles";
import { Grid, Container, Box, Hidden } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";

export default function ProfileSetupForm() {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [state, setState] = useState({
    page: 1
  });

  const nextPage = () => {
    setState({ page: page + 1 });
  };

  const previousPage = () => {
    setState({ page: page - 1 });
  };

  const onSubmit = e => {
    if (state.state.page < 2) {
      e.preventDefault();
      nextPage();
    }
  };

  const { page } = state;

  return (
    <Fragment>
      {session.userIsSetup !== 0 ? (
        <Redirect to={`${session.username}`}/>
      ) : (
        <div className={classes.root}>
          <Router>
            <Grid container spacing={0} className={classes.box}>
              <Grid item xs={12} lg={6} height="100%" className={classes.primary}>
                <Box width={1} mt={20}>
                  <Container maxWidth="sm">
                    {page === 1 &&
                      <SkillsInterestsStep
                        onSubmit={nextPage}
                        page={page} />
                    }
                    {page === 2 &&
                      <GenderDobStep
                        previousPage={previousPage}
                        onSubmit={onSubmit}
                        page={page}
                        setState={setState}
                      />
                    }
                  </Container>
                </Box>
              </Grid>

              <Hidden mdDown>
                <Grid item xs={12} lg={6} height="100%">
                  <Box width={1} mt={40}>
                    <DevboatDescription />
                  </Box>
                </Grid>
              </Hidden>
            </Grid>
          </Router>
        </div>
      )}
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  },
  box: {
    height: "calc(100vh - 60px)"
  },
  primary: {
    background: "#4B7BEC"
  },
}));
