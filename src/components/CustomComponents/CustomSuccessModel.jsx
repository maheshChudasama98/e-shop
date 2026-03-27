import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { defaultImageUrl } from 'src/utils/utils';

export const CustomSuccessModel = ({
  open,
  child,
  message,
  handleClose,
  minWidth = 400,
  ...props
}) => (
  <Dialog
    open={open}
    sx={{
      '& .MuiPaper-root': {
        borderRadius: 3,
      },
    }}
    onClose={handleClose}
  >
    <Card
      sx={{
        p: 3,
        width: 1,
        borderRadius: 0,
        minWidth,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: (theme) => theme.customShadows.z20,
        backgroundColor: '#ffffff',
        border: 'none',
      }}
      {...props}
    >
      <Stack justifyContent="center" sx={{ alignItems: 'center' }}>
        <Box sx={{ m: 2 }}>
          <img src={defaultImageUrl('/assets/svg/svg3.svg')} alt="icon" />
        </Box>

        <Typography variant="h5" textAlign="center" sx={{ p: 2 }}>
          {message}
        </Typography>

        {child}

        <Button fullWidth variant="contained" onClick={handleClose}>
          Ok
        </Button>
      </Stack>
    </Card>
  </Dialog>
);

CustomSuccessModel.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  minWidth: PropTypes.number,
};
