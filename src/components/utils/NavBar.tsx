import React, { useContext } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { Endpoints } from '../../utils/endpoints';
import { useColorModeContext } from '../../contexts/ColorModeContext';
import AlertDialog from './AlertDialog';
import { useGoBackContext } from '../../contexts/GoBackContext';

const appName = 'My Scorewiz';

interface NavBarProps {
  pageName: string;
}

function NavBar({ pageName }: NavBarProps): React.ReactElement {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const history = useHistory();
  const { disableBack } = useGoBackContext();
  const onBackClick = () => {
    history.goBack();
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  // const { toggleColorMode } = useColorModeContext(); // TODO: Dark mode with MUI v5 is not working properly

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ maxWidth: 'inherit' }}>
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
          {/* <Button onClick={toggleColorMode} style={{ color: 'white' }}>
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

export default NavBar;
