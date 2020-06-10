import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Paper,
  Typography
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { POST, PATCH } from "../../actions/api";

export default function Reset(props) {
  const classes = useStyles();

  const [user, setUser] = useState(null);

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showPasswordConfirmation: false
  });
  const [matchPassword, setMatchPassword] = useState(false);
  const [validated, setValidated] = useState(null);

  useEffect(
    () => {
      (async () => {
        const body = {
          reset_password_key: props.match.params.reset_password_key
        };
        const response = await POST("/users/reset", body);
        if (response.status === 404) {
          props.history.push({
            pathname: "/login"
          });
        }
        const user = await response.json();
        setUser(user);
      })();
    },
    [props.history, props.match.params.reset_password_key]
  );

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    var pass = event.target.value;
    var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    var test = reg.test(pass);
    if (test) {
      setValidated(true);
    } else {
      setValidated(false);
    }
    console.log(validated);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowPasswordConfirmation = () => {
    setValues({
      ...values,
      showPasswordConfirmation: !values.showPasswordConfirmation
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleResetPassword = async () => {
    if (values.password === values.confirmPassword) {
      const body = {
        password: values.password
      };

      const response = await PATCH(
        `/users/${user.username}/set_password`,
        body
      );
      if (response.status === 200) {
        props.history.push({
          pathname: "/reset-done",
          state: {
            reset_password_key: props.match.params.reset_password_key
          }
        });
      }
    } else {
      setMatchPassword(true);
    }
  };

  return (
    <Paper elevation={false} className={classes.paper} color="textPrimary">
      <div className={classes.root}>
        <Box width={1} align="center" mb={4}>
          <Typography variant="h5" text="center">
            Change Password
          </Typography>
          <Box mt={3}>
            <Typography variant="subtitle1" text="center">
              Enter a new password for your DevBoat account
            </Typography>
          </Box>
        </Box>

        <FormControl error={!validated} fullWidth>
          <InputLabel htmlFor="change-password">Password</InputLabel>
          <Input
            id="change-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />

          <FormHelperText id="change-password-helper-text">
            The password must be at least 8 characters long, contain a number,
            asymbol, an uppercase and a lowercase letter.
          </FormHelperText>
        </FormControl>

        <FormControl error={matchPassword} fullWidth>
          <InputLabel htmlFor="change-password-confirmation">
            Confirm Password
          </InputLabel>
          <Input
            id="change-password-confirmation"
            error={validated}
            type={values.showPasswordConfirmation ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirmation}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPasswordConfirmation ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {matchPassword && (
            <FormHelperText
              id="change-password-confirmation-helper-text"
              className={classes.error}
            >
              Your passwords must match!
            </FormHelperText>
          )}
        </FormControl>

        <Box width={1} align="center" mt={8}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleResetPassword}
          >
            <Box px={8}>Change Password</Box>
          </Button>
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
    width: "60%",
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
  error: {
    color: "red",
    fontSize: "0.875rem"
  }
}));
