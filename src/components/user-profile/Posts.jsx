import React, { Fragment } from "react";
import Post from "../user-profile/Post";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
export default function Posts(props) {
  const classes = useStyles();
  return (
    <Fragment>
      {props.posts.map(item => (
        <Post
          key={item.id}
          id={item.id}
          content={item.content}
          date={item.created_on}
          userFirstName={props.userFirstName}
          userLastName={props.userLastName}
          userPicture={props.userPicture}
          userCrop={props.userCrop}
          loadPosts={props.loadPosts}
        />
      ))}
      {props.posts <= 0 && (
        <Grid className={classes.item} item xs={12}>
          <Paper elevation={false} className={classes.paper}>
            <Typography
              style={{
                textAlign: "center",
                margin: 10,
                fontSize: 14,
                color: "#bab8b8"
              }}
            >
              No posts to show
            </Typography>
          </Paper>
        </Grid>
      )}
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4, 0, 4, 0),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main
  },
  item: {
    marginBottom: "0.625rem"
  }
}));
