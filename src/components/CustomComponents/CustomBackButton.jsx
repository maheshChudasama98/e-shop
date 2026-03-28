import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

export const CustomBackButton = ({ btnStr = 'Back', routerSrt, backAction }) => {
  const router = useRouter();

  const handleClick = () => {
    if (routerSrt) {
      router.push(routerSrt);
    } else {
      router.back();
      if (backAction) backAction();
    }
  };

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
      onClick={handleClick}
    >
      <i className="fa-solid fa-angle-left fa-xs" />
      <Typography variant="body12" sx={{ textDecoration: 'underline', fontWeight: 600 }}>
        {btnStr}
      </Typography>
    </Box>
  );
};

CustomBackButton.propTypes = {
  btnStr: PropTypes.string,
  routerSrt: PropTypes.string,
  backAction: PropTypes.func,
};
