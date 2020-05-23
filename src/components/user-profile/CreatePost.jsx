import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	IconButton,
	InputBase,
	Box,
	Button,
	Paper
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

export default function CreatePost() {
	const classes = useStyles();

	const [content, setContent] = useState("");
	const [isValid, setIsValid] = useState(false);

	const handleContentChange = (e) => {
		setContent(e.target.value);
		if(e.target.value.length > 0)
			setIsValid(true);
		else
			setIsValid(false);
	}

	return(
		<Fragment>
			<Paper elevation={false} className={classes.paper}>
				<InputBase
					multiline
          placeholder="Write something..."
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
			<Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
				<IconButton className={classes.attachment}>
					<ImageIcon style={{ fontSize: 18 }}/>
				</IconButton>
				<Button
					disabled={!isValid}
					className={clsx(classes.post, {
						[classes.active]: isValid
					})}>
					Post
				</Button>
			</Box>
		</Fragment>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(4, 3.5, 3, 4),
		textAlign: "center",
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.secondary.main
	},
	inputRoot: {
    width: '100%',
    color: 'inherit',
  },
  inputInput: {
    width: '100%',
		minHeight: 60,
		textWrap: 'wrap',
    transition: theme.transitions.create('width')
  },
	attachment: {
		backgroundColor: theme.palette.secondary.main,
		borderRadius: "50%",
		width: 38,
		height: 38,
		color: theme.palette.text.secondary,
	},
	post: {
		width: 38,
		fontSize: 16,
		backgroundColor: theme.palette.secondary.main,
		borderRadius: "4px",
		textTransform: "capitalize",
		padding: 3,
		color: theme.palette.text.secondary,
	},
	active: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.text.primary,
	}
}));
