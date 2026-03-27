import React from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Logo from 'src/components/logo';
import { defaultImageUrl } from 'src/utils/utils';

export const CustomBackGround = ({ rightContent, imageName }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.primary.light,
      }}
    >
      <Box
        sx={{
          background: theme.palette.primary.light,
          height: '100vh',
          overflow: { xs: 'none', lg: 'hidden' },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 1,
            borderRadius: '50%',
            backgroundColor: theme.palette.background.light,
            border: `3px solid ${theme.palette.primary.main}`,
            transform: 'translate(-25%, 25%)',
            width: { xs: 0, sm: 0, md: 400, lg: 600 },
            height: { xs: 0, sm: 0, md: 400, lg: 600 },
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}
        />

        <Grid
          container
          sx={{ height: { xs: '50%', md: '100vh' }, background: theme.palette.primary.light }}
        >
          <Grid
            item
            size={{ xs: 12, md: 6 }}
            sx={{
              backgroundColor: theme.palette.primary.light,
              display: 'flex',
              padding: { xs: 2, sm: 5, md: 4.5, lg: 6 },
              overflow: 'hidden',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <Logo sx={{ mb: 0 }} />
              <Box
                sx={{
                  position: 'fixed',
                  zIndex: 10,
                  // maxHeight: 400,
                  width: { xs: 10, sm: '30%', md: '30%', lg: '30%' },
                  bottom: { xs: 90, sm: 200, md: 80, lg: 100 },
                  left: { xs: 90, sm: 80, md: 80, lg: 100 },
                  display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
                }}
              >
                <img src={defaultImageUrl(`/assets/svg/${imageName}.svg`)} alt="icon" />
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ background: theme.palette.primary.light }}>
            {rightContent}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
