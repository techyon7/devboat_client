import React from "react";
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

export default function FolderList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Aahan Sharma" />
        <div class={classes.iconHolder}>
          <IconButton
            color="primary"
            size="small"
            aria-label="accept"
            component="span"
            className={classes.accept}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            color="secondary"
            size="small"
            aria-label="decline"
            component="span"
            className={classes.decline}
          >
            <CancelIcon />
          </IconButton>
        </div>
      </ListItem>
    </List>
  );
}
