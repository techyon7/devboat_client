import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Dialog,
	DialogTitle,
	Typography,
	InputBase,
	IconButton,
	Paper,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar
} from '@material-ui/core';
import SearchResults from 'react-filter-search';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';

const SearchFollowers = (props) => {

	const {	connectionsCount, connections } = props;
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [state, setState] = React.useState({
		search: '',
	});

  function handleClickOpen() {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
		setState({search: ''});
	};

	const handleSearch = e => setState({
		search: e.target.value,
	});

	return (
		<React.Fragment>
			<Box onClick={handleClickOpen} className={classes.pointer}>
				<Typography variant="h5" color="textPrimary">
					<Box fontWeight="fontWeightBold" component="span">
						{props.connectionsCount}
					</Box>
				</Typography>
				<Typography variant="subtitle1">
					<Box fontWeight="fontWeightRegular" component="span">
						Followers
					</Box>
				</Typography>
			</Box>
			<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
		  	<DialogTitle id="simple-dialog-title" className="bg-cinder-light">
					<Box w={1} display="flex" alignItems="center">
						<Typography variant="h5" color="textPrimary" align="left">
							<Box fontWeight="fontWeightMedium" component="span" mr={3}>
								Followers
							</Box>
						</Typography>
						<Typography variant="subtitle1" align="left">
							<Box fontWeight="fontWeightMedium" component="span">
								({connectionsCount})
							</Box>
						</Typography>
					</Box>
				</DialogTitle>

				<Box px={3} width={1}>
					<Paper className={classes.search}>
						<InputBase
							className={classes.input}
			        placeholder="Search Connections..."
			        inputProps={{ 'aria-label': 'search connections' }}
							value={state.search}
							onChange={handleSearch}
			      />
			      <IconButton className={classes.iconButton} aria-label="search">
			        <SearchIcon />
			      </IconButton>
					</Paper>
				</Box>

				<List id="scrollableConnectionsList">
					<SearchResults
						value={state.search}
						data={connections}
						renderResults={connections => (
							connections.map(connection => (
						<ListItem button key={connection.id}>
							<ListItemAvatar>
								<Avatar className={classes.avatar}>
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={connection.user.name} />
						</ListItem>
					)))}
					/>

	      </List>
			</Dialog>
		</React.Fragment>
	);
}

export default SearchFollowers;

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paper: {
		backgroundColor: "#262B2F !important"
	},
	connectionAvatar: {
		border: '2px solid #262B2F',
		height: 48,
		width: 48,
		marginLeft: "-1rem",
	},
	search: {
    padding: '4px 4px',
    display: 'flex',
    alignItems: 'center',
		justifyContent: 'center',
    width: 400,
		backgroundColor: '#3A4147',
		margin: '1rem auto'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	avatar: {
		backgroundColor: blue[100],
		color: blue[600],
	},
	pointer: {
		cursor: 'pointer',
	},
}));
