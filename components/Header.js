import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from '../lib/api/auth';
import { styleToolbar, styleRaisedButton } from './SharedStyles';

// Header component that is displayed on all pages

function Header({ user, hideHeader, redirectUrl }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = async () => {
    await logout();
    window.location.reload(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        display: 'block',
        top: hideHeader ? '-64px' : '0px',
        transition: 'top 0.5s ease-in',
      }}
    >
      <Toolbar style={styleToolbar}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Grid item sm={8} xs={7} style={{ textAlign: 'left' }}>
            {!user ? (
              <Link href="/">
                <Avatar
                  src="https://storage.googleapis.com/"
                  alt="Builder Book logo"
                  style={{ margin: '0px auto 0px 20px', cursor: 'pointer' }}
                />
              </Link>
            ) : null}
          </Grid>
          <Grid item sm={2} xs={2} style={{ textAlign: 'right' }}>
            {user && user.isAdmin && !user.isGithubConnected ? (
              <Hidden smDown>
                <a href="/auth/github">
                  <Button variant="contained" color="primary" style={styleRaisedButton}>
                    Connect Github
                  </Button>
                </a>
              </Hidden>
            ) : null}
          </Grid>
          <Grid item sm={2} xs={3} style={{ textAlign: 'right' }}>
            {user ? (
              <div>
                <Button
                  id="menu-button"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Menu
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} id='my-account-button'>
                    <Link href="/my-account" as="/my-account" >
                      <a style={{ color: '#000' }}> My Account</a>
                    </Link>
                  </MenuItem>
                  <MenuItem id="logout-button" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link
                href={{ pathname: '/public/login', query: { redirectUrl } }}
                as={{ pathname: '/login', query: { redirectUrl } }}
              >
                <a style={{ margin: '0px 20px 0px auto' }}>Log in</a>
              </Link>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
    isAdmin: PropTypes.bool,
    isGithubConnected: PropTypes.bool,
  }),
  hideHeader: PropTypes.bool,
  redirectUrl: PropTypes.string,
};

Header.defaultProps = {
  user: null,
  hideHeader: false,
  redirectUrl: '',
};

export default Header;
