import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
	ListItem,
	ListItemText,
	IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { GET } from "../../actions/api";
import { GlobalContext } from "../../context/GlobalContext";

const Search = () => {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);

  useEffect(() => {
		(async () => {
			const response = await GET('/users', session.token);
			const result = await response.json();
			setUsers(result);
		})();
	}, [session.token]);

  useEffect(() => {
    (async () => {
      if(searchQuery.length === 0)
        setIsSearchOpen(false);
      else {
        setIsSearchOpen(true);
        const filteredUsers = users.filter(user => {
          return `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredUsers(filteredUsers);
      }
    })();
  }, [users, searchQuery]);

  const handleClose = () => {
    setSearchQuery("");
  }

  return(
    <div className={classes.search}>
      <div className={classes.searchBar}>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <IconButton className={classes.searchIcon}>
          {isSearchOpen ? <CloseIcon onClick={handleClose}/> : <SearchIcon />}
        </IconButton>
      </div>
      <div className={classes.searchResults}>
        {isSearchOpen && (
          filteredUsers.map((user) => (
						user.id !== session.userId &&
            <ListItem
              button
              component={Link}
              key={user.id}
              className={classes.searchItem}
              onClick={handleClose}
              to={`/${user.username}`}>
              <ListItemText id="switch-list-label" primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
          ))
        )}
      </div>
    </div>
	);
}

export default Search;

const useStyles = makeStyles(theme => ({
  search: {
		width: '63%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: '#212124',
    },
    alignSelf: 'flex-start',
    marginTop: 10
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
		marginRight: theme.spacing(2),
		position: 'absolute',
		right: 0,
  },
  inputRoot: {
    width: '90%',
    color: 'inherit',
  },
  inputInput: {
    width: '100%',
    padding: theme.spacing(2.5, 5, 2.5, 5),
    transition: theme.transitions.create('width')
  },
  searchItem: {
    paddingTop: 8,
    paddingBottom: 8
  }
}));
