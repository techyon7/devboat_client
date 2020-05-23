import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	InputBase,
	Box,
	Button,
	Paper
} from '@material-ui/core';
import { GlobalContext } from "../../context/GlobalContext";
import { POST } from "../../actions/api";

export default function CreatePost(props) {
	const classes = useStyles();
  const { session } = useContext(GlobalContext);

	const [content, setContent] = useState("");
	const [isValid, setIsValid] = useState(false);

	const handleContentChange = (e) => {
		setContent(e.target.value);
		if(e.target.value.length > 0)
			setIsValid(true);
		else
			setIsValid(false);
	}

	const handleComment = async () => {
    const body = {
      content: content,
			post: props.postId,
      user: session.userId
    };

    await POST("/comments", body, session.token);
		setContent("");
		setIsValid(false);
		props.commentCreated();
	}

	return(
		<Box pl={4} pr={4}>
			<Paper elevation={false} className={classes.paper}>
				<InputBase
					multiline
          placeholder="Write a comment..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
					color="primary"
          inputProps={{ 'aria-label': 'content' }}
          value={content}
          onChange={handleContentChange}
        />
			</Paper>
			<Box mt={2} display="flex" alignItems="center" justifyContent="flex-start">
				<Button
					disabled={!isValid}
					className={clsx(classes.comment, {
						[classes.active]: isValid
					})}
					onClick={handleComment}>
					Comment
				</Button>
			</Box>
		</Box>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		textAlign: "center",
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.secondary.main
	},
	inputRoot: {
		padding: 0,
    width: '100%',
    color: 'inherit',
		borderRadius: "4px",
		backgroundColor: theme.palette.secondary.vice
  },
  inputInput: {
		padding: theme.spacing(1, 2, 1, 2),
		fontSize: 14,
    width: '100%',
		textWrap: 'wrap',
    transition: theme.transitions.create('width')
  },
	comment: {
		fontSize: 12,
		backgroundColor: theme.palette.secondary.vice,
		borderRadius: "4px",
		textTransform: "capitalize",
		padding: theme.spacing(0.5, 1.5, 0.5, 1.5),
		color: theme.palette.text.secondary,
	},
	active: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.text.primary,
	}
}));
