/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Endpoints from '../../utils/endpoints';
import ColorModeContext from '../../contexts/ColorModeContext';
import AlertDialog from './AlertDialog';
import GoBackContext from '../../contexts/GoBackContext';

const appName = 'My Scorewiz';

function NavBar({ pageName }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const history = useHistory();
  const { disableBack } = useContext(GoBackContext);
  const onBackClick = () => {
    history.goBack();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const { colorMode } = React.useContext(ColorModeContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disablegutters="true" sx={{ maxWidth: 'inherit' }}>
          {location?.pathname !== Endpoints.MENU() && !disableBack
          && (
          <IconButton
            aria-label="back-button"
            type="button"
            onClick={onBackClick}
            sx={{ color: 'inherit' }}
          >
            <ArrowBackIcon />
          </IconButton>
          )}
          <Box className="FlexBox" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              // display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {appName}
            {' 🔸 '}
            {pageName}
          </Typography>
          {/* <Button onClick={colorMode.toggleColorMode} style={{ color: 'white' }}>
            Theme:
            {' '}
            {theme.palette.mode}
          </Button> */}
          <Box className="FlexBox" />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
NavBar.propTypes = {
  pageName: PropTypes.string.isRequired,
};
export default NavBar;
