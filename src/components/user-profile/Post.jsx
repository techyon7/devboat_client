import React, { useState, useEffect, useContext, useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Button,
  Paper,
  Typography,
  IconButton
} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import UserPicture from "./UserPicture";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import CreateComment from "./CreateComment";
import Comments from "./Comments";
import { GlobalContext } from "../../context/GlobalContext";
import { POST, GET, DELETE } from "../../actions/api";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function Post(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [upvotes, setUpvotes] = useState([]);
  const [upvotesCount, setUpvotesCount] = useState(0);
  const [upvoteId, setUpvoteId] = useState(null);

  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(upvotes); // remove later

  const handleDeletePost = async id => {
    await DELETE(`/posts/${id}`, session.token);
    props.loadPosts();
  };

  const loadComments = useCallback(
    async () => {
      const response = await GET("/comments", session.token);
      const result = await response.json();
      let comments = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i].post === props.id) {
          comments = [...comments, result[i]];
        }
      }
      setComments(comments);
      setCommentsCount(comments.length);
    },
    [props.id, session.token]
  );

  useEffect(
    () => {
      loadComments();
    },
    [loadComments]
  );

  useEffect(
    () => {
      (async () => {
        const response = await GET("/upvotes", session.token);
        const result = await response.json();
        let upvotes = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].post === props.id) {
            upvotes = [...upvotes, result[i]];
            if (result[i].user === session.userId) setUpvoteId(result[i].id);
          }
        }
        setUpvotes(upvotes);
        setUpvotesCount(upvotes.length);
      })();
    },
    [session.userId, props.id, session.token, setUpvotes]
  );

  const handleUpvote = async () => {
    const body = {
      post: props.id,
      user: session.userId
    };

    const response = await POST("/upvotes", body, session.token);
    const result = await response.json();
    setUpvoteId(result.id);
    setUpvotesCount(upvotesCount + 1);
  };

  const deleteUpvote = async () => {
    await DELETE(`/upvotes/${upvoteId}`, session.token);
    setUpvoteId(null);
    setUpvotesCount(upvotesCount - 1);
  };

  const commentCreated = () => {
    loadComments();
  };

  return (
    <Grid className={classes.item} item xs={12}>
      <Paper elevation={false} className={classes.paper}>
        <Box pl={4} pr={4} mb={isOpen ? 4 : 0}>
          <Box
            mb={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              mb={4}
              display="flex"
              alignItems="center"
              justifyContent="left"
            >
              <Box className={classes.userPic}>
                <UserPicture
                  picture={props.userPicture}
                  crop={props.userCrop}
                />
              </Box>
              <Box className={classes.title}>
                <Typography variant="body1" color="textPrimary">
                  {`${props.userFirstName} ${props.userLastName}`}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={classes.small}
                >
                  {new Date(props.date).toUTCString()}
                </Typography>
              </Box>
            </Box>
            <Box mb={10}>
              <IconButton onClick={handleClick}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <EditIcon />
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleDeletePost(props.id)}>
                  <DeleteIcon />
                  Delete
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Typography textAlign="left" variant="body1" color="textSecondary">
            {props.content}
          </Typography>
          <Box mt={4} display="flex" alignItems="center" justifyContent="left">
            <Button
              className={clsx(classes.button, {
                [classes.active]: upvoteId
              })}
              onClick={upvoteId ? deleteUpvote : handleUpvote}
            >
              <ExpandLessRoundedIcon
                style={{ fontSize: 16, transform: "scale(1.8)" }}
              />
              <Typography
                variant="body1"
                color="textPrimary"
                className={classes.count}
              >
                {upvotesCount}
              </Typography>
            </Button>
            <Button className={classes.button} onClick={() => setIsOpen(true)}>
              <ForumRoundedIcon style={{ fontSize: 16 }} />
              <Typography
                variant="body1"
                color="textPrimary"
                className={classes.count}
              >
                {commentsCount}
              </Typography>
            </Button>
          </Box>
        </Box>
        {isOpen && (
          <Box>
            <CreateComment postId={props.id} commentCreated={commentCreated} />
            <Comments comments={comments} />
          </Box>
        )}
      </Paper>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4, 0, 4, 0),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main
  },
  popOverContent: {
    padding: theme.spacing(2)
  },
  item: {
    marginBottom: "0.625rem"
  },
  userPic: {
    width: 32,
    height: 32,
    marginRight: 8,
    cursor: "pointer"
  },
  button: {
    minWidth: 56,
    height: 30,
    fontSize: 14,
    letterSpacing: 1.1,
    marginRight: 8,
    backgroundColor: theme.palette.secondary.vice,
    borderRadius: "16px",
    textAlign: "left",
    color: theme.palette.text.primary,
    justifyContent: "space-around"
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
  title: {
    cursor: "pointer"
  },
  small: {
    fontSize: "0.75rem"
  },
  count: {
    fontSize: "1rem"
  },
  upvote: {
    transform: "scale(1.8)"
  }
}));
