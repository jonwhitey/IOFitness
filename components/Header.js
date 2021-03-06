import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { styleToolbar, styleRaisedButton } from './SharedStyles';

// Header component that is displayed on all pages

function Header({ user, loading, hideHeader }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            {!loading &&
              (user ? (
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
                    <MenuItem onClick={handleClose} id="my-account-button">
                      <Link href="/my-account" as="/my-account">
                        <a style={{ color: '#000' }}> My Account</a>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose} id="build-program-button">
                      <Link href="/build-program" as="/build-program">
                        <a style={{ color: '#000' }}>Build Program</a>
                      </Link>
                    </MenuItem>
                    <MenuItem id="workout-button">
                      <Link href="/train" as="/train">
                        <a style={{ color: '#000' }}>Train</a>
                      </Link>
                    </MenuItem>
                    <MenuItem id="logout-button">
                      <Link href="/api/auth/logout">
                        <a style={{ color: '#000' }}>Logout</a>
                      </Link>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Link href="/api/auth/login">
                  <a style={{ margin: '0px 20px 0px auto' }}>Log in</a>
                </Link>
              ))}
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
