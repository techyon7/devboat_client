import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import Search from './Search';
import logo from '../../assets/logo192.png';
import { GlobalContext } from '../../context/GlobalContext';
import { POST } from '../../actions/api';

const NavBar = () => {
  const classes = useStyles();
  const { setSession } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    const response = await POST('/auth/logout');
    if (response.status === 200) {
      setSession({
        token: null,
        userId: null,
        userFirstName: null,
        userLastName: null,
        userImg: null
      });
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <Link to="/" onClick={handleMobileMenuClose}>
      <MenuItem>
        <IconButton
          color="default"
        >
          <AccountCircle />
        </IconButton>
        <Typography variant="body1" color="textPrimary">Profile</Typography>
      </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <SettingsIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appbar} position="static" color="secondary">
				<Container maxWidth="xl">
  				<Toolbar className={classes.toolbar}>
            <Link to="/"className={classes.logoWrapper}>
              <img className={classes.logo} alt="logo" src={logo}/>
            </Link>
            <Search />
  					<div className={classes.sectionDesktop}>
  						<IconButton aria-label="show new notifications" color="inherit" className={classes.navIcon}>
  							<Badge badgeContent={0} color="primary">
  								<NotificationsIcon />
  							</Badge>
  						</IconButton>
              <Link to="/">
              <IconButton
                color="default"
                className={classes.navIcon}
              >
                <AccountCircle />
              </IconButton>
              </Link>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                className={classes.navIcon}
              >
                <SettingsIcon />
              </IconButton>
  					</div>
  					<div className={classes.sectionMobile}>
  						<IconButton
  							aria-label="show more"
  							aria-controls={mobileMenuId}
  							aria-haspopup="true"
  							onClick={handleMobileMenuOpen}
  							color="inherit"
  						>
  							<MoreIcon />
  						</IconButton>
  					</div>
  				</Toolbar>
				</Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default NavBar;

const useStyles = makeStyles(theme => ({
  grow: {
    height: 60
  },
  appbar: {
    position: 'fixed',
    height: 60
  },
	toolbar: {
    height: 60,
		justifyContent: 'space-between',
    alignItems: 'center'
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoWrapper: {
    width: '5%',
    lineHeight: 0
  },
  logo: {
    height: 42,
    width: 42,
    cursor: 'pointer'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '12%',
      height: '80%',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
	navIcon: {
		width: 36,
    height: 36
	}
}));
