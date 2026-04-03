import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// import { alpha } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { logout } from 'src/utils/auth-utils';

import { NAV } from './config-layout';
import { adminNavConfig, companyNavConfig } from './config-navigation';
import { shadows } from 'src/theme/shadows';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav, isActive }) {
  const pathname = usePathname();
  const [openChild, setOpenChild] = useState(false);
  // const PermissionList = useSelector((state) => state?.auth?.permissionList);

  const [filterNavItems, setFilterNavItems] = useState([]);
  const [title, setTitle] = useState('');

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  useEffect(() => {
    // const filterData = PermissionList?.filter((item) => item?.CanRead === 1);
    const userRole = localStorage.getItem('roleId');

    if (Number(userRole) === 1) {
      setFilterNavItems(adminNavConfig);
    } else if (Number(userRole) === 2) {
      setFilterNavItems(companyNavConfig);
    }
  }, []);

  const renderMenu = (
    <Stack component="nav" spacing={0.8} sx={{ px: isActive ? 1 : 1 }}>
      <>
        {filterNavItems.map((item) => (
          <NavItem
            key={item?.ModulesName}
            item={item}
            setOpenChild={setOpenChild}
            openChild={openChild}
            setTitle={setTitle}
            title={title}
          />
        ))}

        <ListItemButton
          onClick={logout}
          sx={{
            // minHeight: 44,
            borderRadius: 100,
            typography: 'body1',
            color: 'text.dark',
            textTransform: 'capitalize',
            // border: (theme) => `solid 1px ${alpha(theme.palette.primary.main, 0.3)} `,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="body12">Logout</Typography>
          </Stack>
        </ListItemButton>
      </>
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ mb: 2.5, py: 0.5 }}>
        {isActive ? <Logo sx={{ m: 'auto', my: 1.5 }} /> : <Logo sx={{ ml: 3.3, my: 1.2 }} />}
      </Box>
      {renderMenu}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: isActive ? NAV.SORT_WIDTH : NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: isActive ? NAV.SORT_WIDTH : NAV.WIDTH,
            background: (theme) => `${theme.palette.background?.paper}`,
            boxShadow: shadows()[5],
            // borderRight: (theme) => `solid 1px ${theme.palette.primary?.main}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  isActive: PropTypes.bool,
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item, setOpenChild, openChild, setTitle, title }) {
  const pathname = usePathname();

  const isChildRouteActive = item.child?.some(
    (child) => pathname.startsWith(child.path.replace(':id', '')) // Adjust for dynamic routes
  );

  const active = item.path === pathname || isChildRouteActive;

  const showChildren = item.child?.some((child) => child.display);

  // const active = item.path === pathname;

  const toggleOpen = (value) => {
    setTitle(() => value.title);
    if (showChildren) {
      setOpenChild((prev) => !prev);
    } else {
      setOpenChild(false);
    }
  };

  return (
    <Box sx={{}}>
      <ListItemButton
        component={RouterLink}
        href={item.path}
        onClick={() => toggleOpen(item)}
        sx={{
          borderRadius: 5,
          typography: 'body12',
          color: 'text.dark',
          px: 1.5,
          py: 0.8,
          textTransform: 'capitalize',
          ...(active && {
            color: 'text.light',
            border: 'none',
            typography: 'bold',
            bgcolor: (theme) => theme.palette.background.dark,
            '&:hover': {
              bgcolor: (theme) => theme.palette.background.dark,
            },
          }),
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {active && (
              <Box
                component="span"
                sx={{
                  width: 12,
                  height: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item?.icon}
              </Box>
            )}

            <Typography variant="body12">{item?.title}</Typography>
          </Stack>

          {/* 👉 Show icon only if children exist */}
          {showChildren &&
            (openChild && item.title === title ? (
              <ExpandMoreIcon fontSize="small" />
            ) : (
              <ChevronRightIcon fontSize="small" />
            ))}
        </Stack>
      </ListItemButton>
      {showChildren && item.title === title && (
        <Collapse in={openChild} timeout="auto" unmountOnExit>
          <Stack
            spacing={1}
            sx={{
              // mx: 2,
              // // borderRadius: '0px 0px 5px 5px',
              // color: 'text.primary',
              // borderLeft: '2px solid',
              // borderColor: 'grey.400',
              // borderTop: 'none',
              // py: 0.5,
              // px: 1,
              mx: 2,
              color: 'text.primary',
              py: 0.5,
              px: 1,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: -2,
                top: 1,
                bottom: 20, // 👈 🔥 increase this to reduce length
                width: '2px',
                bgcolor: 'grey.400',
              },
            }}
          >
            {item.child
              .filter((child) => child.display)
              .map((child) => {
                const activeChild = child.path === pathname;
                return (
                  <Box
                    key={child.path}
                    sx={{
                      position: 'relative',
                      pl: 1,
                      // Curved connector
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: -10,
                        top: 2,
                        width: 12,
                        height: 12,
                        borderLeft: '2px solid',
                        borderBottom: '2px solid',
                        borderColor: 'grey.400',
                        borderBottomLeftRadius: '8px',
                      },
                    }}
                  >
                    <Typography
                      component={RouterLink}
                      href={child.path}
                      sx={{
                        typography: 'body12',
                        color: 'text.dark',
                        textDecoration: 'none',
                        textTransform: 'capitalize',

                        ...(activeChild && {
                          fontWeight: 700,
                        }),
                      }}
                    >
                      {child?.title}
                    </Typography>
                  </Box>
                );
                // return (
                //   <Typography
                //     sx={{
                //       typography: 'body12',
                //       color: 'text.dark',
                //       textDecoration: 'none',
                //       textTransform: 'capitalize',
                //       // pb: 0.1,
                //       // border: 'none',
                //       ...(activeChild && {
                //         typography: 'body12',
                //         fontWeight: 700,
                //       }),
                //     }}
                //     href={child.path}
                //     component={RouterLink}
                //   >
                //     {activeChild ? (
                //       <i className="fa-solid fa-circle-dot fa-xs" />
                //     ) : (
                //       <i className="fa-regular fa-circle-dot fa-xs" />
                //     )}{' '}
                //     {child?.title}
                //   </Typography>
                // );
              })}
          </Stack>
        </Collapse>
      )}
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
