import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';

import Iconify from 'src/components/iconify';
import { shadows } from 'src/theme/shadows';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav, isActive, setIsActive }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const { pageHerder } = useSelector((state) => state?.common);

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ width: '-webkit-fill-available' }}>
        <Typography variant="normal" color="text.dark">
          {pageHerder}
        </Typography>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        spacing={1}
      >
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        // boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar - 50,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        borderBottom: `solid 1px ${theme.palette.grey[300]} `,
        background: theme.palette.background.light,
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${isActive ? NAV.SORT_WIDTH : NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
        boxShadow: shadows()[3],
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          // px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
  isActive: PropTypes.bool,
};
