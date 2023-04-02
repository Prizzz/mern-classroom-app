import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from './../auth/auth-helper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Library from '@material-ui/icons/LocalLibrary';
import Button from '@material-ui/core/Button';

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: '#ff4081' };
  else return { color: '#ffffff' };
};

const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return { color: '#fcfcfa', backgroundColor: '#af164a', marginRight: 10 };
  else
    return {
      color: '#616161',
      backgroundColor: '#fcfcfa',
      border: '1px solid #af164a',
      marginRight: 10,
    };
};

const Menu = withRouter(({ history }) => (
  <AppBar position="fixed" style={{ zIndex: 100 }}>
    <Toolbar>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, '/')}>
            <HomeIcon />
          </IconButton>
        </Link>
      </div>
      <div style={{ position: 'absolute', right: '10px' }}>
        <span style={{ float: 'right' }}>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
                <Button style={isActive(history, '/signup')}>Sign up</Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive(history, '/signin')}>Sign In</Button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              {auth.isAuthenticated().user.educator && (
                <Link to="/teach/courses">
                  <Button style={isPartActive(history, '/teach/')}>
                    <Library /> Teach
                  </Button>
                </Link>
              )}
              <Link to={'/user/' + auth.isAuthenticated().user._id}>
                <Button style={isActive(history, '/user/' + auth.isAuthenticated().user._id)}>
                  My Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => history.push('/'));
                }}
              >
                Sign out
              </Button>
            </span>
          )}
        </span>
      </div>
    </Toolbar>
  </AppBar>
));

export default Menu;
