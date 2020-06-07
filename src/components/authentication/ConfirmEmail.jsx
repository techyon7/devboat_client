import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Hidden, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../assets/logo192.png";
import { POST } from "../../actions/api";

export default function ConfirmEmail(props) {
  const classes = useStyles();

  const [isResent, setIsResent] = useState(false);

  useEffect(
    () => {
      if (!props.location.state.username)
        props.history.push({
          pathname: "/login"
        });
    },
    [props.history, props.location.state.username]
  );

  const handleResend = async () => {
    const body = { username: props.location.state.username };
    await POST("/users/resend_verification_email", body);
    setIsResent(true);
    setTimeout(() => {
      setIsResent(false);
    }, 5000);
  };

  return (
    <Paper elevation={false} className={classes.paper} color="textPrimary">
      <div className={classes.root}>
        <Hidden smDown>
          <Typography variant="h5" text="center">
            Confirm your email!
          </Typography>
        </Hidden>

        <Hidden only={["md", "lg", "xl"]}>
          <Typography variant="h5" text="center">
            Confirm email
          </Typography>
        </Hidden>

        <Box mt={3}>
          <Typography variant="body1" text="center">
            Your account has been successfully created on DevBoat. To complete
            the process please check your email for a verification request.
          </Typography>
        </Box>

        <Box width={1} align="center" mt={6}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleResend}
          >
            <Box px={8}>Resend link</Box>
          </Button>
          {isResent && (
            <Typography variant="subtitle1" text="center">
              Link has been resent.
            </Typography>
          )}
        </Box>
      </div>
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(2, 10, 2, 10)
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.up("md")]: {
      width: "60%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%"
    },
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main,
    margin: "0 auto"
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "capitalize",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
  logo: {
    height: 55,
    width: 55,
    marginRight: 10
  }
}));
