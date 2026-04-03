import React from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/system';
import Logo from '../logo';
import { Typography } from '@mui/material';
import { defaultImageUrl } from 'src/utils/utils';
// import Logo from 'src/components/logo';

export const CustomBackGround = ({ rightContent, imageName, headingText, subText }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          height: '100vh',
          overflow: { xs: 'none', lg: 'hidden' },
        }}
      >
        <Grid container sx={{ height: { xs: '50%', md: '100vh' } }}>
          <Grid
            size={{ xs: 12, md: 6, lg: 7.5 }}
            sx={{
              display: { xs: 'none', md: 'block' },
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${defaultImageUrl(`/assets/background/${imageName}`)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Stack justifyContent="center" alignItems="center" sx={{ height: 1 }}>
              <Box sx={{ px: 4, maxWidth: 600 }}>
                {/* HEADING */}
                <Typography
                  sx={{
                    fontSize: { md: '56px', lg: '64px' },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: '#5EF2C3',
                    mb: 3,
                  }}
                >
                  {headingText}
                </Typography>

                {/* SUBTEXT */}
                <Typography
                  sx={{
                    fontSize: '18px',
                    lineHeight: 1.8,
                    color: 'rgba(94, 242, 195, 0.8)',
                  }}
                >
                  {subText}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, md: 6, lg: 4.5 }}
            sx={{
              background: theme.palette.background.light,
              // height: 1,
              // display: 'flex',  
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
          >
            <Stack justifyContent="center" sx={{ height: 1 }}>
              <Box sx={{ p: 5, px: { sm: 5, md: 12 } }}>
                <Logo sx={{ mb: 5, width: 120 }} />
                {rightContent}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
