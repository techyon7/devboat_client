import React from 'react';
import clsx from 'clsx';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import {
	Icon,
	Typography
} from '@material-ui/core';

export default function DropzoneArea() {
	const classes = useStyles();
  return (
		<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
		  {({getRootProps, getInputProps}) => (
		      <div {...getRootProps()}  className={clsx(classes.dropzoneBorder, "dropzoneBorder")} >
		        <input {...getInputProps()} />
						<Icon fontSize="large" component={CloudUploadIcon} />
		        <Typography variant="body1" align="center">
							Drag 'n' drop some files here, or click to select files
						</Typography>
		      </div>
		  )}
		</Dropzone>
	);
}

const useStyles = makeStyles(theme => ({
  dropzoneBorder: {
    border: "2px dashed rgba(255, 255, 255, 0.7) !important",
		padding: 16,
		maxWidth: 350,
		height: 250,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer"
  },
}));
