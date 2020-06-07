import React, { useState, useEffect, useContext } from "react";
import InterestsSettings from "./InterestsSettings";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Dialog,
  Typography,
  Button,
  List,
  ListItem,
  ListSubheader,
  Grid,
  Paper
} from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from "../../actions/api";

const UserInterestsList = props => {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  const [interests, setInterests] = useState([]);

  useEffect(
    () => {
      (async () => {
        const response = await GET("/interests", session.token);
        const result = await response.json();
        let interests = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].user === props.userId) {
            interests = [...interests, result[i]];
          }
        }
        setInterests(interests);
      })();
    },
    [props.userId, session.token, open]
  );

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1" align="left" color="textPrimary">
          Interests
        </Typography>
        <Button className={classes.editBtn} onClick={handleClickOpen}>
          <EditIcon style={{ fontSize: 16 }} />
        </Button>
        <Dialog
          fullWidth
          maxWidth="xs"
          onClose={handleClickClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <List
            subheader={
              <ListSubheader>
                <Typography
                  component="span"
                  variant="button"
                  className={classes.dialog}
                >
                  Interests
                </Typography>
              </ListSubheader>
            }
          >
            <InterestsSettings />
          </List>
        </Dialog>
      </Box>
      <List disablePadding>
        {interests.map(interest => (
          <ListItem className={classes.listItem} key={interest.name}>
            <Typography variant="body2">{interest.name}</Typography>
          </ListItem>
        ))}
        {interests <= 0 && props.isProfileSelf && (
          <Grid className={classes.item} item xs={12}>
            <Paper elevation={false} className={classes.paper}>
              <Typography
                style={{
                  textAlign: "center",
                  margin: 10,
                  fontSize: 14,
                  color: "#bab8b8",
                  wordBreak: "break-word"
                }}
              >
                Let others know what technologies you are interested in
              </Typography>
            </Paper>
          </Grid>
        )}
        {interests <= 0 && !props.isProfileSelf && (
          <Grid className={classes.item} item xs={12}>
            <Paper elevation={false} className={classes.paper}>
              <Typography
                style={{
                  textAlign: "center",
                  margin: 10,
                  fontSize: 14,
                  color: "#bab8b8",
                  wordBreak: "break-word"
                }}
              >
                No interests to show
              </Typography>
            </Paper>
          </Grid>
        )}
      </List>
    </Box>
  );
};

export default UserInterestsList;

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(0.5, 0, 0.5, 0)
  },
  editBtn: {
    padding: 0,
    minWidth: 28,
    width: 28,
    height: 28,
    borderRadius: "50%"
  },
  item: {
    marginBottom: "0.625rem"
  },
  paper: {
    padding: theme.spacing(3, 3.5, 3, 3.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main
  }
}));
