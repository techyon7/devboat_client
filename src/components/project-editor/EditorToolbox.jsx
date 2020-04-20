import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Popover,
} from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import AddIcon from '@material-ui/icons/Add';

const EditorToolbox = () => {

	const classes = useStyles();

	const [state, setState] = React.useState({
		hovering: false,
	});


	return(
		<Box position="relative" width={1}>
			<Box
				className="toolbox"
				display="flex"
				justifyContent="center"
				alignItems="center"
				position="relative"
			>
				<AddIcon />
				<TextFieldsIcon />
			</Box>
		</Box>
	);
}

export default EditorToolbox;

const useStyles = makeStyles(theme => ({
	toolbox: {
		minHeight: 50,
		cursor: 'pointer',
		border: '1px dashed #fff !important',
		opacity: 0,
		top: 0,
		left: 0,
	},
	toolboxHover: {
		opacity: 1,
	},
}));
