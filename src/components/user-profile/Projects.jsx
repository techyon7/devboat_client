import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	IconButton,
	Box,
	Typography,
	Divider,
	Dialog,
	Slide,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ProjectDisplay from '../pages/ProjectDisplay';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Projects component

const Projects = () => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		tileData: [
			{
				id: 1,
				img: "https://picsum.photos/400",
				title: 'Image',
				author: 'author',
				open: false,
			},
			{
				id: 2,
				img: "https://picsum.photos/400",
				title: 'Image',
				author: 'author',
				open: false,
			},
			{
				id: 3,
				img: "https://picsum.photos/400",
				title: 'Image',
				author: 'author',
				open: false,
			},
			{
				id: 4,
				img: "https://picsum.photos/400",
				title: 'Image',
				author: 'author',
				open: false,
			},
		],
	});

	const handleOpen = (tile) => {
		const oldData = state.tileData.filter(currTile => currTile !== tile);
		const updatedTile = {
			...tile,
			open: true,
		};
		setState({
			...state,
			tileData: [
				...oldData,
				updatedTile,
			],
		});
	}

	const handleClose = (tile) => {
		const oldData = state.tileData.filter(currTile => currTile !== tile);
		const updatedTile = {
			...tile,
			open: false,
		};
		const newData = [...oldData, updatedTile];
		setState({
			...state,
			tileData: newData,
		});
	}

	// JSX Markup
	return(
		<React.Fragment>
			<Typography variant="body1" align="left" color="textPrimary">
				<Box fontWeight="fontWeightMedium" component="span">
					Projects
				</Box>
			</Typography>
			<Divider className={classes.divider} />
			<Grid container spacing={5} width={1}>
				<Grid item xs={6} sm={4}>
					<IconButton component={Link} to="/project-editor" className={classes.addProject}>
	  				<AddIcon />
						Add a project
					</IconButton>
						{/*<Dialog fullWidth maxWidth="sm" onClose={handleClose} aria-labelledby="project-settings-dialog" open={open}>
							<ProjectSettings />
						</Dialog>*/}
				</Grid>

        {state.tileData.map((tile, index) => (
					<React.Fragment key={tile.id}>
					<Grid className={classes.tile} item xs={6} sm={4} onClick={() => handleOpen(tile)}>
						<Box position="relative" display="flex">
							<img src={tile.img} alt={tile.title} width="100%" height="auto" className={classes.rounded} />
							<Box position="relative" display="flex" className={clsx(classes.projectCover, 'showOverlayOnHover')} width={1}>
								<Grid container justify="space-between" className={classes.coverContent}>
									<Grid item xs={6}>
										<Typography variant="body2">
											<Box component="span" fontWeight="fontWeightBold">
												{tile.title}
											</Box>
											<br />
											<Box component="span" fontSize={12} fontWeight="fontWeightRegular">
												{tile.author}
											</Box>
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body2" align="right">
											<VisibilityIcon className={classes.smallIcon} />
											<Box component="span" fontSize={12} fontWeight="fontWeightRegular">
												524
											</Box>
											<br />
											<ThumbUpIcon className={classes.smallIcon} />
											<Box component="span" fontSize={12} fontWeight="fontWeightRegular">
												61
											</Box>
										</Typography>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Grid>
					<Dialog
					fullScreen
					open={tile.open}
					onClose={() => handleClose(tile)}
					TransitionComponent={Transition}
					className={classes.projectBackground}
					PaperProps={{
				    style: {
				      backgroundColor: 'transparent',
				      boxShadow: 'none',
				    }
					}}
					>
						<Box position="fixed" alignSelf="flex-end" mt={3} ml={-4}>
							<IconButton edge="start" color="inherit" onClick={() => handleClose(tile)} aria-label="close" className="hover-scale-up">
								<CloseIcon />
							</IconButton>
						</Box>
						<ProjectDisplay />
					</Dialog>
					</React.Fragment>
        ))}
      </Grid>
		</React.Fragment>
	);

}

export default Projects;

const useStyles = makeStyles(theme => ({
	divider: {
		height: 2,
		backgroundColor: "#4b7bec",
		width: "1.5rem",
		marginBottom: "1rem",
	},
	rounded: {
		borderRadius: "1rem",
	},
	addProject: {
		backgroundColor: "#4b7bec",
		borderRadius: "1rem",
		width: "100%",
		height: "calc(100% - 5px)",
		boxSizing: "border-box",
	},
	projectCover: {
		left: "-100%",
		flexShrink: 0,
	},
	coverContent: {
		alignSelf: 'flex-end',
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
		padding: "1rem",
		borderRadius: "1rem",
	},
	smallIcon: {
		height: "0.75rem",
	},
	tile: {
		position: "relative",
	},
}));
