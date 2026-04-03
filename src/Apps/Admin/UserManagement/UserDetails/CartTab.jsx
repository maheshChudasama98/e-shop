import React from 'react';
import { Box, Grid, Stack, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

import { formatToINR } from 'src/utils/format-number';
import { DataNotFound } from 'src/components/DataNotFound';
import { Avatar } from 'antd';
import { apiURL, DefaultProductImage } from 'src/constance';

export default function CartTab({ cartItems }) {
  if (!cartItems || cartItems.length === 0) {
    return <DataNotFound title="No items in cart" />;
  }

  const totalCartValue = cartItems.reduce(
    (sum, item) => sum + (item?.price || item?.product?.price || 0) * (item?.quantity || 1),
    0
  );

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Cart Items ({cartItems.length})
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {cartItems.map((item, index) => (
          <Box key={index}>

            {
              console.log('item', item)
            }
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 3, sm: 2, md: 1 }}>
                <Avatar
                  shape="square"
                  size="large"
                  src={
                    item?.product_variant?.variant_image?.image_url
                      ? `${apiURL}/${item?.product_variant?.variant_image?.image_url}`
                      : DefaultProductImage
                  }
                  style={{ border: 'solid 1px #BBB' }}
                />
              </Grid>
              <Grid size={{ xs: 9, sm: 5, md: 6 }}>
                <Typography variant="body2" fontWeight="bold">
                  {item?.product?.product_name || item?.product_name || 'Unknown Product'}
                </Typography>
                <Typography variant="caption" color="textSecondary" display="block">
                  Variant: {item?.product_variant?.variant_name || 'N/A'} -{' '}
                  {item?.product_variant?.variant_value || 'N/A'}
                </Typography>
              </Grid>
              <Grid size={{ xs: 4, sm: 2, md: 1.5 }} sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="textSecondary" display="block">
                  Price
                </Typography>
                <Typography variant="body2">{formatToINR(item?.price || 0)}</Typography>
              </Grid>
              <Grid size={{ xs: 4, sm: 1, md: 1.5 }} sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="textSecondary" display="block">
                  Qty
                </Typography>
                <Typography variant="body2">{item?.quantity || 1}</Typography>
              </Grid>
              <Grid size={{ xs: 4, sm: 2, md: 2 }} sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="textSecondary" display="block">
                  Total
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold">
                  {formatToINR((item?.price || item?.product?.price || 0) * (item?.quantity || 1))}
                </Typography>
              </Grid>
            </Grid>
            {index !== cartItems.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </Stack>

      <Box sx={{ mt: 3, pt: 2, borderTop: (theme) => `2px solid ${theme.palette.divider}` }}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Typography variant="subtitle1" color="textSecondary">
            Total Cart Value:
          </Typography>
          <Typography variant="h5" color="primary.main" fontWeight="bold">
            {formatToINR(totalCartValue)}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

CartTab.propTypes = {
  cartItems: PropTypes.array,
};
