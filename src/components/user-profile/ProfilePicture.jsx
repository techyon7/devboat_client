import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DropzoneArea from './Dropzone';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {
	Box,
	Icon,
	Typography,
	Button,
} from '@material-ui/core';

const ProfilePicture = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

	return (
		<div className={classes.root}>
				<Box width={1} height="100%" onClick={handleClickOpen} className={clsx(classes.editProfilePicture, classes.root)} display="flex" justifyContent="center" alignItems="center">
					<Box width={1} height="100%" className={clsx(classes.overlay, 'showOverlayOnHover' )} display="flex" justifyContent="center" alignItems="center" >
				 		<Icon className={classes.largeIcon} component={CameraAltIcon} />
				 	</Box>
		    </Box>
				<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
	        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
	          Upload Picture
	        </DialogTitle>
	        <DialogContent dividers>
	          <DropzoneArea />
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={handleClose} color="primary">
	            Save changes
	          </Button>
	        </DialogActions>
	      </Dialog>
		</div>
	);
}

export default ProfilePicture;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
	editProfilePicture: {
		borderRadius: "50%",
		boxShadow: '0px 1px 1px #111111',
		height: 100,
		width: 100,
		padding: "0px !important",
		background: "url('https://picsum.photos/200')",
		position: "relative",
		cursor: 'pointer',
	},
	profilePicture: {
		width: 100,
		height: 100,
	},
	largeIcon: {
		transform: 'scale(2)',
	},
	overlay: {
		borderRadius: "50%",
		backgroundColor: 'rgba(38,43,47, 0.5) !important',
	},
	opacityHide: {
		opacity: 0,
	},
	opacityShow: {
		opacity: 1,
	}
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
