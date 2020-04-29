import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Container,
	Grid,
	Box,
	Typography,
	IconButton,
	Hidden,
	Avatar,
	GridList,
	GridListTile,
	Divider,
	Button,
} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import Comments from '../user-profile/Comments';

const tileData = [
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
];

const ProjectDisplay = () => {
	const classes = useStyles();
	const [state] = React.useState({
		projectName: 'DevBoat',
		projectDescription: 'A social network for developers',
		projectUrl: 'https://www.devboat.com/',
		githubUrl: 'https://github.com/saumyakaran/DevBoat/',
		cover: "https://picsum.photos/1080",
		roles: [
			{
				roleName: 'Senior Developer',
				roleDescription: 'Pure awesomeness!',
			},
		],
		isInvestmentAllowed: false,
		likesCount: 521,
		commentCount: 23,
		likes: [
			{
				userId: "1",
				fullName: "Sparsh Tyagi",
			},
		],
		comments: [
			{
				userId: "1",
				fullName: "Sparsh Tyagi",
				content: "DevBoat is <3",
			},
		],
	});

	return(
		<div className={classes.root}>
		<Container maxWidth="sm" className={classes.container}>
			<Grid container className={classes.justifyCenter} spacing={5}>
				<Hidden xsDown>
					<Grid item xs={12} sm={1} className={classes.maxHeightVh}>

					</Grid>
				</Hidden>
				<Grid item xs={12} sm={8} className={classes.maxHeightVh}>
						<Box position="sticky" top="0">
							<Typography variant="h6" align="center">
								<Box fontWeight="fontWeightBold" component="span">
								{state.projectName}
								</Box>
							</Typography>
						</Box>
						<Box mt={8} className={classes.projectContent}>
							<Grid container spacing={8}>
								<Grid item xs={12}>
									<img src={state.cover} alt={state.projectName + "-cover"} width="100%" height="auto" />
								</Grid>
								<Grid item xs={12}>
									{state.projectDescription}
								</Grid>
								<Grid item xs={12}>
									<GridList className={classes.gridList} cols={2.5}>
						        {tileData.map(tile => (
						          <GridListTile key={tile.id}>
						            <img src={tile.img} alt={tile.title} />
						          </GridListTile>
						        ))}
						      </GridList>
								</Grid>
								<Grid item xs={12} className="bg-secondary">
									<Box width={1} display="flex" justifyContent="space-around">
										<IconButton>
											<FavoriteBorderIcon />
										</IconButton>
										<IconButton>
											<ModeCommentOutlinedIcon />
										</IconButton>
										<IconButton>
											<BookmarkBorderOutlinedIcon />
										</IconButton>
									</Box>
								</Grid>
								<Grid item xs={12}>
									<Box width={1} display="flex" flexDirection="column" align="center" mt={5}>
										<Typography variant="h6">
											<Box fontWeight="fontWeightMedium" component="span" color="white">
												Contribute to this project
											</Box>
										</Typography>
										<Divider className={classes.dividerCenter} />
										<Button variant="contained" color="primary">
											Apply for a role
										</Button>
										<br />
										<Button variant="contained">
											Offer investment
										</Button>
									</Box>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" align="left" color="textPrimary">
										<Box fontWeight="fontWeightMedium" component="span">
											Comments
										</Box>
									</Typography>
									<Divider className={classes.divider} />
									<Comments />
								</Grid>
							</Grid>
						</Box>
				</Grid>
				<Hidden xsDown>
					<Grid item xs={12} sm={1} className={classes.floatingInteractionMenuContainer}>
						<Grid container spacing={8} align="center">
							<Grid item xs={12}>
								<Avatar alt="Remy Sharp" src="https://picsum.photos/300" className={classes.avatar} />
							</Grid>
							<Grid item xs={12}>
								<IconButton>
									<FavoriteBorderIcon />
								</IconButton>
							</Grid>
							<Grid item xs={12}>
								<IconButton>
									<ModeCommentOutlinedIcon />
								</IconButton>
							</Grid>
							<Grid item xs={12}>
								<IconButton>
									<BookmarkBorderOutlinedIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Hidden>
			</Grid>
			</Container>
		</div>
	);
}

export default ProjectDisplay;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
		maxHeight: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5) !important",
		overflow: "hidden",
  },
	justifyCenter: {
		justifyContent: "center",
	},
	maxHeightVh: {
		maxHeight: "100vh",
	},
	floatingInteractionMenuContainer: {
		display: "flex",
		justifyContent: "center",
		maxHeight: "100vh",
		flexDirection: "column",
	},
	floatingInteractionMenu: {
		display: "flex",
		justifyContent: "center",
		maxHeight: "100%",
		flexDirection: "column",
	},
	container: {
		height: "100%",
		padding: "1rem",
	},
	projectContent: {
		color: theme.palette.text.secondary,
		backgroundColor: "#1e1e21 !important",
		maxHeight: "95%",
		overflowX: "hidden",
		padding: "1rem 0.75rem",
		borderRadius: 4,
		marginTop: 0,
	},
	avatar: {
		width: "100%",
		maxWidth: 60,
		transform: "scale(1.5)",
		height: "auto",
		transition: "all ease-in-out 0.3s",
		'&:hover' : {
			transform: "scale(2)",
			transition: "all ease-in-out 0.3s",
		},
	},
	gridList: {
		flexWrap: "nowrap",
		transform: 'translateZ(0)',
	},
	dividerCenter: {
		height: 2,
		backgroundColor: "#4b7bec",
		width: "1.5rem",
		margin: "auto auto 1rem auto",
	},
	divider: {
		height: 2,
		backgroundColor: "#4b7bec",
		width: "1.5rem",
		marginBottom: "1rem",
	},
}));
