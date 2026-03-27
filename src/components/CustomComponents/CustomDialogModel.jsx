import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

export const CustomDialogModel = ({
  open,
  title,
  child,
  message,
  handleClose,
  closeBtn = true,
  minWidth = 400,
  maxWidth = 400,
  ...props
}) => (
  <Dialog
    open={open}
    // maxWidth="lg"
    // fullWidth      
    sx={{
      '& .MuiPaper-root': {
        borderRadius: 3,
        maxHeight: "90vh",
        overflowY: 'auto',
      },
    }}
    PaperProps={{
      sx: {
          minWidth: minWidth || 'auto',
          maxWidth: maxWidth || 'none',
      },
    }}
    onClose={handleClose}
    {...props}
  >
    <Card
      sx={{
        p: 3,
        width: 1,
        borderRadius: 0,
        // minWidth,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: (theme) => theme.customShadows.z20,
        // backgroundColor: (theme) => theme.palette.background.default,
        border: (theme) => `4px solid ${theme.palette.primary?.main}`,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight="500">
          {title}
        </Typography>
        {closeBtn && (
          <IconButton onClick={handleClose} size="small">
            <i className="fa-solid fa-xmark" />
          </IconButton>
        )}
      </Box>

      {child}
    </Card>
  </Dialog>
);

CustomDialogModel.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  minWidth: PropTypes.number,
};
